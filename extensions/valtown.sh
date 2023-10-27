#!/bin/sh

set -eu

if [ $# -eq 0 ]; then
    sunbeam query -n '{
        title: "Val Town",
        commands: [
            {
                name: "home",
                title: "List Home Vals",
                mode: "page"
            }
        ]
    }'
    exit 0
fi

if [ -z "$VALTOWN_TOKEN" ]; then
    echo "VALTOWN_TOKEN is not set"
    exit 1
fi

API_ROOT="https://api.val.town"

if [ "$1" = "home" ]; then
    USER_ID=$(sunbeam fetch -H "Authorization: Bearer $VALTOWN_TOKEN" "$API_ROOT/v1/me" | sunbeam query -r '.id')
    sunbeam fetch -H "Autorization: Bearer $VALTOWN_TOKEN" "$API_ROOT/v1/users/$USER_ID/vals" | sunbeam query '.data | {
        type: "list",
        items: map({
            title: .name,
            subtitle: "v\(.version)",
            accessories: [.privacy],
            actions: [
                {
                    title: "Open in Browser",
                    type: "open",
                    target: "https://val.town/v/\(.author.username[1:])/\(.name)",
                    exit: true
                },
                {
                    title: "Copy URL",
                    key: "c",
                    exit: true,
                    type: "copy",
                    text: "https://val.town/v/\(.author.username[1:])/\(.name)"
                },
                {
                    title: "Copy Web Endpoint",
                    exit: true,
                    key: "w",
                    type: "copy",
                    text: "https://\(.author.username[1:])-\(.name).web.val.run"
                },
                {
                    "title": "Copy Run Endpoint",
                    "key": "r",
                    exit: true,
                    type: "copy",
                    text: "https://api.val.town/v1/run/\(.author.username[1:])/\(.name)"
                }
            ]
        })
    }'
fi

