# ZAP API Security Analysis

**Date:** November 30, 2025  
**Target:** Conduit RealWorld API  
**Base URL:** http://localhost:8080/api  
**Testing Method:** Manual + Automated (ZAP)  

---

## Executive Summary

This document details the security assessment of the Conduit application's REST API. Testing focused on API-specific vulnerabilities including authentication bypass, authorization flaws, input validation, rate limiting, and information disclosure.

**Key Findings:**
- **Total API Endpoints Tested:** [FILL IN]
- **Critical Issues:** [FILL IN]
- **High Risk Issues:** [FILL IN]
- **Medium Risk Issues:** [FILL IN]

---

## 1. API Inventory

### 1.1 Authentication Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/users` | Register new user | No |
| POST | `/api/users/login` | User login | No |

### 1.2 User Management Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/user` | Get current user | Yes |
| PUT | `/api/user` | Update user | Yes |

### 1.3 Profile Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/profiles/:username` | Get profile | No |
| POST | `/api/profiles/:username/follow` | Follow user | Yes |
| DELETE | `/api/profiles/:username/follow` | Unfollow user | Yes |

### 1.4 Article Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/articles` | List articles | No |
| GET | `/api/articles/feed` | Get user's feed | Yes |
| GET | `/api/articles/:slug` | Get article | No |
| POST | `/api/articles` | Create article | Yes |
| PUT | `/api/articles/:slug` | Update article | Yes |
| DELETE | `/api/articles/:slug` | Delete article | Yes |

### 1.5 Favorite Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/articles/:slug/favorite` | Favorite article | Yes |
| DELETE | `/api/articles/:slug/favorite` | Unfavorite article | Yes |

### 1.6 Comment Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/articles/:slug/comments` | Get comments | No |
| POST | `/api/articles/:slug/comments` | Add comment | Yes |
| DELETE | `/api/articles/:slug/comments/:id` | Delete comment | Yes |

### 1.7 Tag Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/tags` | Get all tags | No |

---

## 2. Authentication Testing

### 2.1 Authentication Bypass Attempts

#### Test 2.1.1: Access Protected Endpoint Without Token

**Test Case:** Attempt to access user profile without authentication

**Request:**
```http
GET /api/user HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

**Expected Response:** 401 Unauthorized

**Actual Response:**
```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "missing or malformed token"
}
```

**Result:** ✅ PASS - Properly protected

📸 **Screenshot:** `screenshots/zap/api/auth-bypass-test.png`

---

#### Test 2.1.2: Invalid Token

**Request:**
```http
GET /api/user HTTP/1.1
Host: localhost:8080
Authorization: Token invalid_token_12345
```

**Expected:** 401 Unauthorized

**Actual Response:**
```http
HTTP/1.1 401 Unauthorized

{
  "error": "invalid token"
}
```

**Result:** ✅ PASS

📸 **Screenshot:** `screenshots/zap/api/invalid-token-test.png`

---

#### Test 2.1.3: Expired Token

**Test:** Use token generated 30 days ago

**Finding:** [FILL IN - Does the token expire? If not, this is a vulnerability]

**Result:** [PASS/FAIL]

---

#### Test 2.1.4: Token Manipulation

**Test:** Modify JWT payload

**Original Token:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MzI5ODc2MDB9.signature
```

**Modified Payload:**
```json
{
  "user_id": 2,  // Changed from 1 to 2
  "exp": 1732987600
}
```

**Expected:** 401 Unauthorized (signature verification fails)

**Result:** [FILL IN]

---

### 2.2 Password Security

#### Test 2.2.1: Weak Password Acceptance

**Request:**
```http
POST /api/users HTTP/1.1
Content-Type: application/json

{
  "user": {
    "username": "testuser",
    "email": "test@test.com",
    "password": "123"
  }
}
```

**Expected:** 400 Bad Request (password too weak)

**Actual:** [FILL IN]

**Finding:** [Does the API accept weak passwords? If yes, this is a vulnerability]

**Risk:** Medium

