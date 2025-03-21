# Contest Tracker

Welcome to **Contest Tracker**! This web app helps you stay on top of upcoming coding contests from platforms like **Codeforces**, **CodeChef**, and **LeetCode**. You can view contests, track statuses, and even watch solution videos linked directly from YouTube.

---

## 🚀 Features

- **Track Coding Contests:** View ongoing, upcoming, and completed contests.
- **YouTube Solution Sync:** Automatically fetch solution videos using YouTube API.
- **Efficient Backend:** Node.js, Express, and MongoDB for seamless performance.
- **Secure API:** Protected with authentication using secret tokens.
- **Cron Job Support:** Scheduled updates using Vercel’s cron job functionality.
- **Bookmark Contests:** Store favorite contests locally using browser storage.

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API Services:** Codeforces API, CodeChef API, LeetCode API, YouTube API
- **Deployment:** Vercel

---

## 🧑‍💻 Installation

1. **Clone the Repository**
```bash
https://github.com/your-username/contest-tracker.git
```

2. **Navigate to the Project**
```bash
cd contest-tracker
```

3. **Install Dependencies**
```bash
npm install
```

4. **Configure Environment Variables**
   Create a `.env` file in both the backend and frontend directories.

**Backend `.env`:**
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_youtube_channel_id
CRON_SECRET_TOKEN=your_secure_token
```

5. **Start Backend**
```bash
node index.js
```

6. **Start Frontend**
```bash
npm run dev
```

7. **Access the App**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

---

## 🔔 API Endpoints

- `GET /api/contests` → Fetch all contests.
- `GET /api/solutions/update-videos` → Trigger the YouTube video sync (Protected by Token).

**Note:** For external use, pass the authorization token using `?token=YOUR_SECRET_TOKEN`.

---

## 📅 Cron Job Setup
- Vercel's cron job runs the `/api/solutions/update-videos` endpoint daily at midnight (UTC).
- Managed securely using `CRON_SECRET_TOKEN` in environment variables.
- Logs can be monitored directly from the Vercel Dashboard.

---


