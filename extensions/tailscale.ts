#!/usr/bin/env -S deno run -A
import $ from "https://deno.land/x/dax@0.35.0/mod.ts";
import type * as sunbeam from "npm:sunbeam-types@0.23.0";

if (Deno.args.length == 0) {
    const manifest: sunbeam.Manifest = {
        title: "Tailcale",
        commands: [
            {
                name: "list-devices",
                title: "Search My Devices",
                mode: "page",
            }
        ],
    };
    console.log(JSON.stringify(manifest));

    Deno.exit(0);
}

type Device = {
    TailscaleIPs: string[];
    DNSName: string;
    OS: string;
    Online: boolean;
}

if (Deno.args[0] == "list-devices") {
    const status = await $`tailscale status --json`.json();
    const devices: Device[] = Object.values(status.Peer);
    const items: sunbeam.ListItem[] = devices.map((device) => ({
        title: device.DNSName.split(".")[0],
        subtitle: device.TailscaleIPs[0],
        accessories: [device.OS, device.Online ? "online" : "offline"],
        actions: [
            {
                title: "Copy SSH Command",
                type: "copy",
                text: `ssh ${device.TailscaleIPs[0]}`,
                exit: true,
            },
            {
                title: "Copy IP",
                type: "copy",
                text: device.TailscaleIPs[0],
                key: "i",
                exit: true,
            },
        ],
    }));

    const list: sunbeam.List = { type: "list", items };

    console.log(JSON.stringify(list));
}
