# URL Slugifier: a Linked-Intent Dev (LID) example built with IBM Bob

A small TypeScript module that turns any string into a clean, lowercase, URL-friendly slug. The module is deliberately simple. The point of the repo is to show how [IBM Bob](https://www.ibm.com/products/bob) can follow the **Linked-Intent Dev (LID)** methodology, where every line of code traces back to a documented intent.

Learn more about LID: <https://linked-intent.dev/tour/>

## The module

```ts
import { slugify } from "./src/slugify";

slugify("Hello, World! 2024"); // "hello-world-2024"
slugify("Café Münster");       // "cafe-munster"
slugify("  --Don't Stop--  "); // "don-t-stop"
slugify("!!!");                // ""
```

Output contains only `a-z`, `0-9`, and `-`. Accented Latin letters are reduced to their base letters, non-Latin scripts are stripped (not transliterated), and the function never throws on string input. The full behavior and edge cases are in the [LLD](docs/intent/slugifier/lld-slugifier.md).

## How LID was applied here

Work flowed strictly downward through four levels, and Bob paused for human approval after each design document:

| Level | Artifact | Purpose |
|---|---|---|
| HLD (High-Level Design) | [`hld-slugifier.md`](docs/intent/slugifier/hld-slugifier.md) | Purpose, scope, and tie-breaker tenets |
| LLD (Low-Level Design) | [`lld-slugifier.md`](docs/intent/slugifier/lld-slugifier.md) | Pipeline, data flow, and edge-case table |
| EARS requirements | [`requirements.md`](docs/intent/slugifier/requirements.md) | One-line, testable specs (`SLUG-001` to `SLUG-009`) |
| Tests and code | [`src/slugify.test.ts`](src/slugify.test.ts), [`src/slugify.ts`](src/slugify.ts) | Implementation, annotated with `// @spec SLUG-NNN` |

### Rules Bob follows

These come from [`AGENTS.md`](AGENTS.md), which Bob loads automatically:

1. **Intent cascade:** changes flow HLD -> LLD -> requirements -> tests and code.
2. **Mandatory pause:** after drafting or updating an HLD or LLD, Bob stops and presents its assumptions. It continues only after you approve or correct the design.
3. **Traceability:** no code or tests without an active requirement ID. Every test and logic block carries a `// @spec [ID]` comment.

### Trace a requirement

Pick any ID and search for it to see the full chain:

```sh
grep -rn "SLUG-005" docs src
```

You will find the requirement, the code that implements it, and the tests that verify it.

## Try it yourself

```sh
npm install
npm test          # run the Vitest suite
npm run typecheck # strict TypeScript check
```

To extend the module the LID way, open the repo in Bob and describe a change, for example "add `ß` -> `ss` mapping". Bob should update the HLD or LLD first, pause for your approval, then update requirements, tests, and code.

## Repository layout

```
AGENTS.md                         LID protocol that Bob follows
docs/intent/slugifier/            HLD, LLD, and EARS requirements
src/slugify.ts                    Implementation
src/slugify.test.ts               Tests, each tied to a requirement
```
