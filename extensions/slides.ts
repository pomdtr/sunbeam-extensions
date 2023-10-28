#!/usr/bin/env deno run -A
import * as sunbeam from "npm:sunbeam-types@0.23.7"

if (Deno.args.length === 0) {
    const manifest: sunbeam.Manifest = {
        title: "Slides",
        commands: [
            {
                name: "show",
                title: "Show a slide",
                mode: "page",
                params: [
                    {
                        name: "path",
                        type: "string",
                        required: true,
                    },
                    {
                        name: "index",
                        type: "string",
                    },
                ],
            },
        ],
    };
    console.log(JSON.stringify(manifest));
    Deno.exit(0);
}

const payload = JSON.parse(Deno.args[0]) as sunbeam.CommandInput;
if (payload.command == "show") {
    const params = payload.params as { path: string; index?: number };

    const markdown = Deno.readTextFileSync(params.path);

    const sections = markdown.split("\n---\n");

    const index = params.index || 0;
    const section = sections[index];

    const actions = [];
    if (index < sections.length - 1) {
        actions.push({
            title: "Next",
            key: "n",
            type: "reload",
            params: {
                path: params.path,
                index: index + 1,
            },
        });
    }
    if (index > 0) {
        actions.push({
            title: "Previous",
            key: "p",
            type: "reload",
            params: {
                path: params.path,
                index: index - 1,
            },
        });
    }

    const detail = {
        type: "detail",
        markdown: section.trim(),
        actions: actions,
    };

    console.log(JSON.stringify(detail));
}