**Recommendation:**
```go
func ValidatePassword(password string) error {
    if len(password) < 8 {
        return errors.New("password must be at least 8 characters")
    }
    // Add complexity checks
    hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
    hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
    hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
    hasSpecial := regexp.MustCompile(`[!@#$%^&*]`).MatchString(password)
    
    if !(hasUpper && hasLower && hasNumber && hasSpecial) {
        return errors.New("password must contain uppercase, lowercase, number, and special character")
    }
    return nil
}
```

---

#### Test 2.2.2: Brute Force Protection

**Test:** Send 100 login requests with different passwords

**Tool:** ZAP Fuzzer

**Configuration:**
- Target: POST `/api/users/login`
- Fuzz: password field
- Payloads: 100 common passwords
- Rate: 10 requests/second

**Expected:** Rate limiting or account lockout after N failed attempts

**Actual:** [FILL IN]

**Finding:** [Is there rate limiting? If not, vulnerability exists]

📸 **Screenshot:** `screenshots/zap/api/rate-limit-fuzzer.png`
📸 **Screenshot:** `screenshots/zap/api/rate-limit-results.png`

**Recommendation:**
```go
import "github.com/ulule/limiter/v3"

// 5 login attempts per minute per IP
rate := limiter.Rate{
    Period: 1 * time.Minute,
    Limit:  5,
}
```

---

## 3. Authorization Testing

### 3.1 Insecure Direct Object Reference (IDOR)

#### Test 3.1.1: Access Another User's Article

**Setup:**
1. User A (zaptest@security.test) creates article: "user-a-secret-article"
2. User B (zaptest2@security.test) attempts to modify it

**Request (User B's token):**
```http
PUT /api/articles/user-a-secret-article HTTP/1.1
Host: localhost:8080
Authorization: Token {user_b_token}
Content-Type: application/json

{
  "article": {
    "title": "Modified by User B",
    "description": "This should fail",
    "body": "Unauthorized modification"
  }
}
```

**Expected:** 403 Forbidden

**Actual:** [FILL IN]

**Result:** [PASS/FAIL]

**If FAIL - This is a CRITICAL vulnerability (IDOR)**

📸 **Screenshot:** `screenshots/zap/api/authorization-test.png`

---

#### Test 3.1.2: Delete Another User's Article

**Request:**
```http
DELETE /api/articles/user-a-secret-article HTTP/1.1
Authorization: Token {user_b_token}
```

**Expected:** 403 Forbidden

**Actual:** [FILL IN]

---

#### Test 3.1.3: Delete Another User's Comment

**Setup:**
1. User A creates comment (ID: 1) on article
2. User B attempts to delete it

**Request:**
```http
DELETE /api/articles/some-article/comments/1 HTTP/1.1
Authorization: Token {user_b_token}
```

**Expected:** 403 Forbidden

**Actual:** [FILL IN]

---

### 3.2 Horizontal Privilege Escalation

#### Test 3.2.1: Access Another User's Profile Data

**Request:**
```http
GET /api/user HTTP/1.1
Authorization: Token {user_a_token}
```

**Response should only contain User A's data, not User B's**

**Result:** [FILL IN]

---

### 3.3 Vertical Privilege Escalation

#### Test 3.3.1: Mass Assignment - Elevate Privileges

**Request:**
```http
PUT /api/user HTTP/1.1
Authorization: Token {regular_user_token}
Content-Type: application/json

{
  "user": {
    "email": "attacker@test.com",
    "isAdmin": true,
    "role": "admin"
  }
}
```

**Expected:** 400 Bad Request or ignore extra fields

**Actual:** [FILL IN]

**Finding:** [Can users set admin flags? If yes, CRITICAL vulnerability]

---

## 4. Input Validation Testing

### 4.1 SQL Injection

#### Test 4.1.1: SQL Injection in Article Filter

**Request:**
```http
GET /api/articles?tag=test' OR '1'='1 HTTP/1.1
Host: localhost:8080
```

**Expected:** Empty result set or error handling (not SQL error)

**Actual:** [FILL IN]

**Evidence of Vulnerability:**
```http
HTTP/1.1 500 Internal Server Error
{
  "error": "pq: syntax error at or near \"1\"",
  "query": "SELECT * FROM articles WHERE tag = 'test' OR '1'='1'"
}
```

**If vulnerable:** CRITICAL - Full database access possible

📸 **Screenshot:** `screenshots/zap/api/sql-injection-test.png`

---

#### Test 4.1.2: SQL Injection in Search

**Payloads to test:**
```
' OR '1'='1
'; DROP TABLE users--
' UNION SELECT password FROM users--
```

**Test each in:**
- `/api/articles?author=`
- `/api/articles?favorited=`
- `/api/profiles/{username}`

**Results:** [FILL IN for each]

---

### 4.2 Cross-Site Scripting (XSS)

#### Test 4.2.1: Stored XSS in Article Body

**Request:**
```http
POST /api/articles HTTP/1.1
Authorization: Token {valid_token}
Content-Type: application/json

