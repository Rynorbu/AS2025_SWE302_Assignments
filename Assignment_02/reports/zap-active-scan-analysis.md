# ZAP Active Scan Analysis

**Date:** November 30, 2025  
**Target Application:** Conduit RealWorld App  
**Target URL:** http://localhost:4100  
**Scan Type:** Authenticated Active Scan  
**Scan Duration:** [FILL IN - e.g., 45 minutes]  

---

## Executive Summary

This document presents findings from an authenticated active security scan performed using OWASP ZAP. Active scanning involves sending malicious payloads to identify vulnerabilities through actual exploitation attempts.

**Scan Configuration:**
- **Authentication:** JSON-based (JWT token)
- **Test User:** zaptest@security.test
- **Scan Policy:** OWASP Top 10
- **Scan Intensity:** Medium
- **URLs Tested:** [FILL IN number]

**Key Metrics:**
- **Total Vulnerabilities:** [FILL IN]
- **Critical:** [FILL IN]
- **High Risk:** [FILL IN]
- **Medium Risk:** [FILL IN]
- **Low Risk:** [FILL IN]
- **Informational:** [FILL IN]

---

## 1. Vulnerability Summary

### 1.1 Risk Distribution

| Risk Level | Count | Percentage | CVSS Score Range |
|------------|-------|------------|------------------|
| Critical | [FILL IN] | [FILL IN]% | 9.0-10.0 |
| High | [FILL IN] | [FILL IN]% | 7.0-8.9 |
| Medium | [FILL IN] | [FILL IN]% | 4.0-6.9 |
| Low | [FILL IN] | [FILL IN]% | 0.1-3.9 |
| Informational | [FILL IN] | [FILL IN]% | 0.0 |
| **Total** | **[FILL IN]** | **100%** | |

### 1.2 OWASP Top 10 Mapping

| OWASP Category | Vulnerabilities Found | Count |
|----------------|----------------------|-------|
| A01:2021 - Broken Access Control | [List types] | [X] |
| A02:2021 - Cryptographic Failures | [List types] | [X] |
| A03:2021 - Injection | [List types] | [X] |
| A04:2021 - Insecure Design | [List types] | [X] |
| A05:2021 - Security Misconfiguration | [List types] | [X] |
| A06:2021 - Vulnerable Components | [List types] | [X] |
| A07:2021 - Authentication Failures | [List types] | [X] |
| A08:2021 - Software/Data Integrity | [List types] | [X] |
| A09:2021 - Logging Failures | [List types] | [X] |
| A10:2021 - SSRF | [List types] | [X] |

---

## 2. Critical Vulnerabilities

### 2.1 [Vulnerability Name - e.g., SQL Injection]

**Risk Level:** Critical  
**Confidence:** High  
**CWE:** CWE-89  
**OWASP:** A03:2021 - Injection  
**CVSS Score:** 9.8  

#### Description
SQL Injection allows an attacker to execute arbitrary SQL commands in the application's database, potentially leading to unauthorized data access, modification, or deletion.

#### Affected URLs
```
POST http://localhost:8080/api/articles
GET http://localhost:8080/api/articles?tag=test
[List all affected endpoints]
```

#### Attack Details

**Injection Point:** Query parameter `tag`

**Malicious Payload Used by ZAP:**
```
http://localhost:8080/api/articles?tag=test' OR '1'='1
```

**Full Request:**
```http
GET /api/articles?tag=test' OR '1'='1 HTTP/1.1
Host: localhost:8080
Authorization: Token eyJhbGc...
User-Agent: Mozilla/5.0
```

