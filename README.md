🔗 URL Shortener (React + Vite)

This is a React + Vite based URL Shortener web application.

## Features

- Generate short URLs with custom shortcodes
- View and manage stored URLs
- Validate if a link is active or expired
- View statistics like click count, expiry date, and click logs
- Track clicks and referrer sources
- Local storage to persist data
- Simple, modern UI with Chakra UI

## Project Structure

demo1/
│
├── public/
│ └── vite.svg
├── src/
│ ├── components/
│ │ ├── URLform.jsx
│ │ ├── URLTable.jsx
│ │ └── Stats.jsx
│ ├── context/
│ │ └── AppContext.jsx
│ ├── hooks/
│ │ └── userLogger.jsx
│ ├── pages/
│ │ ├── Home/
│ │ │ ├── Home.jsx
│ │ │ └── Home.css
│ │ ├── Redirect/
│ │ │ ├── RedirectHandler.jsx
│ │ │ └── RedirectHandler.css
│ │ └── StatsPage.jsx
│ ├── utils/
│ │ ├── Storage/
│ │ │ ├── storage.jsx
│ │ │ └── storage.css
│ │ └── Validator/
│ │ ├── Validator.jsx
│ │ └── validator.css
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ └── App.css
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md

## Tech Stack

- Frontend: React (Vite)
- Styling: Chakra UI, CSS
- State Management: React Context, Hooks
- Storage: Browser LocalStorage
- Tools: ESLint

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
