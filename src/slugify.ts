// @spec SLUG-001
export function slugify(input: string): string {
  return input
    .normalize("NFD") // @spec SLUG-003
    .replace(/[\u0300-\u036f]/g, "") // @spec SLUG-003
    .toLowerCase() // @spec SLUG-002
    .replace(/[^a-z0-9]+/g, "-") // @spec SLUG-004 SLUG-006 SLUG-007
    .replace(/^-+|-+$/g, ""); // @spec SLUG-005 SLUG-008
}
