# LLD: URL Slugifier

Status: APPROVED
Parent: [hld-slugifier.md](hld-slugifier.md)

## Component
`slugify(input: string): string` in `src/slugify.ts`, exported by name. Pure, synchronous, no dependencies.

## Data Flow
Input is transformed by a fixed pipeline of steps, in this order:

1. **Decompose:** `input.normalize("NFD")` splits accented letters into base letter + combining mark (`é` -> `e` + U+0301).
2. **Strip marks:** remove combining diacritical marks, range `\u0300-\u036f`.
3. **Lowercase:** `toLowerCase()`.
4. **Separate:** replace every run of characters outside `[a-z0-9]` with a single `-` (regex `/[^a-z0-9]+/g`).
5. **Trim:** remove leading and trailing `-` (regex `/^-+|-+$/g`).

Order matters:
- Decompose and strip must precede the separate step, or accented letters would be turned into separators.
- Lowercase must precede the separate step, so `[a-z]` is a sufficient allow-list.

## Edge Cases and Expected Behavior

| Input | Output | Reason |
|---|---|---|
| `Hello World` | `hello-world` | basic case |
| `  Hello   World  ` | `hello-world` | whitespace runs collapse, edges trimmed |
| `Café Münster` | `cafe-munster` | diacritics reduced |
| `Don't Stop` | `don-t-stop` | apostrophe is a separator |
| `snake_case_name` | `snake-case-name` | underscore is a separator |
| `a---b` | `a-b` | repeated hyphens collapse |
| `--Hello--` | `hello` | leading/trailing hyphens trimmed |
| `Hello, World! 2024` | `hello-world-2024` | punctuation and digits |
| `日本語` | `` (empty) | non-Latin stripped, not transliterated |
| `Привет world` | `world` | non-Latin stripped, Latin kept |
| `!!!` | `` (empty) | no usable characters, no throw |
| `` (empty string) | `` (empty) | identity on empty |

Known limitation (accepted per HLD tenet 1): characters whose Latin form is not a diacritic variant (e.g. `ß`, `ø`, `æ`, `ł`) are not decomposed by NFD and are therefore stripped/treated as separators. Example: `Straße` -> `stra-e`. No special-case mapping is added.

## Error Handling
None at runtime. `input` is typed `string`; passing a non-string is a compile-time error. No exceptions are thrown for any string input.

## Project Layout
- `src/slugify.ts`: implementation
- `src/slugify.test.ts`: Vitest tests
- `package.json`: scripts `test` (`vitest run`) and `typecheck` (`tsc --noEmit`); devDependencies `typescript`, `vitest`
- `tsconfig.json`: `strict: true`, ES2020 target, ESNext modules

## Traceability
Each requirement in `requirements.md` gets an ID with prefix `SLUG-`. Tests and implementation carry `// @spec SLUG-NNN` annotations.
