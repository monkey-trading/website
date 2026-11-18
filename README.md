# Monkey Trading website

The public website for [Monkey Trading](https://github.com/monkey-trading/engine), a platform for
trading contracts for difference against a house whose rules are public code.

The site is a single page, rendered to static files when it is built. It explains how trading on
Monkey Trading works, and it lets a visitor try the engine's checks in the browser on simulated
data. Everything runs in the visitor's browser. The site has no backend, sets no cookies, stores
nothing in the browser and loads no analytics or third-party scripts. Its fonts are bundled when the
site is built.

## Status

The site builds and runs. The trading engine it describes has not launched, so nothing on the page
is live.

| Part | State |
| --- | --- |
| The page | Builds and runs as a static page |
| Trading workspace | A simulation that sends no orders |
| Price index, public log and replay demonstrations | Run in the browser on simulated data |

## What the page shows

The page opens with a simulated trading workspace, which shows the markets, prices and positions of
a sample account. The sections that follow describe the markets on offer and the trading rules:
how prices are set, which costs apply, and when positions are closed. The page then explains how
MONKEY tokens are distributed to traders, and how the operators who run the trading server are
chosen and hand over to one another.

Three interactive demonstrations show the checks the engine makes possible:

- **Reference pricing.** A simulated index takes the median of several venues' quotes, and stops
  quoting when too few venues remain or when their prices disagree by more than a set threshold.
- **Public accounting.** A simulated log lists each command in order, with the events it produced
  and the signed checkpoints that commit to the state.
- **Independent verification.** The browser replays that log, recomputes each keccak-256 state root
  and compares it with the published one. When you change a value in the log, the replay stops at
  the first root that no longer matches.

The page ends with a roadmap of delivery targets. The page's statements of the trading rules and of
the project's status are kept in [`src/lib/content.ts`](src/lib/content.ts). The engine's
[README](https://github.com/monkey-trading/engine#readme) is the authoritative statement of both.

## Getting it

You need Node.js 24, the version in [`.nvmrc`](.nvmrc), and npm. The documentation check also needs
Python 3.

```shell
git clone https://github.com/monkey-trading/website.git
cd website
npm ci
```

`npm ci` installs the exact dependency versions that `package-lock.json` records.

## Running it

### The development server

To work on the page with live reloading, run:

```shell
npm run dev
```

The server prints `✓ Ready` and serves the page at `http://localhost:3000`. To use another port,
run `npm run dev -- --port 3001`. The development server runs React in strict mode, so every effect
runs twice, which exposes an effect that does not clean up after itself.

### The production build

To build the static page and serve it as a host would, run:

```shell
npm run build
npm start
```

`npm run build` prerenders every route and lists each one as `○ (Static)`. `npm start` serves the
build at `http://localhost:3000`, and `npm start -- --port 3001` serves it on another port. The
production build sends a Content Security Policy that allows scripts, styles, images, fonts and
connections from the site's own origin only, together with the other security headers set in
[`next.config.ts`](next.config.ts). To see them, run:

```shell
curl -sI http://localhost:3000/
```

## Deploying it

The site deploys to Vercel as a standard Next.js project, on Node.js 24, and needs no environment
variables. The canonical address that the page's metadata, the sitemap and `robots.txt` use is set
as follows:

- `SITE_URL`, when set, must be a bare origin such as `https://example.com`. Any other value stops
  the build with an error.
- Without `SITE_URL`, the address is the Vercel project's production domain, which Vercel provides
  in `VERCEL_PROJECT_PRODUCTION_URL`.
- Without either, the address is `http://localhost:3000`.

The links to the Telegram community and to the source code are set in
[`src/lib/site.ts`](src/lib/site.ts).

## Contributing

Pull requests against `main` are welcome. For a large change, please open an issue first.

Before you open a pull request, run the checks that CI runs:

```shell
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
python3 scripts/check-docs.test.py
python3 scripts/check-docs.py
```

- `npm run lint` fails on any warning, and on a source file longer than 300 lines.
- `npm run typecheck` generates Next.js's route types and then runs the TypeScript compiler.
- `npm test` runs the unit tests with Vitest.
- The documentation check confirms that every relative link in `agents/` and in the root Markdown
  files resolves.
- After you change a workflow under `.github/workflows/`, also run `actionlint`.

Commit and pull request titles take the form `[<scopes>] Subject`, where the scopes are `site`,
`workspace` and `agents`, for example `[site] Show the spread bands of each market`. A pull request
merges once CI passes and a maintainer has approved it.

## License

The website is licensed under the Apache License 2.0. The licence text is in [`LICENSE`](LICENSE).
