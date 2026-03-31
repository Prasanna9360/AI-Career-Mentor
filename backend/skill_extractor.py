"""
skill_extractor.py
------------------
Extracts skills from resume text using:
1. spaCy NLP token matching (preferred)
2. Keyword-based regex fallback
"""

import re
from typing import List

# Master list of all trackable skills (lowercased)
MASTER_SKILLS = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "r", "scala", "go", "rust",
    "kotlin", "swift", "php", "ruby", "matlab",
    # Web
    "html", "css", "react", "angular", "vue", "nodejs", "node.js", "express", "django",
    "flask", "fastapi", "rest api", "graphql", "webpack", "responsive design", "web performance",
    # Data / ML / AI
    "machine learning", "deep learning", "nlp", "natural language processing", "computer vision",
    "tensorflow", "pytorch", "keras", "scikit-learn", "sklearn", "transformers", "hugging face",
    "openai", "llm", "generative ai", "reinforcement learning", "neural networks",
    # Data Engineering / Analysis
    "sql", "mysql", "postgresql", "mongodb", "redis", "elasticsearch", "spark", "hadoop",
    "pandas", "numpy", "matplotlib", "seaborn", "tableau", "power bi", "data visualization",
    "data analysis", "data engineering", "etl", "data warehousing", "statistics",
    # Cloud / DevOps
    "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "terraform", "ansible",
    "jenkins", "ci/cd", "devops", "linux", "bash", "git", "github", "gitlab",
    # Security
    "cybersecurity", "network security", "penetration testing", "cryptography", "siem",
    "incident response", "firewall", "vulnerability assessment",
    # Soft Skills / PM
    "agile", "scrum", "jira", "product strategy", "user research", "roadmapping",
    "stakeholder management", "wireframing", "a/b testing", "communication",
    # Cloud / Infra
    "mlops", "cloud computing", "microservices", "api design",
]


def extract_skills_spacy(text: str) -> List[str]:
    """Use spaCy to tokenize and match skills against master list."""
    try:
        import spacy
        # Load small English model (must be installed separately)
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(text.lower())
        tokens = set()

        # Single token matches
        for token in doc:
            tokens.add(token.text)

        # Bigram matches
        words = [token.text for token in doc]
        for i in range(len(words) - 1):
            tokens.add(f"{words[i]} {words[i+1]}")

        found = []
        text_lower = text.lower()
        for skill in MASTER_SKILLS:
            if skill in text_lower:
                found.append(skill)

        return list(set(found))
    except Exception as e:
        print(f"[spaCy] Not available, using fallback: {e}")
        return extract_skills_keyword(text)


def extract_skills_keyword(text: str) -> List[str]:
    """
    Keyword-based fallback skill extraction.
    Searches for each master skill as a word/phrase in the resume text.
    """
    text_lower = text.lower()
    found = []
    for skill in MASTER_SKILLS:
        # Use word boundary for single-word skills, substring for multi-word
        if " " in skill:
            if skill in text_lower:
                found.append(skill)
        else:
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, text_lower):
                found.append(skill)
    return list(set(found))


def extract_skills(text: str) -> List[str]:
    """
    Main entry point for skill extraction.
    Tries spaCy first, falls back to keyword matching.
    """
    if not text or not text.strip():
        return []
    skills = extract_skills_spacy(text)
    # Sort alphabetically for consistent output
    return sorted(skills)
