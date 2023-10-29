#!/bin/sh

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "Screenshots",
        commands: [
            { name: "capture", title: "Capture", mode: "silent" },
            { name: "capture-screen", title: "Capture Screen", mode: "silent" },
            { name: "capture-window", title: "Capture Window", mode: "silent" }
        ]
    }'
    exit 0
fi

COMMAND=$(echo "$1" | sunbeam query -r .command)
if [ "$COMMAND" = "capture-screen" ]; then
    screencapture -c
elif [ "$COMMAND" = "capture-window" ]; then
    screencapture -w -c
elif [ "$COMMAND" = "capture" ]; then
    open /System/Applications/Utilities/Screenshot.app
fi
