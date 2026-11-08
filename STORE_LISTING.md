# Chrome Web Store Listing - Text Sanitizer Pro

Use the details below when submitting the extension to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## 1. Store Details

- **Extension Name:** Text Sanitizer Pro
- **Summary / Short Description (132 characters max):**
  > Sanitize restricted keywords for Fiverr & Upwork with smart case preservation, quick snippets, and right-click shortcuts.
- **Category:** Productivity (or Developer Tools)
- **Primary Language:** English

---

## 2. Detailed Description

```markdown
Text Sanitizer Pro is a powerful, privacy-first productivity extension built for freelancers, agencies, and professionals who communicate on platforms with strict keyword policies (such as Fiverr, Upwork, and marketplaces).

Avoid accidental account flags, warnings, or message blocks by sanitizing sensitive words (like email, phone, payment methods, reviews, or direct contact terms) with safe, readable alternatives in real-time.

🌟 KEY FEATURES:

🛡️ Smart Text Sanitization:
Automatically replaces over 80+ default restricted words (e.g., "payment" → "pa-yment", "email" → "ema-il", "whatsapp" → "wha-tsapp") using safe, human-readable hyphenations.

✨ Smart Case Preservation:
Maintains original casing seamlessly — whether the word is lowercase, capitalized, or ALL-CAPS (e.g., "Payment" → "Pa-yment", "PAYMENT" → "PA-YMENT").

🖱️ Right-Click Context Menu:
Highlight any text on any webpage, right-click, and select "Sanitize with Text Sanitizer Pro" to sanitize and copy instantly with a sleek in-page confirmation toast.

📊 Live Word & Character Counters:
Keep track of platform message limits with real-time word and character counts, plus a live badge displaying exactly how many restricted words were sanitized.

⚙️ Custom Word Management:
Easily add, edit, or delete custom words with dedicated search and filter capabilities.

💾 JSON Export & Import:
Backup your custom word rules or share them across team members with simple one-click JSON export and import.

🔄 Cloud Sync:
All your custom words sync automatically across your devices via your Google Chrome account.

👋 Quick Snippets & Templates:
One-click shortcuts to prepend greeting/closing messages or client order check templates.

🌗 Dark & Light Mode:
Modern, responsive UI that automatically matches your system theme.

🔒 PRIVACY-FIRST GUARANTEE:
- Zero data collection or tracking.
- 100% of text processing occurs locally inside your browser.
- No network requests or third-party servers.
```

---

## 3. Privacy & Justification for Chrome Web Store Review Team

When prompted in the **Privacy Practices** tab of the dashboard:

### Single Purpose Statement:
> Text Sanitizer Pro helps users sanitize restricted keywords into safe alternatives locally within their browser to prevent accidental policy violations on freelance marketplaces.

### Permission Justifications:
- **`storage`:**
  > Used to save and sync custom restricted words and user preferences across the user's Chrome profile via chrome.storage.sync.
- **`clipboardWrite`:**
  > Used to copy sanitized text to the user's clipboard upon clicking the "Copy" button or using the context menu action.
- **`contextMenus`:**
  > Used to add the "Sanitize with Text Sanitizer Pro" shortcut to the browser's right-click menu when text is selected.
- **`activeTab` & `scripting`:**
  > Used exclusively when the user explicitly triggers the right-click context menu on selected text to display a brief in-page confirmation toast confirming the sanitized text was copied.

---

## 4. Web Store Asset Requirements

- **Store Icon:** 128x128 PNG (`icon128.png` included in project).
- **Small Promo Tile:** 440x280 PNG or JPEG.
- **Marquee Tile (Optional):** 1400x560 PNG or JPEG.
- **Screenshots:** Minimum 1 screenshot (1280x800 or 640x400 PNG/JPEG) showing the popup and settings in action.

