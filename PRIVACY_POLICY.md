# Privacy Policy for Text Sanitizer Pro

**Last updated:** November 8, 2026

## 1. Overview
Text Sanitizer Pro ("we", "our", or "the extension") is designed with a strict **privacy-first** approach. The extension operates entirely within your local browser environment. We do not collect, transmit, store on external servers, or sell any of your personal data or texts.

## 2. Data Collection and Usage
- **Text Processing:** All text entered, pasted, or selected for sanitization is processed purely locally on your device in your browser's memory. It is never logged or transmitted over any network.
- **Custom Words & Settings:** Custom restricted words, replacement rules, and preferences are stored locally using Chrome's native `chrome.storage.sync` API. This data is synced exclusively across your own Google Chrome devices signed into your Google account. We have no access to this data.
- **Clipboard Access:** The `clipboardWrite` permission is used strictly when you click the "Copy" button or use the right-click "Sanitize with Text Sanitizer Pro" action to place the sanitized text into your clipboard.

## 3. Permissions Justification
- `storage`: Required to save and sync your custom restricted words and user preferences across your Chrome devices.
- `clipboardWrite`: Required to allow one-click copying of sanitized text to your clipboard.
- `contextMenus`: Required to display the right-click menu option "Sanitize with Text Sanitizer Pro" when text is selected.
- `activeTab` & `scripting`: Required solely to read the user-selected text on the active tab when the context menu is triggered and display an in-page toast notification confirming the text was sanitized and copied.

## 4. Third-Party Services
Text Sanitizer Pro does not use any third-party analytics, tracking libraries, advertising SDKs, or external APIs.

## 5. Contact
If you have any questions or feedback regarding this Privacy Policy, please open an issue in the extension's repository.

