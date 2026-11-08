// Default word mappings
const DEFAULT_WORDS = {
  email: "ema-il",
  gmail: "gma-il",
  whatsapp: "wha-tsapp",
  skype: "sky-pe",
  telegram: "tele-gram",
  discord: "dis-cord",
  phone: "pho-ne",
  mobile: "mobi-le",
  number: "num-ber",
  contact: "conta-ct",
  zoom: "zo-om",
  slack: "sla-ck",
  linkedin: "link-edin",
  facebook: "face-book",
  instagram: "inst-agram",
  twitter: "twit-ter",
  youtube: "yout-ube",
  tiktok: "tik-tok",
  snapchat: "snap-chat",
  pinterest: "pint-erest",
  reddit: "red-dit",
  tumblr: "tum-blr",
  meeting: "mee-ting",
  call: "ca-ll",
  "video call": "vid-eo c-all",
  "google meet": "g-meet",
  anydesk: "any-desk",
  teamviewer: "team-viewer",

  payment: "pa-yment",
  paypal: "p-ay-pal",
  pay: "p-ay",
  payoneer: "p-ay-oneer",
  crypto: "cry-pto",
  bitcoin: "bit-coin",
  wire: "wi-re",
  bank: "ba-nk",
  transfer: "trans-fer",
  cash: "ca-sh",
  invoice: "invo-ice",
  outside: "outsi-de",
  direct: "dire-ct",
  stripe: "str-ipe",
  fee: "f-ee",
  price: "pri-ce",
  cost: "co-st",
  billing: "bill-ing",

  homework: "home-work",
  assignment: "assign-ment",
  essay: "ess-ay",
  thesis: "the-sis",
  exam: "ex-am",
  test: "te-st",
  degree: "deg-ree",
  coursework: "course-work",
  academic: "acad-emic",

  review: "revi-ew",
  feedback: "feed-back",
  rating: "rat-ing",
  trustpilot: "trust-pilot",
  "google review": "google-rev",
  followers: "follo-wers",
  subscribers: "subs-cribers",
  "five star": "5-st-ar",
  positive: "posi-tive",
  recommendation: "recomm-end",

  password: "pass-word",
  login: "lo-gin",
  credential: "creden-tial",
  address: "addr-ess",
  location: "loca-tion",
  private: "pri-vate",
  access: "acc-ess",
  verification: "veri-fication",
  guaranteed: "guaran-teed",
  money: "mon-ey",
  income: "inco-me",
  profit: "pro-fit",
  fiverr: "fiv-err",
  order: "ord-er",
  cancel: "can-cel",
  refund: "refu-nd",
  portfolio: "port-folio",
  website: "web-site",
};

// DOM elements
// DOM elements
let inputText,
  outputText,
  sanitizeBtn,
  copyBtn,
  customBtn,
  profileBtn,
  clearBtn,
  pasteBtn,
  inputStats,
  outputStats,
  statusBadge,
  wordList,
  newWordInput,
  newReplacementInput,
  addWordBtn,
  tabButtons,
  tabContents,
  wordCountBadge,
  searchWordsInput,
  resetDefaultsBtn,
  exportWordsBtn,
  importWordsBtn,
  importFileInput;

if (typeof document !== "undefined") {
  inputText = document.getElementById("inputText");
  outputText = document.getElementById("outputText");
  sanitizeBtn = document.getElementById("sanitizeBtn");
  copyBtn = document.getElementById("copyBtn");
  customBtn = document.getElementById("customBtn");
  profileBtn = document.getElementById("profileBtn");
  clearBtn = document.getElementById("clearBtn");
  pasteBtn = document.getElementById("pasteBtn");
  inputStats = document.getElementById("inputStats");
  outputStats = document.getElementById("outputStats");
  statusBadge = document.getElementById("statusBadge");
  wordList = document.getElementById("wordList");
  newWordInput = document.getElementById("newWord");
  newReplacementInput = document.getElementById("newReplacement");
  addWordBtn = document.getElementById("addWordBtn");
  tabButtons = document.querySelectorAll(".tab-btn");
  tabContents = document.querySelectorAll(".tab-content");
  wordCountBadge = document.getElementById("wordCountBadge");
  searchWordsInput = document.getElementById("searchWordsInput");
  resetDefaultsBtn = document.getElementById("resetDefaultsBtn");
  exportWordsBtn = document.getElementById("exportWordsBtn");
  importWordsBtn = document.getElementById("importWordsBtn");
  importFileInput = document.getElementById("importFileInput");
}