**Response Indicating Vulnerability:**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "pq: syntax error at or near \"1\"",
  "query": "SELECT * FROM articles WHERE tag = 'test' OR '1'='1'"
}
```

#### Evidence
[Screenshot showing the vulnerability]
- Request sent by ZAP
- Response revealing SQL error
- Database error message

#### Impact Assessment

**Severity: CRITICAL**

An attacker could:
1. **Data Breach:** Extract entire database including user credentials, articles, comments
2. **Data Manipulation:** Modify or delete articles, user profiles
3. **Authentication Bypass:** Login as any user without password
4. **Privilege Escalation:** Grant admin rights to attacker account
5. **System Compromise:** Execute system commands (depending on DB permissions)

**Business Impact:**
- Complete loss of data confidentiality
- Data integrity compromise
- Potential regulatory violations (GDPR, etc.)
- Reputational damage

#### Proof of Concept

**Step-by-step exploitation:**

1. Navigate to: `http://localhost:4100/#/`
2. Open browser dev tools, Network tab
3. Craft request:
```bash
curl "http://localhost:8080/api/articles?tag=test' UNION SELECT password FROM users--" \
  -H "Authorization: Token YOUR_TOKEN"
```
4. Observe: Password hashes returned in response

#### Remediation

**Immediate Fix (Required):**

Use parameterized queries/prepared statements:

**Before (Vulnerable):**
```go
query := "SELECT * FROM articles WHERE tag = '" + tag + "'"
db.Query(query)
```

**After (Secure):**
```go
query := "SELECT * FROM articles WHERE tag = ?"
db.Query(query, tag)
```

**Additional Protections:**
1. Input validation and sanitization
2. Use ORM (GORM) with safe query builders
3. Implement least privilege for database user
4. Enable database query logging
5. Deploy WAF (Web Application Firewall)

#### References
- https://owasp.org/www-community/attacks/SQL_Injection
- https://cwe.mitre.org/data/definitions/89.html
- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

---

### 2.2 [Next Critical Vulnerability]

[Repeat same detailed structure]

---

## 3. High Severity Vulnerabilities

### 3.1 Cross-Site Scripting (Reflected)

**Risk Level:** High  
**Confidence:** High  
**CWE:** CWE-79  
**OWASP:** A03:2021 - Injection  
**CVSS Score:** 8.2  

#### Description
Reflected XSS allows attackers to inject malicious scripts that execute in victims' browsers when they visit a crafted URL.

#### Affected URLs
```
GET http://localhost:4100/?search=<script>alert('XSS')</script>
POST http://localhost:8080/api/articles (in article body)
```

#### Attack Details

**Injection Point:** Search parameter, article content

**Payload:**
```html
<script>alert(document.cookie)</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
```

**Request:**
```http
POST /api/articles HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Authorization: Token eyJ...

{
  "article": {
    "title": "Test Article",
    "description": "Description",
    "body": "<script>alert('XSS')</script>",
    "tagList": ["test"]
  }
}
```

**Response:**
```http
HTTP/1.1 200 OK
{
  "article": {
    "body": "<script>alert('XSS')</script>",
    ...
  }
}
```

**When viewing the article in browser, script executes!**

#### Evidence
[Screenshots showing XSS execution]

#### Impact
- Session hijacking (steal cookies/tokens)
- Credential theft via fake login forms
- Malware distribution
- Defacement
- Phishing attacks

#### Remediation

**1. Output Encoding:**
```javascript
// React (automatically escapes by default, but avoid dangerouslySetInnerHTML)
<div>{articleBody}</div>  // SAFE

// Don't do this:
<div dangerouslySetInnerHTML={{__html: articleBody}} />  // UNSAFE
```

**2. Input Validation:**
```go
// Sanitize HTML in backend
import "github.com/microcosm-cc/bluemonday"

p := bluemonday.UGCPolicy()
sanitized := p.Sanitize(userInput)
```

**3. Content Security Policy:**
```
Content-Security-Policy: default-src 'self'; script-src 'self'
```

---

### 3.2 Insecure Direct Object Reference (IDOR)

**Risk Level:** High  
**Confidence:** Medium  
**CWE:** CWE-639  
**OWASP:** A01:2021 - Broken Access Control  

#### Description
Users can access/modify resources belonging to other users by manipulating IDs.

#### Affected URLs
```
PUT http://localhost:8080/api/articles/{slug}
DELETE http://localhost:8080/api/articles/{slug}
DELETE http://localhost:8080/api/articles/{slug}/comments/{id}
```

#### Attack Details

