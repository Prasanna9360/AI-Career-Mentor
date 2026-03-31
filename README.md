# 🤖 AI-Driven Skill-to-Employment Mapping Platform

> **Hackathon Project** — Maps student skills to real-world job opportunities with AI-powered insights, career roadmaps, and personalized guidance.

![Platform](https://img.shields.io/badge/Platform-Web%20App-6366f1?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python)

---

## 🎯 What It Does

Upload your resume → get an **instant, AI-powered career analysis** that maps your skills to real companies and roles.

| Feature | Description |
|---|---|
| 📄 **Resume Parsing** | Extracts text from PDF resumes using pdfplumber |
| 🧠 **Skill Extraction** | NLP-based keyword extraction (spaCy + keyword fallback) |
| 🏢 **Company-Aligned Matching** | Maps skills to 15 real jobs at Google, Amazon, TCS, Infosys, etc. |
| ⚡ **Impact Insight** | *"Learning Node.js can increase your match from 45% → 54%"* |
| 🔥 **Critical Skill Split** | Separates must-learn-first (🔥) from secondary (⚪) skills |
| 📚 **One-Click Learning** | Every missing skill has a direct course link |
| 🗺️ **Career Roadmap** | Step-by-step learning path for your best-fit role |
| 📋 **JD Matcher** | Paste any job description → instant resume vs JD comparison |
| 🤖 **AI Chatbot** | Career guidance chatbot with 30+ topic responses |
| ⏱️ **Time Estimates** | *"~2 months of structured learning to reach 70% readiness"* |
| 👥 **Candidate Comparison** | *"Top candidates have 9–11 skills. You have 5."* |

---

## 🖥️ Tech Stack

```
Frontend : React 18 + Vite  (localhost:5173)
Backend  : Python FastAPI    (localhost:8000)
Parsing  : pdfplumber / PyPDF2
NLP      : spaCy (optional) + keyword extraction
Data     : JSON datasets (15 jobs · 78 course mappings)
```

---

## 📁 Project Structure

```
Antigravity/
├── backend/
│   ├── data/
│   │   ├── jobs.json          # 15 job roles with company, skills, roadmap
│   │   └── courses.json       # 78 skill → course mappings
│   ├── main.py                # FastAPI app (v3) — /upload, /match-jd, /chat
│   ├── job_matcher.py         # Matching logic + insights engine integration
│   ├── insights_engine.py     # Roadmap builder + human-like insight generator
│   ├── resume_parser.py       # PDF → text extraction
│   ├── skill_extractor.py     # NLP skill extraction
│   └── requirements.txt
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # 6-tab main dashboard
│   │   ├── JobMatchCard.jsx   # Company-aligned job card with all insights
│   │   ├── MissingSkills.jsx  # 🔥/⚪ skill split + Learn buttons
│   │   ├── JDMatcher.jsx      # Job description comparison tool
│   │   ├── CareerRoadmap.jsx  # Step-by-step roadmap visualization
│   │   ├── InsightsPanel.jsx  # AI-generated career insights
│   │   ├── ReadinessScore.jsx # Circular gauge + "X% ready for [Role]"
│   │   ├── ResumeSuggestions.jsx
│   │   ├── SkillsPanel.jsx
│   │   ├── CoursesPanel.jsx
│   │   ├── ChatBot.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── UploadSection.jsx
│   ├── utils/
│   │   └── api.js             # API helpers (uploadResume, matchJD, chat)
│   └── index.css              # Full design system (glassmorphism dark theme)
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm**
- **Python** 3.10+

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate it
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Install spaCy model for better NLP
python -m spacy download en_core_web_sm

# Start the backend server
uvicorn main:app --reload --port 8000
```

Backend runs at: **http://localhost:8000**  
API docs at: **http://localhost:8000/docs**

---

### 3. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# From project root
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

### 4. Use the App

1. Open **http://localhost:5173**
2. Upload your PDF resume
3. Explore your career dashboard:
   - **Overview** — Readiness score + top 3 job matches
   - **Skill-to-Employment** — All 15 role matches with company info
   - **JD Match** — Paste any job description for instant comparison
   - **Roadmap** — Step-by-step skill learning path
   - **Courses** — 78 curated course recommendations
   - **Resume Tips** — Priority-tagged improvement suggestions

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/upload` | Upload PDF → full career analysis |
| `POST` | `/api/match-jd` | JD text + resume skills → comparison |
| `POST` | `/api/chat` | Career guidance chatbot |

---

## 📊 Dataset

- **15 Job Roles** — Data Scientist, ML Engineer, DevOps, Cloud Architect, Cybersecurity, Mobile Dev, and more
- **8 Companies** — Google, Microsoft, Amazon, TCS, Infosys, Wipro, Zoho, Accenture
- **78 Skill Mappings** — Every skill linked to a real course (Coursera, Udemy, freeCodeCamp, etc.)
- **3 Experience Levels** — Beginner · Intermediate · Advanced
- **100% skill coverage** — Zero unmapped skills

---

## ✨ Key Highlights

- **⚡ Impact Prediction** — Tells you exactly which skills to learn to boost your score
- **🔥 Priority System** — Critical (core) vs secondary skill differentiation
- **📋 JD Matching** — Compare any job description against your resume in real-time
- **⏱️ Time Estimates** — Realistic learning timelines based on gap size
- **👥 Benchmarking** — Compare yourself against typical candidates for each role
- **🤖 No heavy ML** — Fast, rule-based intelligence with < 5s analysis time

---

## 📦 Backend Dependencies

```
fastapi
uvicorn[standard]
pdfplumber
PyPDF2
python-multipart
spacy          (optional — falls back to keyword matching)
```

Full list: [`backend/requirements.txt`](backend/requirements.txt)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ❤️ for hackathon · AI Skill-to-Employment Mapping Platform v3.0*
