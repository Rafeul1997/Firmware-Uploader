# 🚀 Firmware Uploader

A browser-based firmware flashing tool for ESP and Arduino boards.

This project allows users to upload firmware directly from a web interface using Web Serial technology without installing desktop software.

---

# ✨ Features

- 🔌 Connect boards directly from browser
- ⚡ Upload firmware with one click
- 📁 Supports `.bin`, `.hex`, and `.uf2`
- 🖥 Clean professional UI
- 📊 Live upload progress bar
- 📡 Web Serial API support
- 🧩 Multiple board support
- ☁️ GitHub Pages hosting compatible

---

# 🛠 Supported Boards

| Board Type | Firmware Format |
|---|---|
| ESP32 | `.bin` |
| ESP8266 | `.bin` |
| Arduino Uno | `.hex` |
| Arduino Nano | `.hex` |
| Arduino Mega | `.hex` |
| RP2040 / Pico | `.uf2` |

---

# 📂 Project Structure

```text
firmware-uploader/
│
├── index.html
├── style.css
├── script.js
├── firmware/
│   ├── esp32/
│   ├── esp8266/
│   ├── arduino/
│   └── pico/
│
├── config/
│   └── firmware.json
│
└── README.md
