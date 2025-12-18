# 🎮 Une Famille en Or (Family Feud)

A French-style Family Feud game built with React, TypeScript, and Tailwind CSS. Perfect for parties, family gatherings, and holiday events!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7-646cff.svg)

## ✨ Features

- **Classic Game Board** - Authentic Family Feud style board with flip animations
- **Two-Team Scoring** - Track points for two competing teams
- **Strike System** - Visual strike indicators (up to 3 strikes)
- **Host Controls** - Dedicated host page to control the game flow
- **Admin Panel** - Create, edit, and manage survey questions
- **Sound Effects** - Authentic game sounds (correct answers, strikes, victory)
- **Voice Recording** - Record contestant answers for entertainment
- **French UI** - Complete French localization

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/family_feud.git
   cd family_feud
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**
   - Navigate to `http://localhost:5173` in your browser

## 📖 How to Use

### Pages Overview

| Page              | URL      | Description                                       |
| ----------------- | -------- | ------------------------------------------------- |
| **Game Board**    | `/`      | Display for audience/contestants (full-screen TV) |
| **Host Controls** | `/host`  | Control panel for the game host                   |
| **Admin Panel**   | `/admin` | Manage survey questions                           |

### Recommended Setup

For the best experience, use **two screens**:

1. **Screen 1 (TV/Projector)**: Open the Game Board (`/`) in full-screen mode
2. **Screen 2 (Laptop/Tablet)**: Open Host Controls (`/host`) to manage the game

### Game Flow

1. **Prepare Questions** - Go to `/admin` and add your survey questions
2. **Start the Game** - Open `/` on the display and `/host` on your control device
3. **Select a Question** - Use the host controls to load a question
4. **Play the Round** - Reveal answers as teams guess correctly
5. **Award Points** - Click the team button to award round points
6. **Continue** - Move to the next question and repeat!

## 📝 Adding Questions

### Via Admin Panel

1. Navigate to `/admin`
2. Fill in the question prompt
3. Add up to 8 answers with their point values (ranked by popularity)
4. Click "Ajouter la question"
5. Export your questions as JSON to save them

### Via JSON Import

You can also import questions from a JSON file. Format:

```json
[
  {
    "id": "1",
    "prompt": "Nommez quelque chose qu'on trouve dans un réfrigérateur",
    "answers": [
      { "text": "Lait", "points": 35, "revealed": false },
      { "text": "Oeufs", "points": 25, "revealed": false },
      { "text": "Beurre", "points": 15, "revealed": false },
      { "text": "Fromage", "points": 12, "revealed": false },
      { "text": "Légumes", "points": 8, "revealed": false },
      { "text": "Jus", "points": 5, "revealed": false }
    ]
  }
]
```

## 🎵 Sound Effects

The game includes built-in sound effects:

- ✅ **Correct Answer** - Ding sound when revealing an answer
- ❌ **Strike** - Buzzer sound for wrong answers
- 🎉 **Victory** - Fanfare when a team wins the round

## 🛠️ Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🏗️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router 7** - Navigation
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnswerCard.tsx   # Individual answer display
│   ├── GameBoard.tsx    # Main game board
│   ├── ScoreBoard.tsx   # Team scores display
│   └── StrikeDisplay.tsx # Strike indicators
├── pages/               # Route pages
│   ├── GamePage.tsx     # Main display page
│   ├── HostPage.tsx     # Host controls
│   └── AdminPage.tsx    # Question management
├── hooks/               # Custom React hooks
│   └── useGameState.ts  # Game state management
├── types/               # TypeScript definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── sounds.ts        # Sound effect utilities
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🎄 Sample Questions

Check out `question_noel.json` for Christmas-themed sample questions!

## 📄 License

MIT License - feel free to use this for your own family game nights!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made with ❤️ for family fun nights!
