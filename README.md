# AI Dashboard Data

This repository contains a React frontend and a FastAPI backend for an AI dashboard.

## Local development

### Backend
1. Open a terminal in `backend`
2. Activate the venv:
   - Windows: `backend\venv\Scripts\activate`
3. Install dependencies if needed:
   - `python -m pip install -r requirements.txt`
4. Copy `backend/.env.example` to `.env` and update values if needed.
5. Start the backend:
   - `python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000`

### Frontend
1. Open a terminal in `frontend`
2. Install node dependencies:
   - `npm install`
3. Copy `frontend/.env.example` to `.env` and update `VITE_API_BASE_URL` if needed.
4. Start the frontend:
   - `npm run dev`
5. Open `http://localhost:5173`

## Vercel deployment

The frontend can be deployed directly to Vercel.

1. Connect your GitHub repository to Vercel.
2. Set the project root to `frontend`.
3. Configure the build command:
   - `npm run build`
4. Configure the output directory:
   - `dist`
5. Add an environment variable in Vercel:
   - `VITE_API_BASE_URL`: URL of your deployed backend API

> Note: This repo currently contains a FastAPI backend. Vercel can deploy the frontend to a static site, but the backend should be hosted separately on a Python-capable provider (for example Railway, Render, or a VPS).

## GitHub Actions CI

A workflow is included to validate frontend build and backend syntax on push and pull request.

## Deployment summary

- `frontend`: deploy this to Vercel
- `backend`: host separately on a Python server or service
- `frontend` will call the backend using `VITE_API_BASE_URL`
