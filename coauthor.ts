import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (_event, ctx) => {
    if (_event.toolName !== "bash") return;

    const cmd = (_event.input as { command?: string }).command ?? "";
    if (!isGitCommit(cmd)) return;

    const model = ctx.model;
    if (!model) return;

    const name = model.name ?? model.id;
    const trailer = `Co-authored-by: ${name} (${model.provider}) <noreply@pi.dev>`;

    (_event.input as { command?: string }).command = appendTrailer(cmd, trailer);
  });
}

function isGitCommit(cmd: string): boolean {
  return /\bgit\s+commit\b/.test(cmd) && /\s(-m\b|--message)/.test(cmd);
}

function appendTrailer(cmd: string, trailer: string): string {
  return `${cmd.trimEnd()} -m "" -m "${trailer}"`;
}
