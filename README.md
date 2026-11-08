# Text Sanitizer Pro - Chrome Extension

A professional Chrome Extension (Manifest V3) that sanitizes text by replacing restricted words with safe alternatives. Designed to help users communicate safely on platforms with strict keyword policies.

## Features

- **🛡️ Text Sanitization**: Automatically replaces restricted words (e.g., "payment" -> "pa-yment", "email" -> "ema-il").
- **🖱️ Right-Click Context Menu**: Select any text on any webpage, right-click, and choose "Sanitize with Text Sanitizer Pro" to instantly sanitize and copy to your clipboard with toast notification.
- **✨ Smart Case Preservation**: Maintains the original capitalization of words (e.g., "Payment" -> "Pa-yment", "PAYMENT" -> "PA-YMENT").
- **📊 Real-time Stats & Replacement Counter**: Live character/word counts and badges showing exact number of restricted words sanitized.
- **🔍 Search & Filter**: Search through restricted words in seconds.
- **💾 Export & Import (JSON)**: Easily backup your custom word mappings or share them across devices.
- **🔄 Reset to Defaults**: Restore original factory default words at any time with one click.
- **👋 Custom Greetings & Profile Snippets**: Add professional greetings or order check templates with one click.
- **📋 One-Click Copy & Paste**: Quick actions to paste into input and copy output to clipboard.
- **🗑️ Quick Clear**: Reset both input and output fields in a single click.
- **⚙️ Custom Word Management**: Add, view, search, and delete your own restricted words and replacements.
- **🌗 Dark/Light Mode**: Automatically adapts to your system's color scheme.
- **🔄 Cloud Sync**: Custom words are synced across your Chrome devices via Chrome Sync Storage.

## Installation

### For Users (Development Mode)

1.  Clone or download this repository.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **"Developer mode"** (toggle in the top right corner).
4.  Click **"Load unpacked"**.
5.  Select the folder containing the extension files (the root of this project).

### For Developers

1.  Ensure you have [Node.js](https://nodejs.org/) installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server (auto-reloads on change):
    ```bash
    npm run dev
    ```
    This will launch a new Chromium instance with the extension loaded.

Build Instructions

To create a production-ready ZIP file for the Chrome Web Store:

1.  Run the build command:
    ```bash
    npm run build
    ```
2.  This creates a `dist` folder containing a `.zip` file (e.g., `text_sanitizer_pro-1.1.0.zip`).
3.  Upload this ZIP file to the Chrome Web Store Developer Dashboard.

> **Note:** The build process uses `web-ext` to package the extension. It automatically ignores `node_modules` and other development files to keep the package size small.

## Usage

1.  Click the **Text Sanitizer Pro** icon in your Chrome toolbar.
2.  Paste your text into the **"Input Text"** area.
3.  Click **"Sanitize"** to process the text.
4.  (Optional) Click **"Custom"** (👋) to wrap your text with a standard greeting and closing.
5.  Click **"Copy"** to copy the result to your clipboard.

## Customization

You can add your own words in the **Settings** tab:

1.  Enter the word to block (e.g., "urgent").
2.  Enter the safe replacement (e.g., "urg_ent").
3.  Click **"Add Word"**.

## Project Structure

- `manifest.json`: Configuration file for the Chrome Extension.
- `popup.html`: The user interface structure.
- `styles.css`: Styling for the popup (handles dark/light mode).
- `popup.js`: Core logic for sanitization, UI interaction, and storage.
- `generate-icons.html`: Helper tool to generate extension icons.

## License

ISC
# text_sanitize
