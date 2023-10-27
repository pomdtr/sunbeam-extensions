#!/usr/bin/env deno run -A

import { Octokit } from "https://esm.sh/octokit?dts";
import * as sunbeam from "npm:sunbeam-types@0.23.1"

if (Deno.args.length === 0) {
    const manifest: sunbeam.Manifest = {
        title: "Gist",
        description: "Manage your gists",
        commands: [
            {
                name: "list",
                title: "List Gists",
                mode: "page",
            },
            {
                name: "browse",
                title: "Browser Gist Files",
                mode: "page",
                params: [
                    {
                        name: "id",
                        description: "Gist ID",
                        type: "string",
                        required: true,
                    }
                ]
            },
            {
                name: "view",
                title: "View Gist File",
                mode: "page",
                params: [
                    {
                        name: "id",
                        description: "Gist ID",
                        type: "string",
                        required: true,
                    },
                    {
                        name: "file",
                        description: "File Name",
                        type: "string",
                        required: true,
                    }
                ]
            }
        ]
    }
    console.log(JSON.stringify(manifest))
    Deno.exit(0)
}

const token = Deno.env.get("GITHUB_TOKEN");
if (!token) {
    console.error("GITHUB_TOKEN not found in env")
    Deno.exit(1)
}

const oktokit = new Octokit({ auth: token });

const command = Deno.args[0]
if (command == "list") {
    const gists = await oktokit.request("GET /gists");
    const items = gists.data.map((gist) => {
        const files = Object.values(gist.files)
        return {
            title: files.length > 0 ? Object.values(gist.files)[0].filename! : "Untitled",
            subtitle: gist.description || "",
            actions: [
                files.length > 1 ? {
                    title: "Browse Files",
                    type: "run",
                    command: "browse",
                    params: {
                        id: gist.id,
                    }
                } : {
                    title: "View File",
                    type: "run",
                    command: "view",
                    params: {
                        id: gist.id,
                        file: Object.values(gist.files)[0].filename!
                    }
                },
                {
                    title: "Open in Browser",
                    type: "open",
                    target: gist.html_url,
                    exit: true,
                },
                {
                    title: "Copy ID",
                    type: "copy",
                    text: gist.id,
                    exit: true,
                }
            ]
        } as sunbeam.ListItem
    })

    const list: sunbeam.List = {
        type: "list",
        title: "Gists",
        items,
    }

    console.log(JSON.stringify(list))
    Deno.exit(0)
} else if (command == "browse") {
    const { params }: sunbeam.CommandInput<{
        id: string
    }> = await new Response(Deno.stdin.readable).json()

    const gist = await oktokit.request("GET /gists/{gist_id}", {
        gist_id: params.id,
    });

    const files = Object.values(gist.data.files || {})
    const items: sunbeam.ListItem[] = files.map((file) => {
        return {
            title: file!.filename || "Untitled",
            subtitle: file!.language || "",
            actions: [
                {
                    title: "View File",
                    type: "run",
                    command: "view",
                    params: {
                        id: gist.data.id || "",
                        file: file!.filename!
                    }
                },
                {
                    title: "Copy Raw URL",
                    type: "copy",
                    text: file!.raw_url || "",
                    exit: true,
                }
            ]
        }
    })

    const list: sunbeam.List = {
        type: "list",
        title: "Gist Files",
        items,
    }

    console.log(JSON.stringify(list))
    Deno.exit(0)
} else if (command == "view") {
    const { params }: sunbeam.CommandInput<{
        id: string,
        file: string,
    }> = await new Response(Deno.stdin.readable).json()

    const gist = await oktokit.request("GET /gists/{gist_id}", {
        gist_id: params.id,
    });

    const file = gist.data.files![params.file]

    const page: sunbeam.Detail = {
        type: "detail",
        markdown: ["```" + file?.language?.toLowerCase() || "txt", file?.content, "```"].join("\n"),
        actions: [
            {
                title: "Copy Raw URL",
                type: "copy",
                text: file!.raw_url || "",
                exit: true,
            },
            {
                title: "Copy Content",
                type: "copy",
                text: file!.content || "",
                exit: true,
            }
        ]
    }

    console.log(JSON.stringify(page))
    Deno.exit(0)
}

