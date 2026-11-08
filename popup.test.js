// Mock globals BEFORE requiring the module
global.window = {
  wordMappings: {},
};

// Mock chrome API
global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
};

const { sanitizeText, sanitizeTextWithStats, DEFAULT_WORDS } = require("./popup");

// Re-assign default words to window for tests that need it
global.window.wordMappings = DEFAULT_WORDS;

describe("Text Sanitizer", () => {
  beforeEach(() => {
    // Reset window.wordMappings before each test to ensure clean state
    global.window.wordMappings = { ...DEFAULT_WORDS };
  });

  test("should sanitize simple restricted words", () => {
    const input = "Please contact me via email or phone.";
    const expected = "Please conta-ct me via ema-il or pho-ne.";
    expect(sanitizeText(input)).toBe(expected);
  });

  test("should preserve case for capitalized words", () => {
    const input = "Email me at support.";
    const expected = "Ema-il me at support.";
    expect(sanitizeText(input)).toBe(expected);
  });

  test("should preserve case for UPPERCASE words", () => {
    const input = "DO NOT CALL ME.";
    const expected = "DO NOT CA-LL ME.";
    expect(sanitizeText(input)).toBe(expected);
  });

  test("should handle MixedCase properly", () => {
    const input = "WhatsApp is popular.";
    const expected = "Wha-tsapp is popular.";
    expect(sanitizeText(input)).toBe(expected);
  });

  test("should return original text if no restricted words found", () => {
    const input = "Hello world, this is a safe sentence.";
    expect(sanitizeText(input)).toBe(input);
  });

  test("should handle empty input", () => {
    expect(sanitizeText("")).toBe("");
    expect(sanitizeText(null)).toBe(null);
    expect(sanitizeText(undefined)).toBe(undefined);
  });

  test("should handle words with regex special characters if any", () => {
    // Adding a test case for a custom mapping with special chars
    global.window.wordMappings["c++"] = "cpp";
    const input = "I love c++ coding.";
    const expected = "I love cpp coding.";
    expect(sanitizeText(input)).toBe(expected);
  });

  test("should accurately report replacement statistics with sanitizeTextWithStats", () => {
    const input = "Please contact me via email or phone.";
    const result = sanitizeTextWithStats(input);
    expect(result.sanitized).toBe("Please conta-ct me via ema-il or pho-ne.");
    expect(result.replacedCount).toBe(3);
    expect(result.replacedWords.sort()).toEqual(["contact", "email", "phone"].sort());
  });

  test("should return 0 replacements for safe text in sanitizeTextWithStats", () => {
    const input = "Good morning! Looking forward to working together.";
    const result = sanitizeTextWithStats(input);
    expect(result.sanitized).toBe(input);
    expect(result.replacedCount).toBe(0);
    expect(result.replacedWords).toEqual([]);
  });
});