{
  "article": {
    "title": "XSS Test Article",
    "description": "Testing XSS",
    "body": "<script>alert('XSS')</script>",
    "tagList": ["security", "xss"]
  }
}
```

**Response:** [FILL IN - is script stored as-is?]

**Then view in browser:**
```
http://localhost:4100/#/article/xss-test-article
```

**Does alert execute?** [YES/NO]

**If YES:** HIGH severity vulnerability

📸 **Screenshot:** `screenshots/zap/api/xss-test-create.png`
📸 **Screenshot:** `screenshots/zap/api/xss-execution.png`

---

#### Test 4.2.2: XSS in Comment

**Request:**
```http
POST /api/articles/test-article/comments HTTP/1.1
Content-Type: application/json
Authorization: Token {valid_token}

{
  "comment": {
    "body": "<img src=x onerror=alert('XSS')>"
  }
}
```

**Result:** [FILL IN]

---

#### Test 4.2.3: XSS in Article Title

**Request:**
```http
POST /api/articles HTTP/1.1
Content-Type: application/json
Authorization: Token {valid_token}

{
  "article": {
    "title": "<svg onload=alert('XSS')>",
    "description": "Test",
    "body": "Test"
  }
}
```

**Result:** [FILL IN]

---

### 4.3 Command Injection

#### Test 4.3.1: Command Injection in Tag

**Request:**
```http
POST /api/articles HTTP/1.1
Content-Type: application/json

{
  "article": {
    "title": "Test",
    "description": "Test",
    "body": "Test",
    "tagList": ["; ls -la", "$(whoami)", "`cat /etc/passwd`"]
  }
}
```

**Expected:** Tags stored as strings, no command execution

**Actual:** [FILL IN]

---

### 4.4 JSON Injection

#### Test 4.4.1: JSON Structure Manipulation

**Request:**
```http
POST /api/users HTTP/1.1
Content-Type: application/json

{
  "user": {
    "username": "test",
    "email": "test@test.com",
    "password": "Test123!",
    "isAdmin": true
  }
}
```

**Expected:** Extra fields ignored

**Actual:** [FILL IN]

---

## 5. Rate Limiting & Resource Exhaustion

### 5.1 Login Endpoint Rate Limiting

**Test:** Fuzzer test (see section 2.2.2)

**Result:** [FILL IN]

**Recommendation:** 5 attempts per minute per IP

---

### 5.2 Article Creation Rate Limiting

**Test:** Create 100 articles rapidly

**Script:**
```bash
for i in {1..100}; do
  curl -X POST http://localhost:8080/api/articles \
    -H "Authorization: Token $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"article\":{\"title\":\"Spam $i\",\"description\":\"Test\",\"body\":\"Test\"}}"
done
```

**Expected:** Rate limiting after N requests

**Actual:** [FILL IN - were all 100 created?]

**If no rate limiting:** Medium severity vulnerability (spam/DoS)

---

### 5.3 Comment Spam

**Test:** Post 100 comments on single article

**Expected:** Rate limiting

**Actual:** [FILL IN]

---

## 6. Information Disclosure

### 6.1 Verbose Error Messages

#### Test 6.1.1: Invalid JSON

**Request:**
```http
POST /api/articles HTTP/1.1
Content-Type: application/json

