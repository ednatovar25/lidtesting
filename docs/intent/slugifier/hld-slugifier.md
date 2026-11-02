# HLD: URL Slugifier

Status: APPROVED

## Purpose
Provide a small, dependency-free TypeScript module that converts any string into a clean, lowercase, URL-friendly slug.

## Scope
In scope:
- A single pure function, `slugify(input: string): string`.
- Handling of arbitrary Unicode input, including accented Latin characters, punctuation, whitespace, and symbols.

Out of scope:
- Slug uniqueness or collision handling (e.g. appending `-2`).
- Transliteration of non-Latin scripts (CJK, Cyrillic, Arabic, etc.).
- Configurable options (custom separator, max length, locale rules).
- Persistence, routing, or any framework integration.

## Tenets (tie-breakers, in priority order)
1. **Safe output over faithful output.** The result must contain only `a-z`, `0-9`, and `-`, even if that discards information.
2. **Deterministic and pure.** Same input always yields the same output; no I/O, no global state, no locale-dependent behavior.
3. **Simple over configurable.** No options until a real need exists.
4. **No dependencies.** Use only built-in language features.

## Behavior Summary
- Input is normalized so accented Latin letters are reduced to their base letters (e.g. `Café` -> `cafe`).
- Output is lowercased.
- Any run of characters outside `a-z0-9` becomes a single `-`.
- Leading and trailing `-` are removed.
- Input with no usable characters yields an empty string.

## Boundaries and Interfaces
- Exposed as a named export from `src/slugify.ts`.
- Non-string input is a type error at compile time; no runtime validation.

## Open Assumptions (need your confirmation)
Confirmed by user with the HLD approval:
- Output charset is `a-z`, `0-9`, `-` only; underscores are separators.
- Non-Latin scripts are stripped, not transliterated.
- A result with no usable characters is `""` (no throw).
- Apostrophes act as separators (`Don't` -> `don-t`).
- Code in `src/slugify.ts` (named export); Node + Vitest; minimal `package.json` and `tsconfig.json`.
- No options (no max length, no custom separator).
