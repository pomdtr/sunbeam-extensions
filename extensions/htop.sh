#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "Htop",
        commands: [
            {
                name: "htop",
                title: "htop",
                mode: "tty"
            }
        ]
    }'
    exit 0
fi

htop
