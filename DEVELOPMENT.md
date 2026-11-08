# Development Guide

This project is configured to make development as smooth as possible, similar to `npm run dev`.

## Running the Extension

You can run the extension in live development mode using `npm`:

### Option 1: Using NPM (Recommended)

1.  Open a terminal in the project directory.
2.  Run the following command:

    ```bash
    npm run dev
    ```

This will launch a new Chromium browser instance with your extension loaded. It automatically watches for file changes and reloads the extension, providing a live development experience similar to React.

### Option 2: Using VS Code

1.  **Open the Run and Debug sidebar** in VS Code (Ctrl+Shift+D).
2.  Select **"Launch Chrome Extension"** from the dropdown loop.
3.  Press **F5** (or the green play button).

This will open a new Chrome window with your extension loaded. You should see the extension icon in the toolbar. This is a temporary Chrome profile for development.

## Making Changes

When you make changes to `popup.js` or `styles.css`:

1.  **Save your files.**
2.  **In the Chrome window**, if you have the popup open, right-click inside the popup and select **Reload**.
3.  Alternatively, go to `chrome://extensions` in the launched browser and click the **reload icon** on the Text Sanitizer card.

## Debugging

- You can set breakpoints directly in VS Code in `popup.js`.
- Or, right-click the extension popup and choose **Inspect** to use Chrome DevTools.

## Building for Production

To create a production build (a `.zip` file ready for upload to the Chrome Web Store):

1.  Run the following command:

    ```bash
    npm run build
    ```

2.  This will create a `dist` folder in your project directory containing the `.zip` file.
3.  Upload this `.zip` file to the Chrome Web Store Developer Dashboard.

Note: The build process automatically excludes `node_modules` and other development files.

## Troubleshooting

- If the extension doesn't load, check the `chrome://extensions` page for any error messages in the "Errors" button.
