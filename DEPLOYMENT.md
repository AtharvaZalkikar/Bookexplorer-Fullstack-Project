# BookExplorer – Deployment Guide

This document explains how the **BookExplorer** full‑stack application was deployed to production.

---

## Architecture Overview

* **Backend**: Django + Django REST Framework
* **Frontend**: React (Create React App) + Tailwind CSS (via CDN)
* **Database**: PostgreSQL (Render managed database)
* **Backend Hosting**: Render
* **Frontend Hosting**: Netlify

Frontend and backend are deployed **independently** and communicate over HTTPS using REST APIs.

---

## Backend Deployment (Render)

### 1. Repository Structure

Backend root directory:

```
bookexplorer/
  ├── manage.py
  ├── bookexplorer/
  ├── apps/
  ├── requirements.txt
```

Render service root is set to the **bookexplorer/** directory.

---

### 2. Build Command (Render)

```bash
pip install -r requirements.txt && \
python manage.py migrate && \
python manage.py createsuperuser --noinput || true && \
python manage.py collectstatic --noinput
```

**Explanation**:

* `pip install` → install dependencies
* `migrate` → ensure DB schema is up‑to‑date
* `createsuperuser` → runs once safely (ignored if exists)
* `collectstatic` → prepares static files for admin

---

### 3. Environment Variables (Render)

```env
SECRET_KEY=********
DEBUG=False
DATABASE_URL=********
ALLOWED_HOSTS=bookexplorer-backend-c8mr.onrender.com
CORS_ALLOWED_ORIGINS=https://bookexplorerz.netlify.app
```

CORS is locked to the production frontend domain.

---

### 4. CORS Configuration (Django)

```python
CORS_ALLOWED_ORIGINS = [
    origin for origin in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:3000"
    ).split(",")
    if origin
]

CORS_ALLOW_CREDENTIALS = True
```

This enables secure cross‑origin requests from the frontend.

---

## Frontend Deployment (Netlify)

### 1. Frontend Directory

```
bookexplorer-frontend/
  ├── src/
  ├── public/
  ├── package.json
```

Netlify **Base directory**:

```
bookexplorer-frontend
```

---

### 2. Build Settings (Netlify)

* **Build command**:

  ```bash
  npm run build
  ```

* **Publish directory**:

  ```
  bookexplorer-frontend/build
  ```

---

### 3. API Configuration (Frontend)

`src/api.js`

```javascript
const api = axios.create({
  baseURL: 'https://bookexplorer-backend-c8mr.onrender.com',
});
```

All API endpoints are relative to this base URL.

---

### 4. SPA Routing Fix (Netlify)

A `_redirects` file is used to support React Router:

```
/*    /index.html   200
```

This prevents "Page Not Found" errors on refresh or deep links.

---

## Common Issues & Fixes

### ❌ CORS Errors

**Cause**: Frontend domain not allowed by backend

**Fix**:

* Add Netlify domain to `CORS_ALLOWED_ORIGINS`
* Redeploy backend

---

### ❌ Login works locally but fails in production

**Cause**: Token/CORS misconfiguration

**Fix**:

* Ensure backend uses HTTPS
* Ensure frontend baseURL points to production backend

---

### ❌ React routes return 404 on refresh

**Fix**:

* Add Netlify `_redirects` file

---

## Final Result

* Backend API fully functional on Render
* Frontend served via Netlify
* Secure CORS‑enabled communication
* Authentication, search, and save flows working in production

🎉 **BookExplorer is fully deployed as a production‑ready full‑stack application.**
