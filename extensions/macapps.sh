#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "Mac Apps",
        commands: [
            {
                name: "list",
                title: "List All Apps",
                mode: "page"
            }
        ]
    }'
    exit 0
fi

if [ "$1" = "list" ]; then
    mdfind kMDItemContentTypeTree=com.apple.application-bundle -onlyin / | sunbeam query -R '{
        title: (split("/")[-1] | split(".app")[0]),
        actions: [{
            title: "Open",
            onAction: {
                type: "open",
                target: .,
                exit: true
            }
        }]
    }' | sunbeam query -s '{ type: "list", items: . }'
fi
