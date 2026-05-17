# ServiceHive CRM

A full-stack CRM application built using the MERN Stack.

## Features

- User Authentication (JWT)
- Register & Login
- Protected Routes
- Role-Based Access Control
  - Admin
  - Sales User
- Create, Read, Update, Delete Leads
- Debounced Search
- Lead Filtering
- Pagination
- CSV Export
- Toast Notifications
- Responsive UI
- Docker Setup

---

# Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React CSV
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# Folder Structure

```bash
ServiceHive
├── frontend
├── backend
├── docker-compose.yml
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

# Installation

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Docker Setup

## Run Project Using Docker

```bash
docker compose up --build
```

---

# User Roles

## Admin
- Create Leads
- Update Leads
- Delete Leads
- Export CSV

## Sales User
- Create Leads
- View Leads

---

# Author

Sanjana Yadav
