# SecureVault - Password Manager

[![Live Demo](https://img.shields.io/badge/Live%20Demo-securevault--mdpn.vercel.app-blue?style=for-the-badge)](https://securevault-mdpn.vercel.app)

A modern, secure, and user-friendly password manager built with React, TypeScript, and Tailwind CSS.  
All your passwords are encrypted locally using AES-GCM 256-bit encryption.  
**Never forget a password again!**

---

## Features

- 🔒 **High-Grade Security:** AES-GCM 256-bit encryption for all stored passwords.
- 🧠 **Smart Password Generation:** Generate strong, unique passwords with a single click.
- 👁️ **Breach Monitoring:** Get alerts if your accounts are found in data breaches. (Soon)
- 💾 **Local Backup:** All data is stored securely in your browser’s local storage.
- 🛡️ **Zero-Knowledge Architecture:** Only you know your master password; even we can’t access your data.
- 📱 **Responsive Design:** Works great on desktop and mobile.
- 🆓 **Free for personal use!**

---

## Live Demo

Try it now: https://securevault-mdpn.vercel.app

---

# For Dev and Contributor
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) 

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MDPN23/password-vault.git
   cd password-vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
src/
  components/      # React components (Dashboard, LoginPage, PasswordCard, etc)
  hooks/           # Custom React hooks (useAuth, useLocalStorage)
  types/           # TypeScript type definitions
  utils/           # Utility functions (crypto, password generation, etc)
  index.css        # Tailwind CSS
  App.tsx          # Main app component
  main.tsx         # Entry point
```

---

## Security

- **Encryption:** All stored passwords are encrypted in the browser using your master password. (Master password wasn't encrypted)
- **Zero-Knowledge:** Your master password is never stored or sent anywhere.
- **Local Storage:** All data stays on your device.

---

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) (icons)
- [Vite](https://vitejs.dev/) (build tool)

---

## License

MIT License

---

## Credits

- Built as part of IBM Code Generation Bootcamp & Hacktiv8 Final Project.
- Inspired by best practices in password management and security.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Disclaimer

This project is for educational purposes.  
**Do not use for storing real, sensitive passwords in production.**
