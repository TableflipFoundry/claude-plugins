# obsidian-canvas-diagram

A Claude Code plugin that generates richly-documented diagrams in an Obsidian vault.

Each diagram is an Obsidian `.canvas` file where every node references a full markdown file. The canvas is the map; the markdown files are the territory — every node has a plain-language explanation plus structured technical detail.

## What it does

- Plans new components with diagrams before any code exists.
- Reverse-engineers diagrams from existing code.
- Reconciles diagrams against code as the project evolves, flagging drift.
- Reuses nodes across diagrams via a shared `nodes/` pool, building a knowledge graph instead of standalone images.
- Uses a universal color palette so diagrams read consistently across your project.

## Slash commands

| Command | Use for |
|---|---|
| `/diagram-plan <description>` | Greenfield: planning something that doesn't exist yet. |
| `/diagram-review <path or description>` | Reverse-engineer from existing code. Accepts a path (`src/auth/`) or plain English (`the login flow`). |
| `/diagram-update <diagram name>` | Modify an existing diagram. If nodes reference real code, performs a drift audit first. |

The skill is also auto-invoked when a request matches its description, so users who don't know the slash commands can still trigger it by asking for a diagram in plain English.

## Vault layout

Each project gets its own vault, a `Diagrams/` folder at the project root:

```
<project-root>/
  Diagrams/                  ← the project's vault
    nodes/                   ← every note, shared by all diagrams
      login-handler.md
      session-store.md
    overview/
      overview.canvas
    auth/
      auth.canvas
```

Notes are shared, so the same note can appear in several diagrams and is never duplicated. The scripts add the vault to Obsidian and open it for you.

## Conventions

### Universal edge colors

| Color | Meaning |
|---|---|
| Red | Error / failure / destructive |
| Orange | Async / deferred / queued |
| Yellow | Conditional / decision branch |
| Green | Success / happy path |
| Cyan | Data flow |
| Purple | External / third-party |

### Node colors by type

`component` cyan · `function` green · `actor` purple · `data` yellow · `decision` orange · `event` red.

### Node markdown structure

Every node file:
1. YAML frontmatter (`id`, `title`, `type`, `status`, `source`, `level`, optional `detail`).
2. **Plain-language paragraph first**: what it is, why it exists and how it works, readable by someone who doesn't code.
3. Technical sections appropriate to the node type.

No H1 inside the file, because Obsidian renders the filename as the title.

### Detail levels

`/diagram-review` asks what you want a diagram of (the whole app or one feature), then how much detail. `/diagram-plan` asks how much detail. The levels follow the C4 model:

| Choice | What the diagram shows |
|---|---|
| Overview | The big pieces: users, programs, data, outside services |
| Detailed | The parts inside those pieces: services, jobs, screens, tables |
| Deep dive | Down to the important functions and steps |

Each request makes **one** diagram, with as many boxes as the chosen scope and depth need.

## Automatic layout

The AI decides what the diagram says: notes, arrows, main paths, and what directly supports each step. Bundled scripts place those relationships:

1. A layout engine (ELK) sorts the boxes into rows that follow the arrows, top to bottom.
2. An optimizer tidies the layout inside those rows, so arrows don't overlap or run through boxes and labels stay clear. It keeps the top-to-bottom order.
3. A relationship pass aligns simple chains and applies a semantic `<diagram>.layout.json` plan: straight main paths, helpers immediately beside their callers, aligned sibling branches, and local views of shared data notes. Arrow attachment sides are then optimized without moving the refined layout.
4. The scripts open the diagram **in Obsidian itself**, score what it drew, and capture an overview plus readable close-ups. The AI reviews every section for proximity and clarity. This cleanup is part of creating the diagram, not a follow-up task for the user.

Local shared-data cards link to the same markdown file; they do not create duplicate notes or databases. The pipeline verifies that adding these views preserves every note-to-note connection, label, direction and style. A rerun reuses existing local views.

The job stop check requires a relationship review and a native quality report. It blocks arrows through cards, overlapping arrows, obscured labels and missing/detached drawings until corrected or explicitly reported as limitations. A low score alone does not certify a good layout. For an intentionally refined arrangement, `verify.mjs` checks it without reflowing it.

The plan format and review criteria ship in [Relationship-first layout](skills/obsidian-canvas-diagram/references/relationship-layout.md). They do not depend on personal `AGENTS.md` instructions.

**Existing diagrams stay put.** Opening a diagram or updating the plugin does not run a layout. The pipeline preserves saved arrangements by default; generating a new arrangement requires `--relayout`. Changing positions is presentation work, not evidence that the underlying code or relationships changed.

**Line styles:** diagrams use the Obsidian community plugin **Advanced Canvas** (required). An unmodified copy of version 7.1.0 is bundled in `vendor/advanced-canvas/` (GPL-3.0; license and source link included). The scripts install it from there into a project's vault when needed and enable it. They never download it at diagram time, and they never look in other vaults or folders. Line style shows *when* something happens: solid for right away, long dashes for later or queued, dots for a timer, short dashes for planned. A dashed box border means planned and a dotted one means broken or unused.

**Requirements:** Node.js and the Obsidian desktop app. The first run installs two small libraries (`elkjs`, `playwright-core`) into the plugin's `scripts/` folder. The scripts open Obsidian for you. If Obsidian is already open without the debug port, you'll be asked to close it once.

## Installation

In Claude Code, open the plugin manager:

1. Click **Manage Plugins** (or run `/plugins` in the chat box on supported clients).
2. Go to the **Marketplaces** tab and add:
   ```
   TableflipFoundry/claude-plugins
   ```
3. Switch to the **Plugins** tab and click **Install** on `obsidian-canvas-diagram`.
4. Restart your editor / Claude Code session.

Once restarted, the slash commands `/diagram-plan`, `/diagram-review`, and `/diagram-update` are available, and the skill is auto-invoked when a request matches its description.

## Diagram types supported

Architecture · Sequence · State machine · Data model · Dependency / call graph · Decision tree.

The skill recommends a type based on the user's request and announces it before generating, so the user can redirect.

## Status

v0.5.1: relationship-first layout plans, local references to shared data, fixed-geometry arrow cleanup, readable section captures, preserved-layout verification and a rendering/relationship review gate. Includes the existing v0.5.0 work on feature groups and canonical canvas hashes. Top-to-bottom flow; groups are one level deep.

## License

MIT
