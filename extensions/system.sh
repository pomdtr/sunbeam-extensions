#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "System",
        commands: [
            {
                name: "toggle-dark-mode",
                title: "Toggle Dark Mode",
                mode: "silent"
            },
            {
                name: "lock-screen",
                title: "Lock Screen",
                mode: "silent"
            }
        ]
    }'
    exit 0
fi

COMMAND=$(echo "$1" | jq -r '.command')
if [ "$COMMAND" = "toggle-dark-mode" ]; then
    osascript -e 'tell app "System Events" to tell appearance preferences to set dark mode to not dark mode'
elif [ "$COMMAND" = "lock-screen" ]; then
    osascript -e 'tell application "System Events" to keystroke "q" using {command down,control down}'
fi
