# MediConnect – Patient Lab Test Portal

MediConnect is a full-stack web application for a digital health clinic. It allows patients to register, browse available lab tests, book them, and securely download their reports.

## Features

- Patient Registration & Authentication (JWT)
- View Lab Test Catalog (fetched from backend)
- Book Lab Tests (linked to patient)
- View Bookings & Download Test Reports (dummy PDF)
- Input Validation & Error Handling
- Secure Access via JWT

## Tech Stack

| Layer       | Tech                          |
|------------|-------------------------------|
| Frontend   | React, Axios, React Router     |
| Backend    | Node.js, Express, JWT          |
| Database   | MongoDB with Mongoose          |
| Deployment | Vercel (Frontend & Backend)    |

## Project Structure

```
MediConnect/
├── client/                 # React frontend
└── server/                 # Express backend
```

## Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Backend (server)

```bash
cd server
npm install
# Add .env with MONGO_URI and PORT
npm start
```

### Frontend (client)

```bash
cd client
npm install
npm start
```

## API Endpoints

### Auth

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| POST   | /api/patients/register | Register new patient   |
| POST   | /api/patients/login    | Login and return JWT   |

### Tests

| Method | Endpoint      | Description             |
|--------|---------------|-------------------------|
| GET    | /api/tests    | Get all lab tests       |

### Bookings

| Method | Endpoint                       | Description                      |
|--------|--------------------------------|----------------------------------|
| POST   | /api/bookings                  | Book a test (requires JWT)       |
| GET    | /api/bookings/:patientId       | Get all bookings by patient ID   |
| GET    | /api/bookings/:id/report       | Download dummy report (PDF)      |

## Security Notes

- All booking/report endpoints are protected using JWT
- Direct report access is restricted and verified on backend

## Future Improvements

- Email report delivery
- Admin dashboard
- Payment integration
- Role-based access control

## Author

Shubh Nawani  
B.Tech Kalvium @ LPU | Full Stack Developer

## Live Links

- Frontend (Vercel): [https://mediconnect.vercel.app](#)
- Backend API (Render): [https://mediconnect-api.onrender.com](#)
