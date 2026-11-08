// Background Service Worker for Text Sanitizer Pro

// Setup context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sanitize-selected-text",
    title: "Sanitize with Text Sanitizer Pro",
    contexts: ["selection"],
  });
});

// Case preservation logic
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

// Escape special regex characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Sanitize text with given word mappings
function sanitize(text, wordMappings) {
  if (!text || !wordMappings) return text;
  let sanitized = text;
  const words = Object.keys(wordMappings).sort((a, b) => b.length - a.length);

  words.forEach((word) => {
    const replacement = wordMappings[word];
    if (typeof replacement !== "string") return;
    const regex = new RegExp(`(?<!\\w)${escapeRegex(word)}(?!\\w)`, "gi");
    sanitized = sanitized.replace(regex, (match) => {
      return preserveCase(match, replacement);
    });
  });

  return sanitized;
}

// In-page function injected to copy text and show visual feedback
function showInPageNotification(sanitizedText) {
  navigator.clipboard
    .writeText(sanitizedText)
    .then(() => {
      const toast = document.createElement("div");
      toast.textContent = "🛡️ Sanitized text copied to clipboard!";
      Object.assign(toast.style, {
        position: "fixed",
        bottom: "28px",
        right: "28px",
        backgroundColor: "#161b22",
        color: "#ffffff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        zIndex: "2147483647",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        border: "1px solid #30363d",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: "0",
        transform: "translateY(12px)",
        pointerEvents: "none",
      });

      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(12px)";
        setTimeout(() => toast.remove(), 350);
      }, 2500);
    })
    .catch((err) => {
      console.error("Text Sanitizer: Failed to copy to clipboard", err);
    });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sanitize-selected-text" && info.selectionText) {
    chrome.storage.sync.get(["wordMappings"], (result) => {
      const mappings = result.wordMappings || {};
      const sanitized = sanitize(info.selectionText, mappings);

      if (tab && tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: showInPageNotification,
          args: [sanitized],
        });
      }
    });
  }
});

