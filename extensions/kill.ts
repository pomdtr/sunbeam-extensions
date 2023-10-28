#!/usr/bin/env deno run -A

import * as sunbeam from "npm:sunbeam-types@0.23.7";
import $ from "https://deno.land/x/dax@0.35.0/mod.ts";

if (Deno.args.length === 0) {
    const manifest: sunbeam.Manifest = {
        title: "Kill Process",
        commands: [
            { name: "list-processes", title: "List Active Process", "mode": "page" },
            {
                name: "kill-process",
                title: "Kill Process",
                mode: "silent",
                params: [
                    { name: "pid", type: "number", required: true },
                ],
            },
        ],
    };

    console.log(JSON.stringify(manifest));
    Deno.exit(0);
}

const payload = JSON.parse(Deno.args[0]) as sunbeam.CommandInput
if (payload.command === "list-processes") {
    const stdout = await $`ps -eo pid,ppid,pcpu,rss,comm`.text();
    const processes = stdout.split("\n").map((line) => {
        const defaultValue = ["", "", "", "", "", ""];
        const regex = /(\d+)\s+(\d+)\s+(\d+[.|,]\d+)\s+(\d+)\s+(.*)/;
        const [, id, pid, cpu, mem, path] = line.match(regex) ?? defaultValue;
        const processName = path.match(/[^/]*[^/]*$/i)?.[0] ?? "";
        const isPrefPane = path.includes(".prefPane");
        const isApp = path.includes(".app/");

        return {
            id: parseInt(id),
            pid: parseInt(pid),
            cpu: parseFloat(cpu),
            mem: parseInt(mem),
            type: isPrefPane ? "prefPane" : isApp ? "app" : "binary",
            path,
            processName,
        };
    }).filter((process) => process.processName !== "").sort((a, b) =>
        b.cpu - a.cpu
    );

    const page = {
        type: "list",
        items: processes.map((process) => ({
            title: process.processName,
            subtitle: process.pid.toString(),
            accessories: [process.cpu.toString()],
            actions: [{
                title: "Kill",
                type: "run",
                command: "kill-process",
                params: { pid: process.pid },
            }],
        })),
    };

    console.log(JSON.stringify(page));
} else if (payload.command === "kill-process") {
    const params = payload.params as { pid: number };
    await $`kill ${params.pid}`;
    console.log(JSON.stringify({ type: "reload" }));
}
