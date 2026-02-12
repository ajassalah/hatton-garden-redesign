Brooches & Pins# 🧪 API Testing Guide

Complete guide for testing all admin dashboard API endpoints.

---

## 🔧 Setup

### Tools Needed
- **cURL** (command line)
- **Postman** (GUI, recommended)
- **Thunder Client** (VS Code extension)
- **Insomnia** (GUI alternative)

### Base URL
```
http://localhost:3000
```

### Environment Variables
Create these in your API client:
```
BASE_URL=http://localhost:3000
TOKEN=your_jwt_token_here
```

---

## 🔐 Authentication

### 1. Login

**Endpoint**: `POST /api/admin/login`

**Request**:
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "changeme123"
  }'
```

**Postman**:
```
Method: POST
URL: {{BASE_URL}}/api/admin/login
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "username": "admin",
  "password": "changeme123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin"
  }
}
```

**Error Response** (401):
```json
{
  "error": "Invalid credentials"
}
```

**Save the token** for subsequent requests!

---

### 2. Verify Token

**Endpoint**: `GET /api/admin/verify`

**Request**:
```bash
curl http://localhost:3000/api/admin/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Postman**:
```
Method: GET
URL: {{BASE_URL}}/api/admin/verify
Headers:
  Authorization: Bearer {{TOKEN}}
```

**Success Response** (200):
```json
{
  "success": true,
  "user": {
    "username": "admin"
  }
}
```

**Error Response** (401):
```json
{
  "error": "Unauthorized"
}
```

---

## 💎 Jewellers API

### 1. Get All Jewellers

**Endpoint**: `GET /api/admin/jewellers`

**Request**:
```bash
curl http://localhost:3000/api/admin/jewellers
```

**With Filters**:
```bash
# Search by name
curl "http://localhost:3000/api/admin/jewellers?search=harper"

# Filter by category
curl "http://localhost:3000/api/admin/jewellers?category=diamonds"

# Both
curl "http://localhost:3000/api/admin/jewellers?search=fine&category=bespoke"
```

**Postman**:
```
Method: GET
URL: {{BASE_URL}}/api/admin/jewellers
Params:
  search: harper (optional)
  category: diamonds (optional)
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "slug": "harper-tait-fine-jewellery",
      "name": "Harper Tait Fine Jewellery",
      "category": "Retail / Fine Jewellery",
      "description": "Specializes in beautiful fine jewellery...",
      "phone": "+44 7566 7564 99",
      "email": "info@harpertait.com",
      "website": "https://www.harpertait.com",
      "address": "Suite 26, New House, 67-68 Hatton Garden...",
      "rating": 5,
      "reviewsCount": 347,
      "openingTimes": "Monday to Saturday 10am - 7pm",
      "image": "/jewellers/Harper tait fine.jpg",
      "socials": {
        "twitter": "https://twitter.com/harpertait",
        "facebook": "https://facebook.com/harpertait",
        "instagram": "https://instagram.com/harpertait"
      },
      "longDescription": "Harper Tait has been a prominent name..."
    }
  ],
  "total": 50
}
```

---

### 2. Get Single Jeweller

**Endpoint**: `GET /api/admin/jewellers/[slug]`

**Request**:
```bash
curl http://localhost:3000/api/admin/jewellers/harper-tait-fine-jewellery
```

**Postman**:
```
Method: GET
URL: {{BASE_URL}}/api/admin/jewellers/harper-tait-fine-jewellery
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "slug": "harper-tait-fine-jewellery",
    "name": "Harper Tait Fine Jewellery",
    ...
  }
}
```

**Error Response** (404):
```json
{
  "error": "Jeweller not found"
}
```

---

### 3. Create Jeweller

**Endpoint**: `POST /api/admin/jewellers`
**Auth Required**: Yes

**Request**:
```bash
curl -X POST http://localhost:3000/api/admin/jewellers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Jeweller",
    "category": "Retail / Fine Jewellery",
    "description": "A beautiful new jeweller",
    "phone": "+44 20 1234 5678",
    "email": "info@newjeweller.com",
    "website": "https://newjeweller.com",
    "address": "123 Hatton Garden, London",
    "rating": 4.5,
    "reviewsCount": 0,
    "openingTimes": "Mon-Fri 10am-6pm",
    "image": "/jewellers/new.jpg",
    "socials": {
      "instagram": "https://instagram.com/newjeweller"
    },
    "longDescription": "Detailed description here..."
  }'
```

