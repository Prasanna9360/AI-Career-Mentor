# 🤖 AI-Driven Skill-to-Employment Mapping Platform

> **Maps your resume skills to real-world job opportunities** — with weighted AI matching, career roadmaps, live JD comparison, interview prep, LinkedIn optimization, and a Groq-powered career copilot.

<div align="center">

![Platform](https://img.shields.io/badge/Platform-Web%20App-6366f1?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20v5-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python)
![AI](https://img.shields.io/badge/AI-Groq%20llama3-FF6B35?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)

🏆 **2nd Prize — HACKFEST (MOBIUS 2K26)** · Thiagarajar College of Engineering

</div>

---

## 📌 What This Project Does

Upload your resume PDF → The system automatically:

1. **Extracts your skills** using NLP (spaCy + keyword matching)
2. **Matches you to 15 job roles** at companies like Google, Amazon, TCS, Infosys
3. **Shows your readiness score** with weighted AI matching (Core skills = 70%, Other = 30%)
4. **Predicts career impact**: *"Learning SQL can boost your match from 54% → 63%"*
5. **Generates a step-by-step roadmap** to reach your best-fit role
6. **Compares your resume vs any job description** you paste
7. **Suggests curated courses** for every missing skill
8. **Runs AI interview prep** with role-specific questions
9. **Optimizes your LinkedIn profile** using Groq AI
10. **Answers career questions** via an AI chatbot (30+ topics)

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      USER BROWSER                        │
│           React 18 + Vite  (localhost:5173)              │
└───────────────────────┬──────────────────────────────────┘
                        │  PDF Upload / REST API calls
                        ▼
┌──────────────────────────────────────────────────────────┐
│                  FastAPI Backend v5                       │
│                  (localhost:8000)                         │
│                                                          │
│  POST /api/upload        → Full resume analysis          │
│  POST /api/match-jd      → JD vs Resume comparison       │
│  POST /api/ai-chat       → Groq LLM career copilot       │
│  POST /api/interview     → Interview question generator   │
│  POST /api/linkedin      → LinkedIn profile optimizer     │
│  GET  /api/health        → Health check                  │
└──────┬───────────────────────┬───────────────────────────┘
       │                       │
 ┌─────▼─────┐          ┌──────▼──────┐
 │  Resume   │          │  JD Text    │
 │  Parser   │          │  Parser     │
 │(pdfplumber│          │(skill_ext.) │
 └─────┬─────┘          └──────┬──────┘
       └──────────┬────────────┘
                  ▼
   ┌──────────────────────────────┐
   │      Skill Extractor         │
   │  spaCy NLP + Keyword fallback│
   └──────────────┬───────────────┘
                  ▼
   ┌──────────────────────────────┐
   │    Weighted Job Matcher      │
   │  Core Skills   → 70% weight  │
   │  Other Skills  → 30% weight  │
   │  score = 0.7×core + 0.3×other│
   └──────────────┬───────────────┘
                  ▼
   ┌──────────────────────────────┐
   │      Insights Engine         │
   │  • Impact prediction         │
   │  • Career roadmap builder    │
   │  • Resume audit & scoring    │
   │  • Time-to-hire estimates    │
   └──────────────┬───────────────┘
                  ▼
   ┌──────────────────────────────┐
   │    Groq LLM (llama3-8b)      │
   │  • AI Career Copilot         │
   │  • Interview Q generator     │
   │  • LinkedIn optimizer        │
   └──────────────────────────────┘
```

---

## ✨ Full Feature List

| Feature | Description | Powered By |
|---|---|---|
| 📄 **PDF Resume Parsing** | Extracts text from any PDF resume | pdfplumber + pypdf |
| 🧠 **NLP Skill Extraction** | Identifies 100+ tech skills automatically | spaCy + keyword matching |
| 🏢 **Company-Aligned Job Matching** | 15 roles at 8 real companies | Custom dataset |
| ⚖️ **Weighted Scoring** | Core skills = 70%, Other = 30% | Custom algorithm |
| ⚡ **Impact Prediction** | *"Learning SQL raises match 54% → 63%"* | Insights Engine |
| 🔥 **Critical Skill Split** | 🔥 Must-learn vs ⚪ Secondary skills | jobs.json core_skills |
| 📚 **One-Click Course Links** | Every missing skill → direct course URL | courses.json (78 mappings) |
| 🗺️ **Career Roadmap** | Step-by-step path to your best-fit role | Insights Engine |
| 📋 **JD Matcher** | Paste any LinkedIn/Naukri JD → gap report | skill_extractor.py |
| 📊 **Resume Audit Score** | Scores your resume on 8 quality dimensions | resume_scorer.py |
| 👥 **Candidate Benchmarking** | *"Top candidates have 9–11 skills. You have 5."* | Job dataset |
| 🎤 **Interview Prep** | 10 Q&A per role + AI-generated custom questions | Groq llama3 |
| 💼 **LinkedIn Optimizer** | AI rewrites your summary and headline | Groq llama3 |
| 🤖 **AI Career Copilot** | Context-aware career guidance chatbot | Groq llama3 |
| ⏱️ **Time Estimates** | *"~2 months of structured learning needed"* | Gap-based formula |

---

## 🧠 How the Matching Algorithm Works

We use **weighted matching based on core competencies** — not a simple skill count:

```python
# Core skills (from jobs.json) carry 70% of the score
# Other required skills carry 30%

core_score  = len(core_skills_matched)  / len(total_core_skills)
other_score = len(other_skills_matched) / len(total_other_skills)

weighted_match = (0.70 × core_score + 0.30 × other_score) × 100
```

**Why this matters:** A candidate who knows Python + ML (core skills for Data Scientist) ranks higher than someone who only knows secondary tools — this mirrors **real hiring priorities**.

---

## 📁 Project Structure

```
AI-Career-Mentor/
│
├── backend/                        # Python FastAPI backend
│   ├── data/
│   │   ├── jobs.json               # 15 job roles · company · core_skills · roadmap
│   │   └── courses.json            # 78 skill → course URL mappings
│   ├── main.py                     # FastAPI app — all API routes
│   ├── job_matcher.py              # Weighted matching engine (70/30 core split)
│   ├── insights_engine.py          # Impact prediction · roadmap · suggestions
│   ├── resume_parser.py            # PDF text extraction (pdfplumber + pypdf)
│   ├── resume_scorer.py            # 8-dimension resume quality audit
│   ├── skill_extractor.py          # NLP skill extraction (spaCy + keyword)
│   ├── ai_chat.py                  # Groq LLM career copilot
│   ├── interview_prep.py           # Interview Q&A bank + AI question generator
│   ├── linkedin_optimizer.py       # LinkedIn profile AI optimizer
│   └── requirements.txt
│
├── auth-server/                    # Node.js JWT + Google OAuth microservice
│   ├── routes/auth.js              # /signup · /login · /google (rate limited)
│   ├── controllers/authController.js
│   ├── models/User.js
│   └── server.js
│
├── src/                            # React 18 + Vite frontend
│   ├── components/
│   │   ├── Dashboard.jsx           # 6-tab main dashboard
│   │   ├── CopilotPanel.jsx        # AI Career Copilot (Groq-powered)
│   │   ├── JobMatchCard.jsx        # Company card + readiness labels
│   │   ├── MissingSkills.jsx       # 🔥/⚪ skill split + Learn buttons
│   │   ├── JDMatcher.jsx           # Job description comparison
│   │   ├── CareerRoadmap.jsx       # Step-by-step roadmap
│   │   ├── InterviewPrep.jsx       # Interview Q&A + AI questions
│   │   ├── LinkedInOptimizer.jsx   # LinkedIn AI optimizer
│   │   ├── ATSAnalyzer.jsx         # ATS resume scoring
│   │   ├── CoursesPanel.jsx        # Curated course recommendations
│   │   ├── InsightsPanel.jsx       # AI-generated career insights
│   │   ├── SalaryInsights.jsx      # Salary range benchmarks
│   │   └── ChatBot.jsx             # Fallback chatbot
│   ├── context/CopilotContext.jsx  # Global copilot state
│   ├── utils/api.js                # API helper functions
│   └── index.css                  # Dark glassmorphism design system
│
├── docs/screenshots/               # UI screenshots
├── .env.example                    # Environment variable template
├── SETUP.md                        # Quick-start terminal commands
├── index.html
├── vite.config.js
└── README.md
```

---

## 📊 Dataset

| Resource | Count | Details |
|---|---|---|
| Job Roles | **15** | Data Scientist, ML Engineer, DevOps, Full Stack, Cloud Architect, and more |
| Companies | **8** | Google, Amazon, Microsoft, TCS, Infosys, Wipro, Zoho, Accenture |
| Skill-Course Mappings | **78** | Every skill has a direct course link (Coursera, Udemy, YouTube) |
| Experience Levels | **3** | Beginner · Intermediate · Advanced |
| Core Skills Coverage | **100%** | Every role has weighted core + other skill split |
| MCQ Bank | **500+** | Role-specific multiple choice interview questions |

---

## 🚀 Quick Start

### Prerequisites
- **Python** 3.10, 3.11, or 3.12 *(3.13 has SpaCy compatibility issues — use 3.12)*
- **Node.js** 18+
- **MongoDB** (for auth — optional if skipping login)
- **Groq API Key** — free at [console.groq.com](https://console.groq.com)

---

### Step 1 · Clone & Configure

```bash
git clone https://github.com/Prasannaganesann/AI-Career-Mentor.git
cd AI-Career-Mentor

# Create your environment file
copy .env.example .env
```

Open `.env` and fill in:
```env
GROQ_API_KEY=your_groq_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_API_URL=http://localhost:8000
```

---

### Step 2 · Backend (Terminal 1)

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm

uvicorn main:app --reload --port 8000
```

✅ Backend live at: http://localhost:8000  
✅ Interactive API docs: http://localhost:8000/docs

---

### Step 3 · Auth Server — optional (Terminal 2)

> Skip this if you don't need Google login.

```bash
cd auth-server
npm install
npm run dev
```

✅ Auth server live at: http://localhost:3001

---

### Step 4 · Frontend (Terminal 3)

```bash
# Back in project root
npm install
npm run dev
```

✅ App live at: **http://localhost:5173** 🎉

---

## 🌐 API Reference

| Method | Endpoint | Input | Output |
|---|---|---|---|
| `GET` | `/api/health` | — | Status check |
| `POST` | `/api/upload` | PDF file | Full career analysis JSON |
| `POST` | `/api/match-jd` | `{skills, jd_text}` | JD gap report |
| `POST` | `/api/ai-chat` | `{message, context, history}` | AI response |
| `POST` | `/api/interview` | `{role, skills}` | Interview Q&A |
| `POST` | `/api/linkedin` | `{url, skills, role}` | Optimized profile text |

Full interactive docs with request/response schemas: **http://localhost:8000/docs**

### Sample API Call

```bash
# Upload a resume
curl -X POST http://localhost:8000/api/upload \
  -F "file=@resume.pdf"
```

```json
{
  "extracted_skills": ["Python", "SQL", "Machine Learning"],
  "career_readiness_score": 72,
  "best_fit_job": "Data Scientist at Infosys",
  "best_fit_job_score": 72,
  "top_3_matches": [
    { "title": "Data Scientist", "company": "Infosys", "match_percentage": 72 },
    { "title": "ML Engineer",   "company": "TCS",     "match_percentage": 58 },
    { "title": "Data Analyst",  "company": "Wipro",   "match_percentage": 51 }
  ],
  "missing_critical_skills": ["Deep Learning", "TensorFlow"],
  "impact_prediction": "Learning Deep Learning can increase your match from 72% → 85%"
}
```

---

## ☁️ Deployment

### Backend → [Render](https://render.com) *(Free tier)*

1. Go to **render.com** → New → **Web Service**
2. Connect this GitHub repo
3. Set **Root Directory:** `backend`
4. Set **Build command:** `pip install -r requirements.txt`
5. Set **Start command:** `uvicorn main:app --host 0.0.0.0 --port 8000`
6. Add environment variable: `GROQ_API_KEY = your_key`
7. Deploy → copy the URL (e.g. `https://ai-career-mentor.onrender.com`)

### Frontend → [Vercel](https://vercel.com) *(Free tier)*

1. Go to **vercel.com** → New Project → import this repo
2. Set **Root Directory** to `/`
3. Add environment variable: `VITE_API_URL = https://ai-career-mentor.onrender.com`
4. Deploy → live at `https://ai-career-mentor.vercel.app`

---

## 🔐 Security

- ✅ All API keys stored in `.env` (never committed)
- ✅ Rate limiting on all auth endpoints (10 req / 15 min per IP)
- ✅ No `dangerouslySetInnerHTML` — XSS-safe markdown renderer
- ✅ GROQ_API_KEY read via `os.getenv()` in Python, `import.meta.env` in JS
- ✅ `.gitignore` excludes `.env`, `node_modules`, `__pycache__`, `.venv`

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🏆 Achievement

> 🥈 **2nd Prize — HACKFEST (MOBIUS 2K26)**  
> Organized by Thiagarajar College of Engineering  
> *AI-Powered Skill-to-Employment Mapping Platform*

---

<div align="center">

Built with ❤️ by [Prasanna Ganesan](https://github.com/Prasannaganesann)  
*AI Skill-to-Employment Mapping Platform · v5.0.0*

</div>
