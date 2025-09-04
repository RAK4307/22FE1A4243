# 🔗 URL Shortener (React + Vite)

This is a modern URL Shortener web application built with **React** and **Vite**. It allows users to create, manage, and track shortened URLs directly in their browser.

---

## ✨ Features

-   **Generate Short URLs**: Quickly create short links with optional custom shortcodes.
-   **Manage Links**: View all your stored URLs in a clean, organized table.
-   **Link Validation**: Automatically checks if a link is active or expired.
-   **Click Statistics**: See detailed stats including total click count, expiry date, and individual click logs.
-   **Referrer Tracking**: Track the source of your clicks to understand your audience.
-   **Persistent Storage**: Uses browser LocalStorage to save your data, so you don't lose it on refresh.
-   **Modern UI**: A simple and intuitive interface built with **Chakra UI**.

---

## 🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **Styling**: Chakra UI, CSS
-   **State Management**: React Context API & Hooks
-   **Storage**: Browser LocalStorage
-   **Linting**: ESLint

---

## 📂 Project Structure

```
demo1/
│
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── URLform.jsx
│   │   ├── URLTable.jsx
│   │   └── Stats.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   └── userLogger.jsx
│   ├── pages/
│   │   ├── Home/
│   │   ├── Redirect/
│   │   └── StatsPage.jsx
│   ├── utils/
│   │   ├── Storage/
│   │   └── Validator/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
---

## Getting Started

1. Clone the Repository
   ```sh
   git clone https://github.com/<your-username>/22FE1A4243.git
   cd demo1
   ```
2. Install Dependencies
   ```sh
   npm install
   ```
3. Run the Development Server
   ```sh
   npm run dev
   ```
4. Build for Production
   ```sh
   npm run build
   ```

## Screenshots

<img width="1601" height="862" alt="image" src="https://github.com/user-attachments/assets/148a89e1-4e83-4093-9ec3-6f49ca5c899d" />

<img width="1249" height="585" alt="image" src="https://github.com/user-attachments/assets/53bffc78-cdec-431f-889a-1eca6c47e30c" />


<img width="777" height="465" alt="image" src="https://github.com/user-attachments/assets/15d5838f-82e1-4b84-a31d-1469f885f6dc" />


## Submission Details

- Repository Name: 22FE1A4243
- Track: Frontend Track
- No personal identifiers or company names included
