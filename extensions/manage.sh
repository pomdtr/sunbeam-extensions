#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "Manage Extensions",
        commands: [
            {
                name: "list-extensions",
                title: "List Extensions",
                mode: "page"
            },
            {
                name: "remove-extension",
                title: "Remove Extension",
                mode: "silent",
                params: [
                    {
                        name: "name",
                        title: "Extension Name",
                        required: true,
                        type: "string"
                    }
                ]
            },
            {
                name: "rename-extension",
                title: "Rename Extension",
                mode: "silent",
                params: [
                    {
                        name: "name",
                        title: "Extension Name",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "newName",
                        title: "New Extension Name",
                        required: true,
                        type: "string"
                    }
                ]
            }
        ]
    }'
    exit 0
fi

COMMAND=$(echo "$1" | jq -r '.command')
if [ "$COMMAND" = "list-extensions" ]; then
    sunbeam extension list --json | jq 'to_entries' | sunbeam query '{
        type: "list",
        items: map({
            title: .key,
            subtitle: .value.title,
            actions: [
                {
                    "title": "Remove",
                    "type": "run",
                    "command": "remove-extension",
                    "params": {
                        "name": .key
                    },
                    reload: true
                },
                {
                    "title": "Rename",
                    "type": "run",
                    "command": "rename-extension",
                    "params": {
                        "name": .key,
                        "newName": {
                            "type": "text",
                            required: true,
                            default: .key
                        }
                    },
                    reload: true
                }
            ]
        })
    }'
elif [ "$COMMAND" = "remove-extension" ]; then
    NAME=$(echo "$1" | sunbeam query -r '.params.name')
    sunbeam extension remove "$NAME"
elif [ "$COMMAND" = "rename-extension" ]; then
    NAME=$(echo "$1" | sunbeam query -r '.params.name')
    NEW_NAME=$(echo "$1" | sunbeam query -r '.params.newName')
    sunbeam extension rename "$NAME" "$NEW_NAME"
fi
