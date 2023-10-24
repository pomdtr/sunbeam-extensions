#!/bin/sh
# shellcheck disable=SC2016

# This script is an example of how to use tldr with sunbeam
set -e

# if no arguments are passed, return the extension's manifest
if [ $# -eq 0 ]; then
    sunbeam query -n '
{
    title: "TLDR",
    # each command can be called through the cli
    commands: [
        { name: "list", mode: "view", title: "Search Pages" },
        { name: "view", mode: "view", title: "View page", params: [{ name: "page", type: "string", required: true, description: "page to show" }] }
    ]
}'
exit 0
fi

# check if tldr is installed
if ! command -v tldr >/dev/null 2>&1; then
    echo "tldr is not installed. Please install it from https://dbrgn.github.io/tealdeer/installing.html"
    exit 1
fi

if [ "$1" = "list" ]; then
    tldr --list | sunbeam query -R '{
        title: .,
        actions: [
            {title: "View Page", onAction: { type: "run", command: "view", params: {page: .}}},
            {title: "Copy Command", key: "c", onAction: { type: "copy", text: ., exit: true }}
        ]
    }' | sunbeam query -s '{ type: "list", items: . }'
elif [ "$1" = "view" ]; then
    PAGE=$(sunbeam query -r '.params.page')
    tldr --raw "$PAGE" | sunbeam query --arg page="$PAGE" -sR '{
            type: "detail", markdown: ., actions: [
                {title: "Copy Page", onAction: {type: "copy", text: ., exit: true}},
                {title: "Copy Command", key: "c", onAction: {type: "copy", text: $page, exit: true}}
            ]
        }'
fi
