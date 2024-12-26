# Color Picker Chrome Extension

This is a simple Chrome extension that allows you to pick a color from any webpage and copy its hex code to the clipboard.

## Features

- Pick any color from a webpage with a crosshair cursor.
- Automatically copies the selected color's hex code to your clipboard.
- Works without a popup page (background script-driven).
- Simple and efficient color picking tool for developers and designers.

## Installation Instructions

1. **Download the Extension Files:**
   - Clone or download the repository to your local machine.

2. **Load the Extension in Chrome:**
   - Open `chrome://extensions/` in your browser.
   - Enable **Developer Mode** in the top right corner.
   - Click **Load unpacked** and select the folder where the extension files are located.

3. **Activate the Color Picker:**
   - After installation, the extension icon will appear in the Chrome toolbar.
   - Click the extension icon to activate the color picker.
   - The cursor will change to a crosshair, allowing you to click on any pixel on the page to capture its color.

4. **Using the Extension:**
   - Once you click on a color on the page, the hex code for the selected color will be copied to your clipboard automatically.
   - The extension will stop after one click to prevent further interference with your browser’s functionality.

## Permissions

- **activeTab**: Allows the extension to interact with the current active page.
- **clipboardWrite**: Enables the extension to copy the color code to your clipboard.

## Troubleshooting

- **Error: "Cannot access a chrome:// URL"**: This extension does not work on Chrome's internal pages (`chrome://`), local files (`file://`), or similar restricted URLs.
  
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