**Scenario:**
1. User A creates an article (slug: "user-a-article")
2. User B logs in
3. User B sends:
```http
DELETE /api/articles/user-a-article HTTP/1.1
Authorization: Token {user-b-token}
```
4. If vulnerable: Article deleted successfully (should be 403 Forbidden)

#### Evidence
[Screenshots of successful unauthorized access]

#### Remediation

```go
// Add authorization check
func DeleteArticle(c *gin.Context) {
    slug := c.Param("slug")
    currentUser := getCurrentUser(c)
    
    article := getArticleBySlug(slug)
    
    // Check ownership
    if article.AuthorID != currentUser.ID {
        c.JSON(403, gin.H{"error": "Forbidden"})
        return
    }
    
    // Proceed with deletion
    deleteArticle(article)
    c.JSON(200, gin.H{"message": "Deleted"})
}
```

---

### 3.3 [Additional High Severity Vulnerabilities]

[Continue listing all high severity findings]

---

## 4. Medium Severity Vulnerabilities

### 4.1 Cross-Site Request Forgery (CSRF)

**Risk Level:** Medium  
**Confidence:** Medium  
**CWE:** CWE-352  
**OWASP:** A01:2021 - Broken Access Control  

#### Description
Application doesn't validate that state-changing requests originate from the legitimate user.

#### Affected URLs
```
POST http://localhost:8080/api/articles
PUT http://localhost:8080/api/user
DELETE http://localhost:8080/api/articles/{slug}
```

#### Attack Details

Attacker creates malicious webpage:
```html
<html>
<body>
<form action="http://localhost:8080/api/articles" method="POST" id="csrf">
  <input type="hidden" name="title" value="Hacked Article" />
  <input type="hidden" name="body" value="Malicious content" />
</form>
<script>document.getElementById('csrf').submit();</script>
</body>
</html>
```

If logged-in user visits this page, article is created without their knowledge.

#### Remediation

**1. CSRF Tokens:**
```go
import "github.com/utrack/gin-csrf"

router.Use(csrf.Middleware(csrf.Options{
    Secret: "your-secret-key",
    ErrorFunc: func(c *gin.Context) {
        c.JSON(400, gin.H{"error": "CSRF token invalid"})
        c.Abort()
    },
}))
```

**2. SameSite Cookie Flag:**
```go
router.Use(sessions.Sessions("mysession", store))
// Configure session cookie
store.Options(sessions.Options{
    SameSite: http.SameSiteStrictMode,
})
```

**3. Verify Origin/Referer Headers:**
```go
func ValidateOrigin(c *gin.Context) {
    origin := c.GetHeader("Origin")
    if origin != "http://localhost:4100" {
        c.JSON(403, gin.H{"error": "Invalid origin"})
        c.Abort()
        return
    }
    c.Next()
}
```

---

### 4.2 [Additional Medium Vulnerabilities]

[Continue listing]

---

## 5. Low Severity Vulnerabilities

### 5.1 Verbose Error Messages

**Risk Level:** Low  
**Description:** Stack traces and detailed errors exposed to users
**Remediation:** Implement generic error messages, log details server-side

### 5.2 [Other Low Issues]

---

## 6. Informational Findings

- Application uses JWT tokens (good)
- HTTPS not enforced (localhost testing)
- [Other observations]

---

## 7. API-Specific Vulnerabilities

### 7.1 Lack of Rate Limiting

**Affected Endpoints:**
- POST /api/users/login (brute force)
- POST /api/articles (spam)

**Evidence:**
ZAP sent 100 requests in 10 seconds, all processed successfully.

**Remediation:**
Implement rate limiting middleware:
```go
import "github.com/ulule/limiter/v3"

rate := limiter.Rate{
    Period: 1 * time.Minute,
    Limit:  10,
}
```

### 7.2 Mass Assignment Vulnerability

**Description:** API accepts extra parameters not intended to be user-controlled

**Example:**
```json
PUT /api/user
{
  "user": {
    "email": "attacker@test.com",
    "isAdmin": true  // Should not be settable by user
  }
}
```

---

## 8. Authentication & Session Management Issues

### 8.1 Token Expiration

