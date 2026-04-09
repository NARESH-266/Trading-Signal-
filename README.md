# 🚀 Trading Signal Platform

A modern, responsive, and dynamic Trading Signal Web Application built with HTML, CSS (Glassmorphism design), and Vanilla JavaScript.

## ✨ Features
* **Premium Dashboard View:** A cinematic UI with dynamic signal cards and background overlay.
* **Real-time Synchronization:** Signals and Admin Broadcast messages sync automatically across active browser tabs.
* **Push Notifications:** Audio chimes play when a new signal or an admin broadcast goes live.
* **Admin Control Panel:** Dedicated admin route securely locked behind a custom Long-Press gesture and secret key. Admins can push signals and broadcast status messages directly to all users.
* **Subscription Tiers:** Integrated tiered views (Free vs Premium/VIP), featuring dynamic locking of cards based on subscription state.

## 🛠️ Technology Stack
* **Frontend Structure:** HTML5
* **Styling:** CSS3 (Custom Variables, CSS Grid/Flexbox, Glassmorphism, Advanced Animations)
* **Logic & Data:** Vanilla JavaScript, LocalStorage API, Web Audio API

## 💻 How to Run Locally

1. **Install VS Code** and the **Live Server** extension.
2. Clone or download this repository to your local machine.
3. Open the project folder in Visual Studio Code.
4. Click `Go Live` at the bottom right corner of VS Code to launch the site.

## 🔐 Admin Authentication
* Go to the Home/Signup page.
* **Click and HOLD** the "Sign Up" button for at least 1 second.
* A hidden modal will appear. Use your secret password (configured in `script.js`).
* You will be taken to the interactive admin dashboard!