{invalid json}
```

**Response:** [FILL IN]

**Check for:**
- Stack traces
- File paths
- Database schema info
- Framework version

**Finding:** [Does it reveal sensitive info?]

📸 **Screenshot:** `screenshots/zap/api/verbose-error.png`

---

#### Test 6.1.2: Database Error Disclosure

**Request:**
```http
GET /api/articles?limit=invalid HTTP/1.1
```

**Response:** [FILL IN]

**Check for database errors like:**
```
"error": "pq: invalid input syntax for type integer: \"invalid\""
```

---

### 6.2 User Enumeration

#### Test 6.2.1: Email Enumeration via Registration

**Request 1:**
```http
POST /api/users
{"user":{"username":"test","email":"existing@test.com","password":"Test123!"}}
```

**Response:** [FILL IN - does it reveal email already exists?]

**Request 2:**
```http
POST /api/users
{"user":{"username":"test","email":"new@test.com","password":"Test123!"}}
```

**Response:** [FILL IN]

**Finding:** Can attacker enumerate valid email addresses?

**Risk:** Low-Medium

---

#### Test 6.2.2: Username Enumeration

**Request:**
```http
GET /api/profiles/existinguser
GET /api/profiles/nonexistentuser
```

**Different responses reveal username existence**

**Expected:** Same response format for both

**Actual:** [FILL IN]

---

### 6.3 Token Disclosure

#### Test 6.3.1: Token in URL

**Check:** Are tokens ever passed in URL parameters?

**Example (BAD):**
```
GET /api/user?token=eyJhbG...
```

**Finding:** [FILL IN]

**Risk:** High (tokens logged in server logs, browser history)

---

## 7. Session Management

### 7.1 Token Expiration

**Test:** Generate token, wait 24 hours, use token

**Expected:** Token expires and returns 401

**Actual:** [FILL IN - does token expire?]

**Current token lifetime:** [FILL IN]

**Recommendation:** 15 minutes for access tokens, 7 days for refresh tokens

---

### 7.2 Concurrent Sessions

**Test:** Login from 2 devices, logout from one

**Expected:** [Define expected behavior]

**Actual:** [FILL IN]

---

### 7.3 Token Revocation

**Test:** Is there a logout endpoint that invalidates token?

**Request:**
```http
POST /api/users/logout HTTP/1.1
Authorization: Token {token}
```

**Does this endpoint exist?** [YES/NO]

**If NO:** Tokens cannot be revoked (Medium risk)

---

## 8. Business Logic Flaws

### 8.1 Follow/Unfollow Logic

#### Test 8.1.1: Follow Self

**Request:**
```http
POST /api/profiles/zaptest/follow HTTP/1.1
Authorization: Token {zaptest_token}
```

**Expected:** 400 Bad Request (can't follow self)

**Actual:** [FILL IN]

---

#### Test 8.1.2: Double Follow

**Request:** Follow same user twice

**Expected:** Idempotent (no error, no duplicate)

**Actual:** [FILL IN]

---

### 8.2 Favorite Logic

#### Test 8.2.1: Favorite Own Article

**Allowed?** [YES/NO]

**Expected behavior:** [Define]

**Actual:** [FILL IN]

---

#### Test 8.2.2: Negative Favorite Count

**Test:** Unfavorite article that wasn't favorited

**Expected:** Favorite count stays >= 0

**Actual:** [FILL IN - can you get negative counts?]

---

### 8.3 Article Slug Collision

**Test:** Create two articles with same title (same slug)

**Request 1:**
```http
POST /api/articles
{"article":{"title":"Duplicate Title","description":"Test","body":"Test"}}
```

**Request 2:**
```http
POST /api/articles
{"article":{"title":"Duplicate Title","description":"Test","body":"Test"}}
```

**Expected:** System generates unique slugs (e.g., duplicate-title-1, duplicate-title-2)

**Actual:** [FILL IN]

---

## 9. API Security Best Practices

### 9.1 HTTPS Enforcement

**Finding:** API accessible via HTTP (localhost testing)

**Production Recommendation:** Enforce HTTPS, redirect HTTP → HTTPS

---

### 9.2 CORS Configuration

**Test:** Send request from different origin

**Request:**
```http
GET /api/articles HTTP/1.1
Origin: http://evil.com
```

**Response Headers:**
```http
Access-Control-Allow-Origin: *
```

**Finding:** [FILL IN - what is CORS policy?]

**Recommendation:** Whitelist specific origins
```go
config := cors.DefaultConfig()
config.AllowOrigins = []string{"http://localhost:4100", "https://production-domain.com"}
```

---

### 9.3 API Versioning

**Finding:** No API versioning in URLs

**Current:** `/api/articles`

**Recommendation:** `/api/v1/articles` for future compatibility

---

### 9.4 Request Size Limits

**Test:** Send extremely large request body

**Request:**
```http
POST /api/articles HTTP/1.1
Content-Type: application/json