// Initialize extension
async function init() {
  await loadWordMappings();
  renderWordList();
  setupEventListeners();
}

// Load word mappings from storage
async function loadWordMappings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["wordMappings"], (result) => {
      if (
        !result.wordMappings ||
        Object.keys(result.wordMappings).length === 0
      ) {
        // Initialize with default words
        chrome.storage.sync.set({ wordMappings: DEFAULT_WORDS }, () => {
          window.wordMappings = DEFAULT_WORDS;
          resolve();
        });
      } else {
        window.wordMappings = result.wordMappings;
        resolve();
      }
    });
  });
}

// Save word mappings to storage
function saveWordMappings() {
  chrome.storage.sync.set({ wordMappings: window.wordMappings }, () => {
    console.log("Word mappings saved");
  });
}

// Sanitize text by replacing restricted words
function sanitizeText(text) {
  const result = sanitizeTextWithStats(text);
  return result.sanitized;
}

// Sanitize text and collect statistics
function sanitizeTextWithStats(text) {
  if (!text || !window.wordMappings) {
    return { sanitized: text, replacedCount: 0, replacedWords: [] };
  }

  let sanitized = text;
  let replacedCount = 0;
  const replacedWords = [];
  const words = Object.keys(window.wordMappings);

  // Sort words by length (longest first) to handle overlapping words correctly
  words.sort((a, b) => b.length - a.length);

  // Create a case-insensitive regex for each word
  words.forEach((word) => {
    const replacement = window.wordMappings[word];
    if (typeof replacement !== "string") {
      return;
    }
    // Use word boundaries to match whole words only (supports symbols like c++)
    const regex = new RegExp(`(?<!\\w)${escapeRegex(word)}(?!\\w)`, "gi");
    let matchCount = 0;
    sanitized = sanitized.replace(regex, (match) => {
      matchCount++;
      // Preserve the original case pattern
      return preserveCase(match, replacement);
    });
    if (matchCount > 0) {
      replacedCount += matchCount;
      replacedWords.push(word);
    }
  });

  return { sanitized, replacedCount, replacedWords };
}

// Update word and character counts
function updateStats(text, targetEl) {
  if (!targetEl) return;
  const trimmed = (text || "").trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const chars = (text || "").length;
  targetEl.textContent = `${words} word${words === 1 ? "" : "s"} | ${chars} char${chars === 1 ? "" : "s"}`;
}

// Escape special regex characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Preserve the case pattern of the original word in the replacement
function preserveCase(original, replacement) {
  if (original === original.toLowerCase()) {
    return replacement.toLowerCase();
  } else if (original === original.toUpperCase()) {
    return replacement.toUpperCase();
  } else if (original[0] === original[0].toUpperCase()) {
    return (
      replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase()
    );
  }
  return replacement;
}

