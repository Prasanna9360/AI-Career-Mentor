/**
 * api.js
 * ------
 * API helper functions for communicating with the FastAPI backend.
 * The Vite dev server proxies /api/* → http://localhost:8000
 */

const API_BASE = '/api';

/**
 * Upload a PDF resume file and receive full career analysis.
 * @param {File} file - The PDF file object from an <input> or drop event
 * @returns {Promise<Object>} - Analysis result from backend
 */
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

/**
 * Send a message to the career chatbot.
 * @param {string} message - User's chat message
 * @returns {Promise<string>} - Bot response text
 */
export async function sendChatMessage(message) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Chat error: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

/**
 * Health check — ping the backend to verify it's running.
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Match a pasted job description against the user's extracted resume skills.
 * @param {string} jdText       - Raw job description text
 * @param {string[]} resumeSkills - Already-extracted skills from the resume
 * @returns {Promise<Object>}   - JD match result: match%, missing skills, courses, suggestions
 */
export async function matchJD(jdText, resumeSkills) {
  const response = await fetch(`${API_BASE}/match-jd`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jd_text: jdText, resume_skills: resumeSkills }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

