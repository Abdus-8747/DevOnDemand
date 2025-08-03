# API Testing Guide

This document explains how to manually test every available route in the Student Project Service backend.  Example cURL requests are provided with **dummy values** so you can copy-paste directly into the terminal or Postman.

> Base URL (local development): `http://localhost:5000`
>
> All request/response bodies are JSON unless otherwise noted.

---

## 1. Health-Check

| Method | Endpoint |
| ------ | -------- |
| GET | `/api/health` |

```bash
curl -X GET http://localhost:5000/api/health
```

Expected **200 OK** response:
```json
{
  "success": true,
  "message": "Student Project Service API is running!",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## 2. User Routes

### 2.1 Submit User Form

| Method | Endpoint | Rate-limit |
| ------ | -------- | ---------- |
| POST | `/api/user/submit` | 3 requests / 15 min |

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+15551234567",
  "projectIdea": "AI-powered note-taking app",     // optional
  "budget": 5000,                                  
  "isStudent": true,
  "collegeName": "ABC Institute of Technology"     // required only when isStudent=true
}
```

**cURL**
```bash
curl -X POST http://localhost:5000/api/user/submit \
  -H "Content-Type: application/json" \
  -d '{
        "name":"John Doe",
        "email":"john.doe@example.com",
        "phoneNumber":"+15551234567",
        "projectIdea":"AI-powered note-taking app",
        "budget":5000,
        "isStudent":true,
        "collegeName":"ABC Institute of Technology"
      }'
```

Successful **200 OK** response returns masked email and expiry time.

### 2.2 Verify OTP

| Method | Endpoint | Rate-limit |
| ------ | -------- | ---------- |
| POST | `/api/user/verify-otp` | 5 requests / 15 min |

**Request Body**
```json
{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

**cURL**
```bash
curl -X POST http://localhost:5000/api/user/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","otp":"123456"}'
```

On success you’ll receive **201 Created** with a `submissionId`, `submittedAt`, and `nextSubmissionAllowed` timestamp.

### 2.3 Resend OTP

| Method | Endpoint | Rate-limit |
| ------ | -------- | ---------- |
| POST | `/api/user/resend-otp` | 2 requests / 5 min |

**Request Body**
```json
{
  "email": "john.doe@example.com"
}
```

**cURL**
```bash
curl -X POST http://localhost:5000/api/user/resend-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com"}'
```

Success returns **200 OK** along with masked email and expiry time.

---

## 3. Admin Routes

> These routes are intended for administrative use.  Add authentication if required.

### 3.1 Get All Submissions

| Method | Endpoint |
| ------ | -------- |
| GET | `/api/admin/submissions` |

**cURL**
```bash
curl -X GET http://localhost:5000/api/admin/submissions
```

Returns an array of user submission objects.

### 3.2 Mark Request as Completed

| Method | Endpoint | Path param |
| ------ | -------- | ---------- |
| PUT | `/api/admin/requests/:userId/complete` | `userId` – submission id |

**cURL**
```bash
curl -X PUT http://localhost:5000/api/admin/requests/<submissionId>/complete
```
On success returns **200 OK** with success message.

### 3.3 Get Pending Requests

| Method | Endpoint |
| ------ | -------- |
| GET | `/api/admin/requests/pending` |

**cURL**
```bash
curl -X GET http://localhost:5000/api/admin/requests/pending
```
Returns an array `requests` of submissions still pending verification/completion.

### 3.4 Get Completed Requests

| Method | Endpoint |
| ------ | -------- |
| GET | `/api/admin/requests/completed` |

**cURL**
```bash
curl -X GET http://localhost:5000/api/admin/requests/completed
```
Returns an array `requests` of completed submissions including `completedAt` timestamp.

---

## 4. Common Error Codes

| Status | Description |
| ------ | ----------- |
| 400 | Validation failure or wrong OTP |
| 404 | Route not found / pending verification missing |
| 429 | Rate-limit exceeded / duplicate submission within 12 hours |
| 500 | Internal server error |

---

## 5. Tips

1. When using Postman, create a **Collection** and add the above requests; duplicate and edit the body as needed.
2. The rate-limits are enforced by IP – wait for the window to reset or change the port/IP while testing frequently.
3. Environment variables required in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://...
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=test@example.com
   EMAIL_PASS=********
   FRONTEND_URL=http://localhost:5173
   ```
4. For setting up the **EMAIL_USER** go to `https://myaccount.google.com/security` and setup 2-Factor authentication.
5. For setting up the **EMAIL_PASS** go to `https://myaccount.google.com/apppasswords`,create a new app and generate an App Password.
6. Remember the 12-hour restriction: a single `email`/`phoneNumber` cannot submit again until the cool-down passes.

---

Happy testing! 🎉
