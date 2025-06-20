# 🔐 SecureVault - Password Manager

[![Live Demo](https://img.shields.io/badge/Live%20Demo-securevault--mdpn.vercel.app-blue?style=for-the-badge)](https://securevault-mdpn.vercel.app)

A secure, modern, and easy-to-use password manager designed to keep your credentials safe and accessible only to you.

---

## 📝 Description

SecureVault is a privacy-focused password manager built with React, TypeScript, and Tailwind CSS. It runs entirely in the browser with **zero-knowledge architecture**, meaning only *you* can access your stored data. It offers encrypted local storage, password generation, and breach detection (coming soon), making it a reliable tool for secure credential management.

This project was developed as part of the IBM Code Generation Bootcamp & Hacktiv8 Final Project, utilizing AI technologies for efficient development.

---

## 🧰 Technologies Used

* **React** – Frontend library
* **TypeScript** – Type safety
* **Tailwind CSS** – Utility-first CSS
* **Vite** – Build tool
* **lucide-react** – Icon library
* **AES-GCM (256-bit)** – Encryption algorithm for password storage
* **LocalStorage** – Secure, offline-first data persistence

---

## ✨ Features

* 🔒 **256-bit AES Encryption** – Passwords encrypted locally with military-grade security.
* 🧠 **Password Generator** – Create strong, unique passwords instantly.
* 👁️ **Breach Monitoring** – Alerts when your credentials are found in data leaks. *(Coming soon)*
* 💾 **Offline-first** – Data stored securely in your browser (LocalStorage).
* 🛡️ **Zero-Knowledge** – No data is stored on servers; even the app doesn’t know your password.
* 📱 **Responsive UI** – Works seamlessly on both desktop and mobile devices.
* 🆓 **Free & Open Source** – Fully available for personal use and contributions.

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

* Node.js v18+
* npm or yarn

### 📦 Installation

```bash
git clone https://github.com/MDPN23/password-vault.git
cd password-vault
npm install # or yarn install
npm run dev # or yarn dev
```

Visit the app at `http://localhost:5173`

---

## 🧠 AI Support Explanation

SecureVault’s frontend and logic were accelerated using **IBM Granite** models via **Watsonx.ai**, specifically for:

* ✍️ **Code Generation** – Generating UI components and encryption utilities with AI prompting.
* 🛠️ **Code Fixing** – Rapidly identifying and fixing logic issues during prototyping.
* 📚 **Best Practice Suggestions** – Improving architecture and component structure through AI-enhanced recommendations.

This AI-driven approach reduced development time while maintaining a high level of security and usability.

---

## 🗂️ Project Structure

```
src/
  components/      # UI components (Dashboard, LoginPage, etc.)
  hooks/           # Custom React hooks (auth, local storage)
  types/           # TypeScript types
  utils/           # Crypto, password generator, etc.
  index.css        # Tailwind styles
  App.tsx          # App layout
  main.tsx         # Entry point
```

---

## 🔐 Security Considerations

* **Encryption:** Passwords are encrypted in-browser using the master password.
* **Local-Only Storage:** No server interaction; your data stays in your device.
* **Zero-Knowledge:** Master password is never stored or sent.

> ⚠️ **Note:** This project is for educational purposes. Do not use it for real production data or sensitive credentials.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Credits

* Developed during IBM Code Generation Bootcamp in collaboration with Hacktiv8.
* Inspired by modern password managers and zero-trust architecture design.

---

## 🤝 Contributing

Pull requests are welcome! Open an issue first for significant changes or suggestions.
