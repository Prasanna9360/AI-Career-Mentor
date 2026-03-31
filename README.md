# 🤖 AI-Driven Skill-to-Employment Mapping Platform

> Maps student skills to real-world job opportunities — with weighted AI matching, career roadmaps, JD comparison, and instant course recommendations.

![Platform](https://img.shields.io/badge/Platform-Web%20App-6366f1?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📸 Screenshots
👉 “AI-Driven Skill-to-Employment Mapping Platform”
<img width="635" height="858" alt="Screenshot 2026-03-31 163024" src="https://github.com/user-attachments/assets/7cd7e7a3-918c-414d-a559-4835edb07d14" />
👉 “AI Career Dashboard: Your Path to Job Readiness”
<img width="1906" height="908" alt="Screenshot 2026-03-31 163152" src="https://github.com/user-attachments/assets/a766deb7-e6f4-4336-8721-3229e14858f9" />
👉 “Skill-to-Employment Mapping: Discover Your Best-Fit Career Paths”
<img width="1905" height="904" alt="Screenshot 2026-03-31 163215" src="https://github.com/user-attachments/assets/ded3854c-4ff1-4998-b81c-b19c1776175f" />
👉 “Job Description Matcher: Compare Your Resume with Real Job Requirements”
<img width="1902" height="900" alt="Screenshot 2026-03-31 163228" src="https://github.com/user-attachments/assets/3034a388-b5fc-4f39-8dc7-e1bfc7fa7b2c" />
👉 “AI Career Roadmap: Your Step-by-Step Path to Job Readiness”
<img width="1897" height="912" alt="Screenshot 2026-03-31 163257" src="https://github.com/user-attachments/assets/15508b4c-e141-4ade-a1d7-23a46320ef2d" />
👉 “Recommended Courses: AI-Curated Learning Paths for Your Career”
<img width="1886" height="900" alt="Screenshot 2026-03-31 163325" src="https://github.com/user-attachments/assets/0be711d0-f151-491b-b10f-b7767c101ae9" />
👉 “Resume Improvement Tips: AI-Powered Suggestions to Strengthen Your Profile”
<img width="1885" height="899" alt="Screenshot 2026-03-31 163344" src="https://github.com/user-attachments/assets/8d7b02f8-7757-40ad-93a5-ee8ec074f905" />

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│              React + Vite  (localhost:5173)                  │
└────────────────────────┬────────────────────────────────────┘
                         │  PDF Upload / API calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend                           │
│                   (localhost:8000)                           │
│                                                             │
│  POST /api/upload     POST /api/match-jd    POST /api/chat  │
└──────────┬──────────────────┬───────────────────────────────┘
           │                  │
     ┌─────▼─────┐     ┌──────▼──────┐
     │  Resume   │     │  JD Text    │
     │  Parser   │     │  Parser     │
     │(pdfplumber│     │(skill_ext.) │
     └─────┬─────┘     └──────┬──────┘
           │                  │
     ┌─────▼──────────────────▼──────┐
     │       Skill Extractor         │
     │  (spaCy NLP + keyword fallback│
     └────────────────┬──────────────┘
                      │
     ┌────────────────▼──────────────┐
     │      Weighted Job Matcher     │
     │  Core Skills   → 70% weight  │
     │  Other Skills  → 30% weight  │
     │  score = 0.7×core + 0.3×other│
     └──────────┬────────────────────┘
                │
     ┌──────────▼────────────────────┐
     │       Insights Engine         │
     │  • Impact prediction          │
     │  • Career roadmap builder     │
     │  • Resume suggestions         │
     │  • Time estimates             │
     └──────────┬────────────────────┘
                │
     ┌──────────▼────────────────────┐
     │         Datasets              │
     │  jobs.json    (15 roles)      │
     │  courses.json (78 mappings)   │
     └──────────┬────────────────────┘
                │  JSON Response
                ▼
┌─────────────────────────────────────────────────────────────┐
│                   React Dashboard UI                         │
│  Overview │ Skill-to-Employment │ JD Match │ Roadmap │ ...  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📄 **Resume Parsing** | Extracts text from PDF using pdfplumber |
| 🧠 **NLP Skill Extraction** | spaCy + keyword fallback — no API key needed |
| 🏢 **Company-Aligned Matching** | 15 roles at Google, Amazon, Microsoft, TCS, Infosys, Wipro, Zoho, Accenture |
| ⚖️ **Weighted Scoring** | Core skills = 70% weight · Other skills = 30% → *"based on core competencies"* |
| ⚡ **Impact Prediction** | *"Learning SQL can increase your match from 54% → 63%"* |
| 🔥 **Critical Skill Split** | Must-learn-first (🔥 Critical) vs secondary (⚪ Other) skills |
| 📚 **One-Click Courses** | Every missing skill links directly to a course |
| 🗺️ **Career Roadmap** | Step-by-step skill path for your best-fit role |
| 📋 **JD Matcher** | Paste any LinkedIn/Naukri JD → instant resume vs JD comparison |
| ⏱️ **Time Estimates** | *"~2 months of structured learning"* based on gap size |
| 👥 **Candidate Benchmarking** | *"Top candidates have 9–11 skills. You have 5."* |
| 🤖 **AI Chatbot** | Career guidance bot (30+ topic responses) |

---

## 🧠 Matching Algorithm

We use **weighted matching based on core competencies** — not just a simple skill count:

```python
# Core skills (from jobs.json) carry 70% of the score
# Other required skills carry 30%

core_score  = core_skills_matched  / total_core_skills
other_score = other_skills_matched / total_other_skills

weighted_match = (0.70 × core_score + 0.30 × other_score) × 100
```

**Why this matters:** A candidate who knows Python + ML (core skills for Data Scientist) ranks higher than someone who knows only secondary tools — matching real hiring priorities.

---

## 📁 Project Structure

```
AI-Career-Mentor/
├── backend/
│   ├── data/
│   │   ├── jobs.json          # 15 job roles · company · core_skills · roadmap
│   │   └── courses.json       # 78 skill → course mappings with URLs
│   ├── main.py                # FastAPI app — /upload · /match-jd · /chat
│   ├── job_matcher.py         # Weighted matching engine (70/30 core split)
│   ├── insights_engine.py     # Impact prediction · roadmap · suggestions
│   ├── resume_parser.py       # PDF text extraction (pdfplumber + PyPDF2)
│   ├── skill_extractor.py     # NLP skill extraction
│   └── requirements.txt
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # 6-tab main dashboard
│   │   ├── JobMatchCard.jsx    # Company card with readiness labels
│   │   ├── MissingSkills.jsx   # 🔥/⚪ skill split + Learn buttons
│   │   ├── JDMatcher.jsx       # Job description comparison
│   │   ├── CareerRoadmap.jsx   # Step-by-step roadmap
│   │   ├── InsightsPanel.jsx   # AI-generated insights
│   │   ├── ReadinessScore.jsx  # Circular gauge + score
│   │   ├── ResumeSuggestions.jsx
│   │   ├── CoursesPanel.jsx
│   │   └── ChatBot.jsx
│   ├── utils/api.js            # uploadResume · matchJD · chat helpers
│   └── index.css              # Glassmorphism dark design system
│
├── docs/screenshots/          # UI screenshots
├── index.html
├── vite.config.js
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ · **Python** 3.10+

### 1 · Clone

```bash
git clone https://github.com/Prasanna9360/AI-Career-Mentor.git
cd AI-Career-Mentor
```

### 2 · Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt

# Optional — better NLP (recommended)
python -m spacy download en_core_web_sm

uvicorn main:app --reload --port 8000
```

### 3 · Frontend *(new terminal)*

```bash
npm install
npm run dev
```

Open **http://localhost:5173** 🎉

---

## 🌐 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/upload` | PDF resume → full career analysis |
| `POST` | `/api/match-jd` | JD text + skills → comparison report |
| `POST` | `/api/chat` | Career chatbot response |

Full interactive docs: **http://localhost:8000/docs**

---

## 📊 Dataset

| | Count |
|---|---|
| Job roles | **15** |
| Companies | **8** (Google, Amazon, Microsoft, TCS, Infosys, Wipro, Zoho, Accenture) |
| Skill-course mappings | **78** |
| Experience levels | Beginner · Intermediate · Advanced |
| Skill coverage | **100%** — every skill has a course |

---

## ☁️ Deployment

### Backend → [Render](https://render.com) *(Free)*

1. Push this repo to GitHub ✅ (already done)
2. Go to **render.com** → New → **Web Service**
3. Connect your GitHub repo → select `backend/` as root
4. Set:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port 8000`
5. Deploy → copy the URL (e.g. `https://ai-career-mentor.onrender.com`)

### Frontend → [Vercel](https://vercel.com) *(Free)*

1. Go to **vercel.com** → New Project → import this repo
2. Set **Root Directory** to `/` (project root)
3. Add environment variable:
   ```
   VITE_API_URL = https://ai-career-mentor.onrender.com
   ```
4. Deploy → your app is live at `https://ai-career-mentor.vercel.app`

---

## 🤝 Contributing

Pull requests welcome! Open an issue first for major changes.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ❤️ for hackathon · AI Skill-to-Employment Mapping Platform v3.0*
