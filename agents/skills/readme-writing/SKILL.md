---
name: readme-writing
description: >
  Use before writing, rewriting, or editing any README.md: the repository's root README or a
  directory's. Covers who a README is for, the order of its sections, what belongs in one and what
  never does (version history, file inventories, issue numbers, agent workflow), the root and
  directory templates, how to state status and warnings, the prose and command rules, and the check
  before a README lands. Modelled on go-ethereum's README. Overrides any older README template in
  another skill.
---

# Writing a README

A README is the front door. It answers, in order, the questions of a stranger who has just
landed on the repository: what is this, how do I get it, what do I get, how do I run it for my
case, how do I talk to it, how do I help, and under what licence. It answers them for the code as
it is today, in as few words as answer them, and links out for everything else.

The model is [go-ethereum's README](https://github.com/ethereum/go-ethereum#readme). Read it before
writing one. Note what it does:

- **One line of identity** under the title: "Golang execution layer implementation of the Ethereum
  protocol." No adjectives, no pitch.
- **Building** names the prerequisites with versions (Go 1.25 or later, a C compiler) and gives
  the one command, then the second one.
- **Executables** is one table: each binary and what it is for, with an example invocation.
- **Running** opens with concrete hardware requirements, then walks the common cases in order of
  how many people have them: a full node on mainnet, then on a test network, then configuration,
  Docker, the RPC interfaces, and a private network. Each case states the reader's goal, gives the
  exact command, then says what the command does and which defaults it sets.
- **Warnings** appear once, in bold, at the point where the reader could hurt themselves (exposing
  RPC to the internet), and say what the danger is.
- **Depth is linked, not copied:** the full flag list, the developer guide and the network setup
  each live on their own page.
- **Contribution** is short: fork, fix, open a PR against the main branch, talk to the maintainers
  first for large changes, follow the formatting and doc conventions, prefix commits with the
  packages they touch, with an example.
- **License** says exactly which code is under which licence and which file holds it.

## Who reads it

Write for two readers, in this order:

1. **Someone deciding whether this is for them.** They read the title line and the first
   paragraph, and maybe the status. Everything they need to decide is there.
2. **Someone trying to use it.** They skim headings to find their case, copy a command, and run
   it. Everything they need for their case is under one heading, in the order they will do it.

A maintainer who already knows the code is not the audience. Their reference is the code, its TSDoc
comments, and `agents/AGENTS.md`.

## What goes in a root README

In this order, leaving out a section that has nothing true to say:

1. **Title and one line.** The project's name and one sentence saying what it is, in the reader's
   terms. Then, at most, a short paragraph on what makes it different, stated as facts the code
   makes true.
2. **Status.** One short paragraph or a small table: what runs for real, what is simulated, what
   is shown as planned, and what is not built yet. Present tense, no dates of past work, no list of
   everything that ever landed.
3. **How it works.** The model a reader needs to predict what they will see, in plain words: what
   the page shows, what runs in the visitor's browser, what leaves it, and what is simulated. Use a
   table where the reader compares values. Describe the site as it is today. Link the engine's
   documentation or the code for the detail.
4. **Getting it.** Prerequisites with exact versions, then the install command.
5. **What you get.** Where a repository has more than one thing to run, a table of them, one line
   each with an example invocation, like go-ethereum's Executables table. A single site with a few
   `npm` scripts leaves this section out and shows each script under "Running it".
6. **Running it.** The common cases, most common first, each under its own heading:
   - the reader's goal, in a sentence;
   - the exact command, in a fenced `shell` block that copies and runs from a fresh checkout;
   - what the command does and the defaults it sets, in a few bullets (ports, data directory,
     which parts are mocked);
   - how to tell it worked.
7. **Talking to it.** The interfaces a program uses (API, stream, CLI), with the options that turn
   them on and their defaults, and a link to the full reference.
8. **Verifying it**, where the project makes trust claims: the exact commands a reader runs to check
   them, and what each check proves.
9. **Contributing.** How to send a change, the coding conventions in a few bullets, the commit and
   PR title format with an example, what CI checks, that a maintainer approves each PR before it
   merges, and where to ask first for a large change.
10. **Security.** One line pointing at `SECURITY.md` and how to report privately, once the
    repository has one.
11. **License.** Which code is under which licence, and the file that holds it.

Target length for a root README: what the sections above need, usually 100 to 300 lines. A README
that passes 400 lines is carrying something that belongs in a linked document.

When a topic needs more than about 100 lines (every rule the page explains, say), the README keeps
the model in a few paragraphs with the one or two tables a newcomer needs, and the rest goes in a
linked page under `docs/`, written to this skill's standard. The README stays the front door.
Formal sentences run longer than compressed ones; a README a little over 300 lines in that register
is better than a shorter one in shorthand.

## What goes in a directory README

A README in a subdirectory tells someone opening that directory what it holds and how to use and
test it. In this order:

1. **Title and one line:** the directory's name and what it holds.
2. **What it is for:** a short paragraph: its job, what depends on it, and the one or two
   properties it guarantees (for example, pure TypeScript with no React or DOM).
3. **Using it:** the entry points a caller uses (modules, functions, components), with a short
   example.
4. **Layout:** at most a table of its subdirectories or modules, one line each, saying what each
   one is responsible for. Never one row per file.
5. **Configuration:** environment variables it reads, with defaults. Leave the section out if there
   are none.
6. **Testing:** the commands that test it.
7. **License:** one line.

Target length: 40 to 150 lines. A directory whose README needs more is documenting its internals,
which belong in TSDoc comments next to the code they describe.

## What never goes in a README

- **History.** No "now", "no longer", "previously", "was changed to", "since #123". A README
  states the site as it is. History lives in git.
- **Accretion.** A change never appends a sentence describing itself. It rewrites the passage it
  affects so the passage reads as if written today, from scratch, and deletes what is no longer
  true.
- **Inventories.** No list of every file, every test, every script, every alert or every config
  key. Name the few the reader needs and link the directory or the reference that has the rest.
- **Internal references.** No issue numbers, decision ids (D5, #12), PR numbers, branch names,
  review rounds, finding ids or audit labels. If a fact matters, state the fact.
- **How the project is run.** No waves, milestones, agent workflow, review loops or session notes.
  The few rules a contributor meets (CI must pass, a maintainer approves the merge) go in the
  contribution section in one sentence each; everything else stays in `agents/`.
- **Unbacked claims.** No "fast", "secure", "robust", "seamless", "battle-tested",
  "production-grade", "comprehensive", "powerful" or "simply". State the number or the mechanism,
  or leave it out.
- **Other organisations' names**, competitors, and reference products. Vendors the code actually
  uses are named where the reader needs them.
- **Legal analysis**, of any kind.
- **Decoration.** No emoji, no badge that is not true and useful (CI status, docs and chat are
  fine), no table of contents for a short README, no heading over a single sentence.

## Prose

Follow [writing-style](../../rules/writing-style.md), plus:

- **Second person and present tense:** "You can run a node against a local chain", "The engine
  refuses an order when…".
- **Short paragraphs,** three to five lines. A paragraph that lists more than three things is a
  list.
- **Lists** for flags, options, steps and requirements. **Tables** for anything the reader compares
  across rows. **Prose** for how things work and why.
- **Define a term once,** the first time it appears, in words a trader or developer outside the
  project knows. Prefer the industry's term to the code's when they differ, and give the code's
  name once in backticks if the reader will meet it in output. A README read by traders and
  developers defines each side's terms for the other: basis point, mark, notional and margin for
  developers; enclave, attestation and replay for traders. A term the reader will meet in commands
  or their output (enclave, attestation, checkpoint, node) is defined once and then used, not
  replaced with a friendlier word.
- **Values not yet confirmed** are stated with "proposed" inline, next to the value, never left
  out and never stated as settled.
- **Concrete over general:** versions, sizes, ports, defaults, times, limits, with units.
- **One warning per hazard,** in bold, where the reader would act on it, saying what goes wrong.
  Not a stack of notes at the top.
- **Wrap prose at 100 columns,** one space after a full stop, British or American spelling as the
  repository already uses. Tables, URLs, code spans and link text are never broken across lines;
  let those lines run long. Break a long command with `\` at an argument boundary.

## Sentences

A README is technical documentation for people, read top to bottom by someone who wants to
understand. It is not a dense summary for a machine to parse. Write it the way an experienced
engineer or a broker's documentation team writes: complete, formal sentences that flow, one idea
each, in the standard terms of the field. The page's own copy follows the same standard.

- **Context first, then what happens, then its consequence for the reader.** Each in its own
  clause, usually its own sentence.
- **One condition per clause.** Never stack "while … while … or while …", or "once … then … unless
  …", in one sentence. Two conditions take two sentences, or a short list.
- **No compressed asides.** Write ", spread included,", ", gap included," and "(bps, hundredths of
  a percent)" out as clauses or as their own sentence: "including the spread", "even if the price
  gaps".
- **No colon chains.** A colon introduces a list or a table, not the second half of a compressed
  sentence.
- **No engine shorthand as nouns.** Not "a close", "an add", "a fill opens", "a reversal pays".
  Write "closing a position", "adding to a position", "the part of the trade that opens a
  position", and use the standard term (execution price, realised profit, working orders, margin,
  exposure, close-out level).
- **No comma-chained facts joined by "and … so …".** Three facts are three sentences.
- **Name every subject.** No "this", "it" or "that" for something the sentence has not named.
- **Formal register.** "Does not", "cannot", "you would", never "won't", "can't" or "you'd". Never
  "we" or "I".
- **Read it aloud.** A sentence you would not say to a colleague, or would have to say twice, is
  rewritten.

Before and after, from the first rewrite of this repository's README to this skill:

| Before | After |
|---|---|
| It is a single, statically rendered page. A simulated multi-asset workspace introduces the trading model, followed by illustrated rules, the planned MONKEY allocation schedule, an intended operator architecture and dated delivery targets. | The page opens with a simulated trading workspace, which shows the markets, prices and positions of a sample account. The sections that follow describe the markets on offer and the trading rules: how prices are set, which costs apply, and when positions are closed. |
| A simulated price index, public log and browser replay demonstrate how reference prices and independent accounting checks work. | The browser replays that log, recomputes each keccak-256 state root and compares it with the published one. When you change a value in the log, the replay stops at the first root that no longer matches. |
| The canonical address used in page metadata, the sitemap, and `robots.txt` defaults to the Vercel project's production domain; set `SITE_URL` to another bare origin, such as `https://example.com`, to override it, and the build fails on anything else. | `SITE_URL`, when set, must be a bare origin such as `https://example.com`. Any other value stops the build with an error. Without `SITE_URL`, the address is the Vercel project's production domain. |
| To check a change the way CI does, run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm audit --audit-level=high`; with Python 3, `python3 scripts/check-docs.test.py` and `python3 scripts/check-docs.py`; and, after changing a workflow, `actionlint`. | Before you open a pull request, run the checks that CI runs, which are listed in one block. After you change a workflow under `.github/workflows/`, also run `actionlint`. |

## Commands

- Every command block is copy-pasteable: no prompts, no placeholders the reader cannot fill, no
  elided output. Use `<angle-brackets>` only for values the reader must supply, and say what they
  are right under the block.
- Every command in a README has been run from a fresh clone at the commit that adds it, and its
  stated result observed. A fresh worktree at that commit counts as a fresh clone. If it needs a
  tool, the prerequisites list it with a version.
- Show a command with its real defaults (ports, paths) and name the setting or variable that
  overrides each. Verify it with overrides where a default is in use on your machine; never stop
  or disturb whatever holds the default.
- A README PR's body ends with one line per command it ran and the result, and names any command
  it could not run and why. That list is the evidence this skill's check asks for, and it is the
  one exception to `agent-create-pr`'s rule against a test plan in the body.
- Put the expected result after the command: what prints, which port listens, which file appears.
- Prefer the repository's `npm` scripts and the scripts in `scripts/` to long hand-written
  pipelines.

## Status and limits

State status as a short present-tense table or paragraph:

| Part | State |
|---|---|
| The page | Builds and runs as a static page |
| Trading workspace | A simulation that sends no orders |
| Replay demonstration | Runs in the browser on simulated data |

Say plainly what is simulated, what is planned, and what is not built. Keep the limits a reader
must know (the workspace sends no orders) in "How it works", not in a disclaimer.

## When to update a README

- A change that alters a command, script, default, port, path, prerequisite, environment variable
  or what the page shows updates the README passage that states it, in the same PR.
- A change that adds a section or demonstration updates "How it works" only if a reader's picture
  of the site changes, and then rewrites that passage rather than adding a paragraph.
- A change to internals updates TSDoc comments, not the README.

## Check before it lands

- [ ] The first line says what this is, in words a stranger understands.
- [ ] A reader can find their case from the headings alone.
- [ ] Every command was run from a fresh clone, and its result is stated.
- [ ] No sentence narrates history, a version transition, or how the project is run.
- [ ] No issue, PR, decision or finding number appears.
- [ ] No list of every file, alert, key or test.
- [ ] Every number has a unit, and every claim is a mechanism or a measurement.
- [ ] Each warning is stated once, where it applies.
- [ ] Length is within the target, or the excess has moved to a linked document.
- [ ] No sentence stacks conditions, chains facts with "and … so …", or compresses a condition into
      an aside; no engine shorthand used as a noun; no contractions.
- [ ] Read it top to bottom as a stranger. Cut every sentence that reader would skip.