**Postman**:
```
Method: POST
URL: {{BASE_URL}}/api/admin/jewellers
Headers:
  Authorization: Bearer {{TOKEN}}
  Content-Type: application/json
Body (raw JSON):
{
  "name": "New Jeweller",
  "category": "Retail / Fine Jewellery",
  ...
}
```

**Success Response** (201):
```json
{
  "success": true,
  "data": {
    "slug": "new-jeweller",
    "name": "New Jeweller",
    ...
  },
  "message": "Jeweller created successfully"
}
```

---

### 4. Update Jeweller

**Endpoint**: `PUT /api/admin/jewellers/[slug]`
**Auth Required**: Yes

**Request**:
```bash
curl -X PUT http://localhost:3000/api/admin/jewellers/new-jeweller \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Jeweller Name",
    "rating": 4.8
  }'
```

**Postman**:
```
Method: PUT
URL: {{BASE_URL}}/api/admin/jewellers/new-jeweller
Headers:
  Authorization: Bearer {{TOKEN}}
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Updated Jeweller Name",
  "rating": 4.8
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "slug": "new-jeweller",
    "name": "Updated Jeweller Name",
    ...
  },
  "message": "Jeweller updated successfully"
}
```

---

### 5. Delete Jeweller

**Endpoint**: `DELETE /api/admin/jewellers/[slug]`
**Auth Required**: Yes

**Request**:
```bash
curl -X DELETE http://localhost:3000/api/admin/jewellers/new-jeweller \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Postman**:
```
Method: DELETE
URL: {{BASE_URL}}/api/admin/jewellers/new-jeweller
Headers:
  Authorization: Bearer {{TOKEN}}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Jeweller deleted successfully"
}
```

---

## ☕ Cafes API

### 1. Get All Cafes

**Endpoint**: `GET /api/admin/cafes`

**Request**:
```bash
curl http://localhost:3000/api/admin/cafes
```

**With Filters**:
```bash
# Search
curl "http://localhost:3000/api/admin/cafes?search=coffee"

# Category
curl "http://localhost:3000/api/admin/cafes?category=pub"
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "slug": "prufrock-coffee",
      "name": "Prufrock Coffee",
      "category": "Café",
      "description": "World-class specialty coffee...",
      "phone": "020 7242 0467",
      "email": "info@prufrockcoffee.com",
      "website": "https://www.prufrockcoffee.com/",
      "address": "23-25 Leather Ln, London EC1N 7TE",
      "rating": 4.7,
      "reviewsCount": 1450,
      "openingTimes": "Mon-Fri: 07:30-16:30, Sat-Sun: 08:00-17:00",
      "image": "/Cafes/prufrock.jpg",
      "socials": {
        "instagram": "https://www.instagram.com/prufrockcoffee/"
      },
      "longDescription": "Prufrock Coffee is a legendary..."
    }
  ],
  "total": 12
}
```

---

### 2. Create Cafe

**Endpoint**: `POST /api/admin/cafes`
**Auth Required**: Yes

**Request**:
```bash
curl -X POST http://localhost:3000/api/admin/cafes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Cafe",
    "category": "Café",
    "description": "A wonderful new cafe",
    "phone": "020 1234 5678",
    "email": "info@newcafe.com",
    "website": "https://newcafe.com",
    "address": "456 Hatton Garden, London",
    "rating": 4.5,
    "reviewsCount": 0,
    "openingTimes": "Mon-Sun 8am-6pm",
    "image": "/cafes/new.jpg",
    "socials": {},
    "longDescription": "Detailed description..."
  }'
```

**Success Response** (201):
```json
{
  "success": true,
  "data": {
    "slug": "new-cafe",
    "name": "New Cafe",
    ...
  },
  "message": "Cafe created successfully"
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Authentication Flow

1. **Login**
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"changeme123"}'
```

2. **Save Token** from response

3. **Verify Token**
```bash
curl http://localhost:3000/api/admin/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

