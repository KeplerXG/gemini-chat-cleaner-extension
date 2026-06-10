# Gemini Chat Cleaner

Chrome extension that bulk-deletes unpinned Gemini chats and cleans up your chat history.

## Features

- One-click **Delete Unpinned Now** from the extension popup
- Skips pinned chats automatically
- Ignores sidebar footer items (Activity, profile, location)
- Runs on `https://gemini.google.com/*`

## Install (developer mode)

1. Clone this repository
2. Install dependencies:

```bash
npm install --legacy-peer-deps
```

3. Build the extension:

```bash
npm run build
```

4. Open `chrome://extensions`
5. Enable **Developer mode**
6. Click **Load unpacked**
7. Select the `dist_chrome` folder from this project

## Usage

1. Open [Gemini](https://gemini.google.com/app) in Chrome
2. Pin any chats you want to keep
3. Click the **Gemini Chat Cleaner** extension icon
4. Click **Delete Unpinned Now**

Press **Escape** during bulk delete to stop after the current chat.

## Development

```bash
npm run dev
```

Build output is written to `dist_chrome/`.

## Project structure

- `src/pages/content` — content script injected into Gemini
- `src/pages/popup` — extension popup UI
- `manifest.json` — extension manifest

## License

MIT — see [LICENSE](LICENSE).
