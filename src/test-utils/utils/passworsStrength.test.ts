import { expect } from "vitest";
import { getPasswordStrength } from "../../utils/passwordStrength";

describe("getPasswordStrength", () => {
  test('returns score 0 and "Very Weak" for empty password', () => {
    const result = getPasswordStrength("");
    expect(result.score).toBe(0);
    expect(result.label).toBe("Very Weak");
  });

  test('returns "Weak" for short password with lowercase', () => {
    const result = getPasswordStrength("pass1");
    expect(result.score).toBe(2);
    expect(result.label).toBe("Weak");
  });

  test('returns "Fair" for medium strength (3 criteria)', () => {
    const result = getPasswordStrength("Pass1");
    expect(result.score).toBe(3);
    expect(result.label).toBe("Fair");
  });

  test('returns "Strong" for full criteria', () => {
    const result = getPasswordStrength("Pass123!");
    expect(result.score).toBe(5);
    expect(result.label).toBe("Strong");
  });
});
