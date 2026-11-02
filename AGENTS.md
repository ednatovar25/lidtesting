# Linked-Intent Dev (LID) Core Protocol

## 1. Intent Hierarchy & Cascade
All feature development and changes must flow strictly downward through these levels:
1. 🎯 **HLD (High-Level Design):** Defines purpose, boundaries, and tie-breaker tenets (`docs/intent/[subsystem]/hld-*.md`).
2. 📐 **LLD (Low-Level Design):** Details component behavior, data flow, and edge cases (`docs/intent/[subsystem]/lld-*.md`).
3. 📋 **EARS Requirements:** One-line actionable specifications (`docs/intent/[subsystem]/requirements.md`).
4. ✅ **Tests & 💻 Code:** Implemented with mandatory `// @spec [ID]` annotations pointing back to requirements.

## 2. Mandatory Pause Rule
After drafting or updating any HLD or LLD, **STOP and PAUSE**. Present your assumptions and architectural choices to the user. Do not proceed to requirements or code until the user approves or corrects the design.

## 3. Traceability Enforcement
* Never write implementation code or unit tests without an active EARS requirement ID.
* Every test file and code block implementing logic must include a spec comment matching its requirement ID (e.g., `// @spec AUTH-001`).