4. **Make Authenticated Request**
```bash
curl -X POST http://localhost:3000/api/admin/jewellers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Jeweller",...}'
```

---

### Scenario 2: CRUD Operations

1. **Create** a new jeweller (POST)
2. **Read** the jeweller (GET)
3. **Update** the jeweller (PUT)
4. **Delete** the jeweller (DELETE)

---

### Scenario 3: Search and Filter

1. **Get all jewellers**
```bash
curl http://localhost:3000/api/admin/jewellers
```

2. **Search by name**
```bash
curl "http://localhost:3000/api/admin/jewellers?search=diamond"
```

3. **Filter by category**
```bash
curl "http://localhost:3000/api/admin/jewellers?category=bespoke"
```

4. **Combined search and filter**
```bash
curl "http://localhost:3000/api/admin/jewellers?search=fine&category=retail"
```

---

## 🔍 Error Testing

### Test Invalid Credentials
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"wrong","password":"wrong"}'
```

Expected: 401 Unauthorized

---

### Test Missing Token
```bash
curl -X POST http://localhost:3000/api/admin/jewellers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

Expected: 401 Unauthorized

---

### Test Invalid Token
```bash
curl http://localhost:3000/api/admin/verify \
  -H "Authorization: Bearer invalid_token"
```

Expected: 401 Unauthorized

---

### Test Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin"}'
```

Expected: 400 Bad Request

---

## 📋 Postman Collection

### Import This Collection

```json
{
  "info": {
    "name": "Hatton Garden Admin API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"admin\",\n  \"password\": \"changeme123\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/api/admin/login",
              "host": ["{{BASE_URL}}"],
              "path": ["api", "admin", "login"]
            }
          }
        },
        {
          "name": "Verify",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{TOKEN}}"
              }
            ],
            "url": {
              "raw": "{{BASE_URL}}/api/admin/verify",
              "host": ["{{BASE_URL}}"],
              "path": ["api", "admin", "verify"]
            }
          }
        }
      ]
    },
    {
      "name": "Jewellers",
      "item": [
        {
          "name": "Get All",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/api/admin/jewellers",
              "host": ["{{BASE_URL}}"],
              "path": ["api", "admin", "jewellers"]
            }
          }
        },
        {
          "name": "Create",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{TOKEN}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Jeweller\",\n  \"category\": \"Retail\",\n  \"description\": \"Test\",\n  \"phone\": \"+44 20 1234 5678\",\n  \"email\": \"test@test.com\",\n  \"website\": \"https://test.com\",\n  \"address\": \"Test Address\",\n  \"rating\": 4.5,\n  \"reviewsCount\": 0,\n  \"openingTimes\": \"Mon-Fri 10am-6pm\",\n  \"image\": \"/test.jpg\",\n  \"socials\": {},\n  \"longDescription\": \"Test description\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/api/admin/jewellers",
              "host": ["{{BASE_URL}}"],
              "path": ["api", "admin", "jewellers"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## ✅ Testing Checklist

### Authentication
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong credentials
- [ ] Token is returned on successful login
- [ ] Token can be verified
- [ ] Invalid token is rejected
- [ ] Missing token is rejected

### Jewellers
- [ ] Can get all jewellers
- [ ] Can search jewellers
- [ ] Can filter by category
- [ ] Can get single jeweller
- [ ] Can create jeweller (with auth)
- [ ] Cannot create without auth
- [ ] Can update jeweller (with auth)
- [ ] Can delete jeweller (with auth)

### Cafes
- [ ] Can get all cafes
- [ ] Can search cafes
- [ ] Can filter by category
- [ ] Can create cafe (with auth)
- [ ] Cannot create without auth

---

## 🐛 Common Issues

### Issue: "Unauthorized" on protected routes
**Solution**: Make sure you're including the Authorization header with Bearer token

### Issue: "Invalid credentials"
**Solution**: Check username and password in .env file

### Issue: CORS errors
**Solution**: Make sure you're running on localhost:3000

### Issue: 404 Not Found
**Solution**: Check the URL path is correct

---

## 📊 Response Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Missing/invalid data |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal error |

---

Happy Testing! 🧪
