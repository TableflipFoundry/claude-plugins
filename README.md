# Tableflip Foundry — Claude Code plugins

A small marketplace of Claude Code plugins.

## Installation

In Claude Code → **Manage Plugins** → **Marketplaces** tab → add:

```
TableflipFoundry/claude-plugins
```

Then switch to the **Plugins** tab to install individual plugins from the marketplace.

No additional setup is required — plugins clone over HTTPS, no SSH keys or host-key configuration needed.

## Plugins

### [obsidian-canvas-diagram](https://github.com/TableflipFoundry/obsidian-canvas-diagram)

Generate richly-documented diagrams in an Obsidian vault. Each diagram node is backed by a full markdown file (plain-language explanation + structured technical sections); the `.canvas` file assembles them visually with universal color conventions and human-style layout.

Slash commands: `/diagram-plan`, `/diagram-review`, `/diagram-update`.

## Latest diagram release

Version **0.6.0** includes the bundled Canvas IO desktop companion, mirrored Input/Output ports, relationship-first layouts, label refinement and required native section review. [How it works](plugins/obsidian-canvas-diagram/docs/how-it-works.md). Requires Obsidian desktop 1.15.1+ for I/O diagrams.
