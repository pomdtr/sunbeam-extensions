#!/usr/bin/env deno run -A --ext=ts

if (Deno.args.length === 0) {
    const manifest = {
        title: "Slides",
        commands: [
            {
                name: "show",
                title: "Show a slide",
                mode: "view",
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

if (Deno.args[0] == "show") {
    const { params } = await new Response(Deno.stdin.readable).json();

    const markdown = Deno.readTextFileSync(params.path);

    const sections = markdown.split("\n---\n");

    const index = params.index || 0;
    const section = sections[index];

    const actions = [];
    if (index < sections.length - 1) {
        actions.push({
            title: "Next",
            key: "n",
            onAction: {
                type: "reload",
                params: {
                    path: params.path,
                    index: index + 1,
                },
            },
        });
    }
    if (index > 0) {
        actions.push({
            title: "Previous",
            key: "p",
            onAction: {
                type: "reload",
                params: {
                    path: params.path,
                    index: index - 1,
                },
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
