/** Tests that the trading rules state the engine's costs as its README does. */

import { describe, expect, it } from "vitest";

import { RULES, type RuleKind } from "./content";

function rule(kind: RuleKind) {
  const found = RULES.find((r) => r.kind === kind);
  if (!found) throw new Error(`no ${kind} rule`);
  return found;
}

describe("RULES", () => {
  it("never says that a trade can pay no spread", () => {
    for (const { title, detail, example } of RULES) {
      expect(`${title} ${detail} ${example}`).not.toMatch(/\b(no|zero|without a) spread\b|spread-free/i);
    }
  });

  it("charges the spread on opening and again on closing a position", () => {
    expect(rule("spreads").detail).toMatch(/when you open or increase a position and again when you reduce or close it/);
  });

  it("lowers the profit fee with the time the position was held", () => {
    expect(rule("profit").detail).toMatch(
      /from 100% on a position closed within 10 seconds of opening to 10% on one held for 15 minutes or more/,
    );
  });
});
