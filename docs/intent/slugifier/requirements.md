# Requirements: URL Slugifier

Parents: [hld-slugifier.md](hld-slugifier.md), [lld-slugifier.md](lld-slugifier.md)

| ID | Requirement |
|---|---|
| SLUG-001 | The slugifier shall export a named function `slugify(input: string): string` from `src/slugify.ts`. |
| SLUG-002 | The slugifier shall return the input converted to lowercase. |
| SLUG-003 | The slugifier shall reduce accented Latin letters to their base letters (e.g. `é` to `e`). |
| SLUG-004 | When the input contains one or more consecutive characters outside `a-z0-9` after lowercasing and accent reduction, the slugifier shall replace each such run with a single `-`. |
| SLUG-005 | The slugifier shall remove leading and trailing `-` from the result. |
| SLUG-006 | The slugifier shall produce output containing only the characters `a-z`, `0-9`, and `-`. |
| SLUG-007 | When the input contains non-Latin script characters, the slugifier shall treat them as non-alphanumeric and shall not transliterate them. |
| SLUG-008 | When the input contains no `a-z0-9` characters after normalization, the slugifier shall return an empty string and shall not throw. |
| SLUG-009 | The slugifier shall return identical output for identical input, with no side effects. |