**Finding:** JWT tokens don't appear to expire

**Test:**
- Generated token 24 hours ago still valid
- No refresh token mechanism

**Recommendation:**
- Set token expiration: 15 minutes for access tokens
- Implement refresh tokens: 7-day expiration
- Implement token revocation

### 8.2 Password Policy

**Finding:** Weak passwords accepted

**Test:**
- Registered with password: "123"
- No complexity requirements enforced

**Recommendation:**
- Minimum 8 characters
- Require uppercase, lowercase, number, special char
- Check against common password lists

---

## 9. False Positives Analysis

Document alerts investigated and deemed false positives:

### 9.1 [Alert Name]
**Why false positive:**
[Explanation of why this doesn't represent a real vulnerability]

---

## 10. Comparison with Passive Scan

| Metric | Passive Scan | Active Scan |
|--------|-------------|-------------|
| Total Alerts | [X] | [Y] |
| High Risk | [X] | [Y] |
| New Findings | N/A | [Z unique to active] |
| Scan Duration | 5 min | 45 min |

**Key Differences:**
- Active scan found injection vulnerabilities not visible in passive scan
- Active scan identified authorization flaws through exploitation
- Passive scan identified configuration issues

---

## 11. Prioritized Remediation Plan

### P0 - Critical (Fix Immediately)
1. **SQL Injection** - All affected endpoints
   - ETA: 2 days
   - Owner: Backend team
   
2. **Stored XSS** - Article/comment creation
   - ETA: 2 days
   - Owner: Backend + Frontend teams

### P1 - High (Fix Within 1 Week)
1. **IDOR** - Article/comment deletion
2. **Reflected XSS** - Search functionality
3. **Authentication Issues** - Token expiration

### P2 - Medium (Fix Within 2 Weeks)
1. **CSRF Protection**
2. **Rate Limiting**
3. **Mass Assignment**

### P3 - Low (Fix When Possible)
1. **Verbose Errors**
2. **Information Disclosure**

---

## 12. Testing Methodology

**Active Scan Configuration:**
- Spider: Authenticated as zaptest user
- Scan Policy: OWASP Top 10
- Attack Strength: Medium
- Alert Threshold: Medium
- Technologies: Auto-detect

**Manual Testing:**
- Authorization bypass attempts
- Input validation fuzzing
- Session management testing

---

## 13. Recommendations

### Immediate Actions
1. Fix all critical and high vulnerabilities
2. Implement input validation and output encoding
3. Add authorization checks on all endpoints
4. Deploy WAF for immediate protection

### Short-term (1-2 weeks)
1. Implement CSRF protection
2. Add rate limiting
3. Improve error handling
4. Security code review

### Long-term
1. Security training for developers
2. Regular security scans in CI/CD
3. Penetration testing
4. Bug bounty program

---

## 14. Conclusion

The active scan revealed **[X] critical and [Y] high severity vulnerabilities** that require immediate attention. The most concerning findings are:

1. SQL Injection allowing database access
2. XSS vulnerabilities enabling session hijacking
3. Authorization flaws allowing unauthorized access

**Risk Assessment:** Current security posture is **HIGH RISK** and requires immediate remediation before production deployment.

**Next Steps:**
1. Implement fixes for all critical/high issues
2. Re-scan to verify fixes
3. Conduct manual penetration testing
4. Security code review

---

## Appendix A: Complete Vulnerability List

[Paste full list from ZAP]

---

## Appendix B: Screenshots Reference

- `screenshots/zap/active/sql-injection-finding.png`
- `screenshots/zap/active/xss-finding.png`
- `screenshots/zap/active/idor-test.png`
- `screenshots/zap/active/csrf-finding.png`
- [Complete list]

---

## Appendix C: Raw ZAP Reports

- HTML Report: `reports/zap-active-report.html`
- XML Report: `reports/zap-active-report.xml`
- JSON Report: `reports/zap-active-report.json`

---

**Report Generated:** November 30, 2025  
**Tool:** OWASP ZAP 2.14.0  
**Analyst:** [Your Name]  
**Review Date:** [Date]
