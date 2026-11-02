import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

// @spec SLUG-001
describe("slugify export", () => {
  it("is a named function export", () => {
    expect(typeof slugify).toBe("function");
  });
});

// @spec SLUG-002
describe("lowercase", () => {
  it("lowercases input", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
});

// @spec SLUG-003
describe("accent reduction", () => {
  it("reduces diacritics to base letters", () => {
    expect(slugify("Café Münster")).toBe("cafe-munster");
  });
});

// @spec SLUG-004
describe("separator runs", () => {
  it("collapses whitespace runs into one hyphen", () => {
    expect(slugify("  Hello   World  ")).toBe("hello-world");
  });
  it("treats apostrophes as separators", () => {
    expect(slugify("Don't Stop")).toBe("don-t-stop");
  });
  it("treats underscores as separators", () => {
    expect(slugify("snake_case_name")).toBe("snake-case-name");
  });
  it("collapses repeated hyphens", () => {
    expect(slugify("a---b")).toBe("a-b");
  });
  it("handles punctuation and digits", () => {
    expect(slugify("Hello, World! 2024")).toBe("hello-world-2024");
  });
});

// @spec SLUG-005
describe("trimming", () => {
  it("removes leading and trailing hyphens", () => {
    expect(slugify("--Hello--")).toBe("hello");
  });
});

// @spec SLUG-006
describe("allowed charset", () => {
  it("outputs only a-z, 0-9 and hyphen", () => {
    expect(slugify("Ünï©ode ✓ Tëst #1 ~ ok")).toMatch(/^[a-z0-9-]*$/);
  });
  it("strips characters without a diacritic decomposition", () => {
    expect(slugify("Straße")).toBe("stra-e");
  });
});

// @spec SLUG-007
describe("non-Latin scripts", () => {
  it("does not transliterate", () => {
    expect(slugify("Привет world")).toBe("world");
  });
});

// @spec SLUG-008
describe("empty results", () => {
  it("returns empty string for non-Latin only input", () => {
    expect(slugify("日本語")).toBe("");
  });
  it("returns empty string for punctuation only input", () => {
    expect(slugify("!!!")).toBe("");
  });
  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});

// @spec SLUG-009
describe("determinism", () => {
  it("returns the same output for the same input", () => {
    const input = "Hello, Wörld!";
    expect(slugify(input)).toBe(slugify(input));
  });
});
