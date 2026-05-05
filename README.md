# Tableflip Foundry — Claude Code plugins

A small marketplace of Claude Code plugins.

## Installation

In Claude Code → **Manage Plugins** → **Marketplaces** tab → add:

```
TableflipFoundry/claude-plugins
```

Then switch to the **Plugins** tab to install individual plugins from the marketplace.

### One-time setup (avoids an SSH host-key error during install)

Some Claude Code versions clone plugins via SSH, which fails on machines that have never connected to GitHub over SSH. Run this once in PowerShell or any terminal — it tells git to use HTTPS instead of SSH for github.com, which works without any keys or extra setup:

```bash
git config --global url."https://github.com/".insteadOf "git@github.com:"
```

After that, plugin installs from any GitHub-hosted Claude Code marketplace will work without a host-key prompt. This is a general git ergonomics improvement, not specific to this marketplace.

## Plugins

### [obsidian-canvas-diagram](https://github.com/TableflipFoundry/obsidian-canvas-diagram)

Generate richly-documented diagrams in an Obsidian vault. Each diagram node is backed by a full markdown file (plain-language explanation + structured technical sections); the `.canvas` file assembles them visually with universal color conventions and human-style layout.

Slash commands: `/diagram-plan`, `/diagram-review`, `/diagram-update`.
