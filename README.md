# 🚀 Go Viral AI

### AI-Powered Content Virality Analyzer

**Analyze your hooks. Improve your captions. Create content with confidence.**

Go Viral AI is an AI-powered web application that helps content creators evaluate their hooks and captions before publishing. It provides an AI-generated virality score, highlights areas for improvement, and generates suggestions to help creators make their content more engaging.

Built with React, Tailwind CSS, Node.js, Express.js, and Google Gemini AI.

---

## ✨ Features

- 🔥 **Virality Score** — Get an AI-generated estimate of your content's viral potential.
- 📝 **Hook Analysis** — Evaluate your opening lines.
- 💬 **Caption Analysis** — Discover opportunities to improve your captions.
- 🤖 **AI-Powered Recommendations** — Get suggestions based on your content.
- ✍️ **Content Enhancement** — Generate improved versions of hooks and captions.
- 📊 **Analytics Page** — Explore available content insights.
- 📈 **Dashboard** — View available analysis summaries.
- 🎨 **Modern Interface** — Dark styling, gradient accents, and animations.
- 📱 **Responsive Design** — Designed for different screen sizes.

*The virality score is an AI-generated estimate, not a guarantee of actual views or engagement.*

---

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- JavaScript

**Backend**
- Node.js
- Express.js
- REST API

**Artificial Intelligence**
- Google Gemini AI

---

## 📂 Project Structure

```text
go-viral-ai/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AnalyzerCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ResultDashboard.jsx
│   │   ├── pages/
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   └── ReportPage.jsx
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   │   └── analyzeRoutes.js
│   ├── services/
│   │   └── geminiService.js
│   ├── server.js
│   └── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd go-viral-ai
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory using the environment variable names expected by your code. For example:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend using the script defined in `server/package.json`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
```

```markdown
### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Run the frontend:

```bash
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

Keep both the frontend and backend running while testing the application.

---

## 🔐 Security

- Never commit API keys or secrets to GitHub.
- Keep `.env` files out of version control.
- Store the Gemini API key on the backend.
- Configure production environment variables securely.

---

## 🎯 How It Works

1. Enter a hook or caption in the analyzer.
2. Submit your content for analysis.
3. The backend processes the request using Google Gemini AI.
4. Review the generated score, feedback, and suggestions.
5. Use the insights to refine your content before publishing.

---

## 🔮 Future Enhancements

- Platform-specific content recommendations.
- Comparisons between alternative hooks and captions.
- Saved analysis history.
- More detailed scoring explanations.
- A/B testing for content variations.
- Exportable analysis reports.

---

## 👩‍💻 Author

**Muskan Gulati**

- GitHub: [muskan-r](https://github.com/muskan-r)
- LinkedIn: [Muskan Gulati](https://www.linkedin.com/in/muskangulati999)

---

<p align="center">
  <b>Built with AI, curiosity, and a passion for creating smarter content. ✨</b>
</p>