#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "QuickLinks",
        commands: [
            {
                name: "google",
                title: "Open Google",
                mode: "silent"
            },
            {
                name: "workflowy",
                title: "Open Workflowy",
                mode: "silent"
            }
        ]
    }'
    exit 0
fi

COMMAND=$(echo "$1" | jq -r '.command')
if [ "$COMMAND" = "google" ]; then
    sunbeam open https://google.com
elif [ "$COMMAND" = "workflowy" ]; then
    sunbeam open https://workflowy.com
fi
