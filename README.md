# 📚 BookExplorer — Full Stack Book Discovery App

**BookExplorer** is a fully deployed, production-ready **full‑stack web application** built with **Django REST Framework (backend)** and **React (frontend)**. It allows users to search for books using the Open Library API, save favorites, and manage their personal collection.

🌐 **Live App:** [https://bookexplorerz.netlify.app](https://bookexplorerz.netlify.app)
⚙️ **Backend API:** [https://bookexplorer-backend-c8mr.onrender.com](https://bookexplorer-backend-c8mr.onrender.com)

---

## 🚀 Features

* 🔍 Search books by title using Open Library’s public API
* 📚 View book details (title, author, cover, publish date, description)
* ❤️ Save books to your collection
* 🔐 Authentication system (login / logout)
* 👤 User-specific book collections (users only see their own saved books)  
* 🛡️ Role-based permissions (admin can manage all data)
* 🛡  Admin-only delete permissions
* 📑 Pagination, filtering, searching, and ordering
* 🌍 Fully deployed (Render + Netlify)

---

## 🛠 Tech Stack

### Backend

* Python 3.13
* Django 5.2
* Django REST Framework
* PostgreSQL (production) / SQLite (development)
* Token Authentication

### Frontend

* React (Create React App)
* React Router
* Axios
* Tailwind CSS (via CDN for now)

### Deployment

* Backend: **Render**
* Frontend: **Netlify**

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/AtharvaZalkikar/Bookexplorer-Fullstack-Project.git
cd Bookexplorer-Fullstack-Project
```

---

### 2. Backend setup

```bash
cd bookexplorer-backend
python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3. Frontend setup

```bash
cd bookexplorer-frontend
npm install
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication & Permissions

🔐 Authentication & Permissions

* Anonymous users can search and fetch books from Open Library  
* Logged-in users can:
  * Save books
  * View only their own saved books
* Admin users can:
  * View and manage all users’ books
  * Delete any book entry  

This ensures proper user data isolation and role-based access control.


---

## 🔗 API Endpoints

| Endpoint                      | Method | Description                    | Auth    |
| ----------------------------- | ------ | ------------------------------ | ------- |
| `/api/search-open/?title=...` | GET    | Search books from Open Library | ❌       |
| `/api/save-from-search/`      | POST   | Save book to database          | ✅       |
| `/api/books/`                 | GET    | List user’s own saved books    | ✅       |
| `/api/books/<id>/`            | DELETE | Delete a book                  | ✅ Admin |

* # Note: ⚠️ Admin users can view all books, while regular users only see their own entries.

---

## 📌 Filtering, Search, and Ordering

You can use these query params on `/api/books/`:

* `?search=tolkien`
* `?ordering=title`
* `?ordering=-published_date`

---

## 📦 Deployment

This project is fully deployed with:

* Backend → Render
* Frontend → Netlify
* Environment variables
* Production database
* CORS configured
* Static files handled

📄 See **DEPLOYMENT.md** for full deployment steps.

---

## 👨‍💻 Author

**Atharva Zalkikar**
GitHub: [https://github.com/AtharvaZalkikar](https://github.com/AtharvaZalkikar)

---

## 📍 Roadmap

* ✅ Backend APIs
* ✅ Frontend React integration
* ✅ Full deployment (Render + Netlify)
* ✅ UI polish

* ✅ React + Tailwind frontend completed  
* ✅ Full-stack deployment (Render + Netlify) completed  
* Future: testing, CI/CD, performance optimizations


---

> This project represents my first complete end‑to‑end full‑stack deployment — from local development to live production.

> Please Visit the BookExplorer WebApp via below LINK:

🌐 **Live App:** [https://bookexplorerz.netlify.app](https://bookexplorerz.netlify.app)
⚙️ **Backend API:** [https://bookexplorer-backend-c8mr.onrender.com](https://bookexplorer-backend-c8mr.onrender.com)

Thank You.
