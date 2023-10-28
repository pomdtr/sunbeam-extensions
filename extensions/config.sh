#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "Edit Config Files",
        commands: [
            {
                name: "fish",
                title: "Edit Fish Config",
                mode: "tty"
            }
        ]
    }'
    exit 0
fi

COMMAND=$(echo "$1" | jq -r '.command')

if [ "$COMMAND" = "fish" ]; then
    sunbeam edit ~/.config/fish/config.fish
fi
