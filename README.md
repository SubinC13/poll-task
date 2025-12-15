# 🗳️ QuickPoll - Real-time Polling Application

A modern, real-time polling application built with React, Node.js, and Socket.IO. Create polls, vote instantly, and see results update in real-time across all connected clients.

## ✨ Features

See votes appear instantly using Socket.IO
UI that works on all devices
No database needed, in-memory storage
Prevents double voting using sessionStorage
Visual progress bars with percentages
View all created polls in one place
Get running in minutes

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks
- **Vite** - Lightning fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** + **Express** - RESTful API
- **Socket.IO** - WebSocket server
- **Nanoid** - Unique poll IDs
- **CORS** - Cross-origin support

### Storage
- **In-memory JavaScript object** - No database required

## 📁 Project Structure

```
quickpoll-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level components
│   │   ├── services/    # API & Socket services
│   │   ├── hooks/       # Custom React hooks
│   │   └── ...
│   └── package.json
│
├── server/              # Node.js backend
│   ├── src/
│   │   ├── routes/      # Express routes
│   │   ├── controllers/ # Business logic
│   │   ├── socket/      # Socket.IO handlers
│   │   ├── data/        # In-memory store
│   │   └── ...
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)

### Installation

1. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

#### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`

#### Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`


## 📡 API Endpoints

### `POST /polls`
Create a new poll

**Request Body:**
```json
{
  "question": "What's your favorite framework?",
  "options": ["React", "Vue", "Angular", "Svelte"]
}
```

**Response:**
```json
{
  "id": "abc123xyz",
  "question": "What's your favorite framework?",
  "options": [
    { "text": "React", "votes": 0 },
    { "text": "Vue", "votes": 0 },
    { "text": "Angular", "votes": 0 },
    { "text": "Svelte", "votes": 0 }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "totalVotes": 0
}
```

### `GET /polls`
Get all polls (summary list)

**Response:**
```json
[
  {
    "id": "abc123xyz",
    "question": "What's your favorite framework?",
    "totalVotes": 11,
    "optionsCount": 4,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "def456uvw",
    "question": "Best programming language?",
    "totalVotes": 5,
    "optionsCount": 3,
    "createdAt": "2024-01-01T01:00:00.000Z"
  }
]
```

### `GET /polls/:id`
Get a poll by ID

**Response:**
```json
{
  "id": "abc123xyz",
  "question": "What's your favorite framework?",
  "options": [
    { "text": "React", "votes": 5 },
    { "text": "Vue", "votes": 3 },
    { "text": "Angular", "votes": 2 },
    { "text": "Svelte", "votes": 1 }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "totalVotes": 11
}
```

### `POST /polls/:id/vote`
Vote on a poll

**Request Body:**
```json
{
  "optionIndex": 0
}
```

## 📝 Notes

- Polls are stored in-memory and will be lost when the server restarts
- Vote tracking uses sessionStorage (cleared when browser session ends)
- The app uses CORS to allow frontend-backend communication