# ArogyaAlert API Documentation

## Base URL

```
http://localhost:5000
```

---

# Authentication

## Login

### POST /api/users/login

Request:

```json
{
  "email": "doctor@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": 5,
    "name": "Test Doctor",
    "email": "doctor@test.com",
    "role": "doctor"
  }
}
```

---

# Dashboard APIs

## GET /api/dashboard

Response:

```json
{
  "totalUsers": 4,
  "totalDoctors": 3,
  "totalHospitals": 1,
  "activeAlerts": 3,
  "totalHealthRecords": 2
}
```

# User APIs

## Create User

### POST /api/users

Request:

```json
{
  "name": "Test Patient",
  "email": "patient@example.com",
  "password": "123456",
  "role": "patient"
}
```

Response:

```json
{
  "message": "User created successfully",
  "userId": 2
}
```

---

## Get All Users

### GET /api/users

Response:

```json
[
  {
    "id": 2,
    "name": "Test Patient",
    "email": "patient@example.com",
    "role": "patient"
  }
]
```

---

## Get User By ID

### GET /api/users/:id

Example:

```http
GET /api/users/2
```

Response:

```json
{
  "id": 2,
  "name": "Test Patient",
  "email": "patient@example.com",
  "role": "patient"
}
```

---

## Update User

### PUT /api/users/:id

---

## Delete User

### DELETE /api/users/:id

# Health Records APIs

## Create Health Record

### POST /api/health-records

Request:

```json
{
  "user_id": 2,
  "heart_rate": 130,
  "blood_pressure": "140/90",
  "temperature": 39,
  "oxygen_level": 90
}
```

Response:

```json
{
  "message": "Health record created successfully",
  "recordId": 3
}
```

Note:

- Oxygen < 95 → Low Oxygen Alert
- Heart Rate > 120 → High Heart Rate Alert
- Temperature > 38 → High Fever Alert

---

## Get All Health Records

### GET /api/health-records

Authorization Required:

```text
Bearer <JWT_TOKEN>
```

---

## Get Health Records By User

### GET /api/health-records/user/:userId

Example:

```http
GET /api/health-records/user/2
```

---

## Update Health Record

### PUT /api/health-records/:id

---

## Delete Health Record

### DELETE /api/health-records/:id

# Alerts APIs

## Get All Alerts

### GET /api/alerts

Response:

```json
[
  {
    "id": 2,
    "user_id": 2,
    "alert_type": "Low Oxygen",
    "message": "Patient oxygen level is below normal",
    "severity": "high",
    "status": "active"
  }
]
```

---

## Create Alert

### POST /api/alerts

Request:

```json
{
  "user_id": 2,
  "alert_type": "Low Oxygen",
  "message": "Patient oxygen level is below normal",
  "severity": "high"
}
```

---

## Update Alert

### PUT /api/alerts/:id

Request:

```json
{
  "status": "resolved",
  "severity": "medium"
}
```

---

## Resolve Alert

### PUT /api/alerts/:id/resolve

Example:

```http
PUT /api/alerts/4/resolve
```

Response:

```json
{
  "message": "Alert resolved successfully"
}
```

# Doctor APIs

## Get All Doctors

### GET /api/doctors

---

## Get All Patients (Doctor Access)

### GET /api/doctors/patients

Authorization Required:

```text
Bearer <JWT_TOKEN>
```

---

## Get Patient Health Records

### GET /api/doctors/patients/:userId/health-records

Example:

```http
GET /api/doctors/patients/2/health-records
```

---

## Get Active Alerts

### GET /api/doctors/alerts

Authorization Required:

```text
Bearer <JWT_TOKEN>
```

---

## Get Assigned Patients

### GET /api/doctors/:doctorId/patients

Example:

```http
GET /api/doctors/2/patients
```

---

## Get Doctor Alerts

### GET /api/doctors/:doctorId/alerts

Example:

```http
GET /api/doctors/2/alerts
```

---

## Get Active Alert Count

### GET /api/doctors/:doctorId/alerts/count

Response:

```json
{
  "activeAlerts": 3
}
```

---

## Get Doctor Dashboard

### GET /api/doctors/:doctorId/dashboard

Response:

```json
{
  "totalPatients": 1,
  "activeAlerts": 3,
  "totalHealthRecords": 2
}
```

# Hospital APIs

## Get All Hospitals

### GET /api/hospitals

---

## Create Hospital

### POST /api/hospitals

Request:

```json
{
  "name": "City Care Hospital",
  "address": "Greater Noida",
  "phone": "9876543210"
}
```

---

# Emergency APIs

## Trigger Emergency SOS

### POST /api/emergency

Request:

```json
{
  "user_id": 2
}
```

Response:

```json
{
  "message": "Emergency SOS triggered successfully"
}
```

Note:

- Creates Emergency SOS alert
- Finds nearest hospital
- Stores emergency event

---

# Doctor Assignment APIs

## Create Assignment

### POST /api/assignments

Request:

```json
{
  "doctor_id": 2,
  "patient_id": 2
}
```

Response:

```json
{
  "message": "Patient assigned successfully"
}
```

---

## Get All Assignments

### GET /api/assignments

Response:

```json
[
  {
    "id": 1,
    "doctor_id": 2,
    "patient_id": 2,
    "assigned_at": "2026-08-28T03:51:34.000Z"
  }
]
```