// Render the word list in the settings
function renderWordList(filterQuery = "") {
  if (!window.wordMappings || !wordList) {
    return;
  }

  wordList.innerHTML = "";
  const query = filterQuery.trim().toLowerCase();
  const allWords = Object.keys(window.wordMappings).sort();
  
  const words = query
    ? allWords.filter(
        (w) =>
          w.toLowerCase().includes(query) ||
          String(window.wordMappings[w]).toLowerCase().includes(query)
      )
    : allWords;

  if (wordCountBadge) {
    wordCountBadge.textContent = query
      ? `(${words.length} of ${allWords.length})`
      : `(${allWords.length})`;
  }

  if (words.length === 0) {
    if (query) {
      wordList.innerHTML = `<div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 13px;">No words match "${escapeHtml(query)}"</div>`;
    }
    return;
  }

  words.forEach((word) => {
    const wordItem = document.createElement("div");
    wordItem.className = "word-item";

    wordItem.innerHTML = `
      <div class="word-item-content">
        <span class="word-item-original">${escapeHtml(word)}</span>
        <span class="word-item-arrow">→</span>
        <span class="word-item-replacement">${escapeHtml(window.wordMappings[word])}</span>
      </div>
      <button class="btn-delete" data-word="${escapeHtml(word)}">Delete</button>
    `;

    const deleteBtn = wordItem.querySelector(".btn-delete");
    deleteBtn.addEventListener("click", () => {
      deleteWord(word);
    });

    wordList.appendChild(wordItem);
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Add a new word mapping
function addWord() {
  const word = newWordInput.value.trim().toLowerCase();
  const replacement = newReplacementInput.value.trim();

  if (!word || !replacement) {
    alert("Please enter both word and replacement");
    return;
  }

  if (window.wordMappings[word]) {
    if (!confirm(`"${word}" already exists. Do you want to replace it?`)) {
      return;
    }
  }

  window.wordMappings[word] = replacement;
  saveWordMappings();
  renderWordList();

  // Clear inputs
  newWordInput.value = "";
  newReplacementInput.value = "";
  newWordInput.focus();
}

// Delete a word mapping
function deleteWord(word) {
  if (confirm(`Are you sure you want to delete "${word}"?`)) {
    delete window.wordMappings[word];
    saveWordMappings();
    renderWordList();
  }
}

// Copy output to clipboard
async function copyToClipboard() {
  const text = outputText.value;
  if (!text) {
    alert("No text to copy");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);

    // Visual feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.backgroundColor = "var(--accent-color)";

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.backgroundColor = "";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
    alert("Failed to copy to clipboard");
  }
}

// Reset to default word mappings
function resetDefaults() {
  if (
    confirm(
      "Are you sure you want to reset to default restricted words? Any custom words will be replaced."
    )
  ) {
    window.wordMappings = { ...DEFAULT_WORDS };
    saveWordMappings();
    if (searchWordsInput) searchWordsInput.value = "";
    renderWordList();
  }
}

// Export word mappings as a JSON file
function exportWords() {
  if (!window.wordMappings) return;
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(window.wordMappings, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "text_sanitizer_words.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import word mappings from a JSON file
function importWords(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (typeof imported !== "object" || imported === null || Array.isArray(imported)) {
        alert("Invalid file format. Please upload a valid JSON object of words and replacements.");
        return;
      }

      // Validate all values are strings
      const validEntries = {};
      for (const [key, val] of Object.entries(imported)) {
        if (typeof key === "string" && typeof val === "string") {
          validEntries[key.toLowerCase().trim()] = val.trim();
        }
      }

      const count = Object.keys(validEntries).length;
      if (count === 0) {
        alert("No valid word mappings found in the file.");
        return;
      }

      const shouldMerge = confirm(
        `Found ${count} word mapping(s).\n\nClick OK to MERGE with your existing list, or CANCEL to REPLACE your current list completely.`
      );

      if (shouldMerge) {
        window.wordMappings = { ...window.wordMappings, ...validEntries };
      } else {
        window.wordMappings = validEntries;
      }

      saveWordMappings();
      if (searchWordsInput) searchWordsInput.value = "";
      renderWordList();
      alert(`Successfully imported ${count} word mappings!`);
    } catch (err) {
      console.error("Failed to parse JSON file:", err);
      alert("Error reading file: Invalid JSON format.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

// Setup event listeners
function setupEventListeners() {
  // Live input stats
  if (inputText && inputStats) {
    inputText.addEventListener("input", () => {
      updateStats(inputText.value, inputStats);
    });
  }

  // Paste button
  if (pasteBtn && inputText) {
    pasteBtn.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          inputText.value = text;
          updateStats(text, inputStats);
          inputText.focus();
        }
      } catch (err) {
        console.error("Clipboard paste error:", err);
        alert("Unable to paste from clipboard automatically. Please paste manually (Ctrl+V).");
      }
    });
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (inputText) inputText.value = "";
      if (outputText) outputText.value = "";
      updateStats("", inputStats);
      updateStats("", outputStats);
      if (statusBadge) {
        statusBadge.className = "status-badge";
        statusBadge.textContent = "";
      }
      if (inputText) inputText.focus();
    });
  }

  // Sanitize button
  sanitizeBtn.addEventListener("click", () => {
    const input = inputText ? inputText.value : "";
    const { sanitized, replacedCount } = sanitizeTextWithStats(input);
    if (outputText) {
      outputText.value = sanitized;
      updateStats(sanitized, outputStats);
    }

    if (statusBadge) {
      if (replacedCount > 0) {
        statusBadge.textContent = `✨ ${replacedCount} word${replacedCount === 1 ? "" : "s"} sanitized`;
        statusBadge.className = "status-badge success";
      } else if (input.trim()) {
        statusBadge.textContent = "✅ No restricted words found";
        statusBadge.className = "status-badge info";
      } else {
        statusBadge.className = "status-badge";
        statusBadge.textContent = "";
      }
    }
  });

  // Copy button
  copyBtn.addEventListener("click", copyToClipboard);

  // Search words in settings
  if (searchWordsInput) {
    searchWordsInput.addEventListener("input", (e) => {
      renderWordList(e.target.value);
    });
  }

  // Reset defaults
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener("click", resetDefaults);
  }

  // Export words
  if (exportWordsBtn) {
    exportWordsBtn.addEventListener("click", exportWords);
  }

  // Import words
  if (importWordsBtn && importFileInput) {
    importWordsBtn.addEventListener("click", () => importFileInput.click());
    importFileInput.addEventListener("change", importWords);
  }

  // Custom Greeting button
  customBtn.addEventListener("click", () => {
    const currentText = outputText ? outputText.value : "";
    if (!currentText) {
      if (inputText && inputText.value) {
        // Auto-sanitize if input exists but output doesn't
        sanitizeBtn.click();
        setTimeout(() => customBtn.click(), 50);
        return;
      }
      alert("Please sanitize some text first!");
      return;
    }

    const separator = "===========================================\n";
    const greeting = separator + "Hello there,\nI hope you are doing well.\n\n";
    const closing = "\n\nThank you\n" + separator.trim();

    // Prevent double adding
    if (
      currentText.startsWith(separator + "Hello there,") &&
      currentText.endsWith("Thank you\n" + separator.trim())
    ) {
      return;
    }

    const newText = greeting + currentText + closing;
    outputText.value = newText;
    updateStats(newText, outputStats);
  });

  // Profile button
  profileBtn.addEventListener("click", () => {
    const currentText = outputText ? outputText.value : "";
    const profileTemplate =
      "Profile:\nClient Name:\nOrder ID:\nQuality Check: \n\n\n";

    // Prevent double adding if starts with "Profile:"
    if (currentText.startsWith("Profile:")) {
      return;
    }

    const newText = currentText ? profileTemplate + currentText : profileTemplate;
    outputText.value = newText;
    updateStats(newText, outputStats);
  });

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // Remove active class from all tabs and buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const targetContent = document.getElementById(`${targetTab}Tab`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Add word button
  addWordBtn.addEventListener("click", addWord);

  // Allow Enter key to add word
  newWordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      newReplacementInput.focus();
    }
  });

  newReplacementInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addWord();
    }
  });

  // Auto-sanitize on input (optional - can be removed if too aggressive)
  // inputText.addEventListener('input', () => {
  //   const input = inputText.value;
  //   const sanitized = sanitizeText(input);
  //   outputText.value = sanitized;
  // });
}

// Initialize when DOM is ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { sanitizeText, sanitizeTextWithStats, DEFAULT_WORDS };
}