{
  "article": {
    "title": "Test",
    "body": "[100MB of text]"
  }
}
```

**Expected:** 413 Payload Too Large

**Actual:** [FILL IN]

**Recommendation:**
```go
router.Use(gin.MaxMultipartMemory = 8 << 20) // 8 MB
```

---

## 10. Remediation Summary

### Critical Priority (Fix Immediately)

| Vulnerability | Affected Endpoints | Recommendation |
|---------------|-------------------|----------------|
| SQL Injection | `/api/articles?tag=` | Use parameterized queries |
| IDOR | Article/Comment DELETE | Add authorization checks |
| [FILL IN MORE] | | |

### High Priority (Fix Within 1 Week)

| Vulnerability | Affected Endpoints | Recommendation |
|---------------|-------------------|----------------|
| Stored XSS | Article/Comment creation | Sanitize HTML input |
| No Token Expiration | All authenticated endpoints | Implement expiration |
| [FILL IN MORE] | | |

### Medium Priority (Fix Within 2 Weeks)

| Vulnerability | Affected Endpoints | Recommendation |
|---------------|-------------------|----------------|
| No Rate Limiting | Login, Article creation | Implement rate limiter |
| Weak Passwords | Registration | Enforce password policy |
| [FILL IN MORE] | | |

---

## 11. Conclusion

The API security assessment revealed **[X] critical, [Y] high, and [Z] medium** severity vulnerabilities.

**Most Critical Findings:**
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

**Overall Risk:** [HIGH/MEDIUM/LOW]

**Recommended Actions:**
1. Immediately fix all critical vulnerabilities
2. Implement rate limiting across all endpoints
3. Add comprehensive input validation
4. Conduct security code review
5. Re-test after fixes

---

## Appendix A: Test Coverage Matrix

| Endpoint | Auth Bypass | Authorization | SQL Injection | XSS | Rate Limit | Tested |
|----------|------------|---------------|---------------|-----|------------|--------|
| POST /api/users | N/A | N/A | ✅ | ✅ | ✅ | ✅ |
| POST /api/users/login | N/A | N/A | ✅ | N/A | ✅ | ✅ |
| GET /api/user | ✅ | ✅ | N/A | N/A | ❌ | ⚠️ |
| PUT /api/user | ✅ | ✅ | ❌ | ✅ | ❌ | ⚠️ |
| POST /api/articles | ✅ | N/A | ✅ | ✅ | ✅ | ✅ |
| [Fill in rest] | | | | | | |

---

## Appendix B: Screenshots

- `screenshots/zap/api/auth-bypass-test.png` - Authentication bypass test
- `screenshots/zap/api/invalid-token-test.png` - Invalid token handling
- `screenshots/zap/api/authorization-test.png` - IDOR testing
- `screenshots/zap/api/sql-injection-test.png` - SQL injection attempt
- `screenshots/zap/api/xss-test-create.png` - XSS payload creation
- `screenshots/zap/api/xss-execution.png` - XSS execution in browser
- `screenshots/zap/api/rate-limit-fuzzer.png` - Rate limit fuzzer config
- `screenshots/zap/api/rate-limit-results.png` - Rate limit test results
- `screenshots/zap/api/verbose-error.png` - Verbose error message

---

**Report Generated:** November 30, 2025  
**Tester:** [Your Name]  
**Tool:** OWASP ZAP + Manual Testing
