# Auth Backend (Node.js + Express + MongoDB)

Standalone backend for `signup` and `login` only.

## Setup

1. Go to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example` and fill values.
4. Run in dev mode:
   ```bash
   npm run dev
   ```

## Endpoints

- `POST /api/auth/signup`
  - body: `{ "name": "Your Name", "email": "you@example.com", "password": "123456" }`
- `POST /api/auth/login`
  - body: `{ "email": "you@example.com", "password": "123456" }`
- `GET /api/health`

## Notes

- Passwords are hashed with `bcryptjs`.
- JWT token is returned on successful signup/login.
- Frontend and backend are fully separated.
