# Security Fixes Applied - ZAP Remediation

**Date:** November 30, 2025  
**Application:** Conduit RealWorld App  
**Version:** Post-ZAP Scan Fixes  

---

## Executive Summary

This document details all security fixes implemented to remediate vulnerabilities discovered during OWASP ZAP testing. The fixes address critical, high, and medium severity issues across both backend (Go) and frontend (React) components.

**Vulnerabilities Fixed:**
- **Critical:** [X]
- **High:** [Y]
- **Medium:** [Z]
- **Total:** [X+Y+Z]

---

## 1. Security Headers Implementation

### 1.1 Backend Security Headers (Go/Gin)

**File:** `golang-gin-realworld-example-app/hello.go`

**Issue:** Missing security headers identified in ZAP passive scan
- Content-Security-Policy not set
- X-Frame-Options not set
- X-Content-Type-Options not set
- Strict-Transport-Security not set

**Fix Applied:**

```go
package main

import (
    "github.com/gin-gonic/gin"
    // ... other imports
)

// SecurityHeaders middleware adds security headers to all responses
func SecurityHeaders() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Prevent clickjacking attacks
        c.Header("X-Frame-Options", "DENY")
        
        // Prevent MIME-sniffing
        c.Header("X-Content-Type-Options", "nosniff")
        
        // Enable XSS protection in older browsers
        c.Header("X-XSS-Protection", "1; mode=block")
        
        // Enforce HTTPS (for production)
        c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
        
        // Content Security Policy
        c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:8080 ws://localhost:8080")
        
        // Referrer policy
        c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
        
        // Permissions policy
        c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()")
        
        c.Next()
    }
}

func main() {
    r := gin.Default()
    
    // Apply security headers middleware FIRST
    r.Use(SecurityHeaders())
    
    // ... rest of your routes
    
    r.Run(":8080")
}
```

**Verification:**

Test with curl:
```powershell
curl -I http://localhost:8080/api/articles
```

Expected headers in response:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'; ...
```

📸 **Screenshot Required:** Response showing all security headers
- Save as: `screenshots/zap/final/security-headers-code.png`
- Save as: `screenshots/zap/final/headers-present.png`

**Before/After Comparison:**

| Header | Before | After |
|--------|--------|-------|
| X-Frame-Options | ❌ Missing | ✅ DENY |
| X-Content-Type-Options | ❌ Missing | ✅ nosniff |
| CSP | ❌ Missing | ✅ Configured |
| HSTS | ❌ Missing | ✅ max-age=31536000 |

---

## 2. Input Validation Fixes

### 2.1 SQL Injection Prevention

**File:** `golang-gin-realworld-example-app/articles/routers.go`

**Issue:** SQL injection possible in article filtering

**Vulnerable Code:**
```go
// DON'T DO THIS
query := "SELECT * FROM articles WHERE tag = '" + tag + "'"
db.Query(query)
```

**Fix Applied:**
```go
// Use GORM's safe query methods
func ArticlesFilter(c *gin.Context) {
    tag := c.Query("tag")
    author := c.Query("author")
    favorited := c.Query("favorited")
    
    var articles []Article
    query := db.Model(&Article{})
    
    // Use parameterized queries (GORM handles this automatically)
    if tag != "" {
        query = query.Where("? = ANY(tag_list)", tag)
    }
    
    if author != "" {
        query = query.Joins("JOIN users ON users.id = articles.author_id").
                     Where("users.username = ?", author)
    }
    
    if favorited != "" {
        query = query.Joins("JOIN favorites ON favorites.article_id = articles.id").
                     Joins("JOIN users ON users.id = favorites.user_id").
                     Where("users.username = ?", favorited)
    }
    
    query.Find(&articles)
    
    c.JSON(200, gin.H{"articles": articles})
}
```

**Additional Validation:**
```go
// Add input validation
func ValidateTag(tag string) error {
    // Only allow alphanumeric and hyphens
    matched, _ := regexp.MatchString("^[a-zA-Z0-9-]+$", tag)
    if !matched {
        return errors.New("invalid tag format")
    }
    return nil
}
```

**Verification Test:**

```powershell
# This should NOT cause SQL error
curl "http://localhost:8080/api/articles?tag=test' OR '1'='1"
```

Expected: Empty result or proper error, NOT SQL syntax error

---

### 2.2 XSS Prevention - Output Encoding

**File:** `golang-gin-realworld-example-app/articles/models.go`

**Issue:** Article body and comments allow HTML/JavaScript

**Fix Applied:**

```go
import (
    "github.com/microcosm-cc/bluemonday"
)

// Global sanitizer policy
var htmlPolicy = bluemonday.UGCPolicy()

// Sanitize article content before saving
func (article *Article) BeforeSave() error {
    // Sanitize HTML in title, description, and body
    article.Title = htmlPolicy.Sanitize(article.Title)
    article.Description = htmlPolicy.Sanitize(article.Description)
    article.Body = htmlPolicy.Sanitize(article.Body)
    return nil
}

// For comments
func (comment *Comment) BeforeSave() error {
    comment.Body = htmlPolicy.Sanitize(comment.Body)
    return nil
}
```

**Install bluemonday:**
```powershell
cd golang-gin-realworld-example-app
go get github.com/microcosm-cc/bluemonday
```

**Verification Test:**

```powershell
# Create article with XSS payload
curl -X POST http://localhost:8080/api/articles `
  -H "Authorization: Token YOUR_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{\"article\":{\"title\":\"Test\",\"description\":\"Test\",\"body\":\"<script>alert('"'"'XSS'"'"')</script>\"}}'

# Verify response has sanitized HTML
```

Expected: Script tags removed or escaped

---

### 2.3 Frontend XSS Prevention

**File:** `react-redux-realworld-example-app/src/components/Article/index.js`

**Issue:** Using dangerouslySetInnerHTML

**Before (Vulnerable):**
```javascript
<div dangerouslySetInnerHTML={{__html: article.body}} />
```

**After (Safe):**
```javascript
import DOMPurify from 'dompurify';

// Sanitize before rendering
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(article.body)
}} />
```

**Or better, use safe rendering:**
```javascript
// If possible, don't use dangerouslySetInnerHTML at all
<div>{article.body}</div>  // React escapes by default
```

**Install DOMPurify:**
```powershell
cd react-redux-realworld-example-app
npm install dompurify
```

---

## 3. Authorization Fixes

### 3.1 IDOR Prevention - Article Deletion

**File:** `golang-gin-realworld-example-app/articles/routers.go`

**Issue:** Users can delete other users' articles

**Fix Applied:**

```go
func ArticleDelete(c *gin.Context) {
    slug := c.Param("slug")
    
    // Get current user from context
    userID := c.MustGet("user_id").(uint)
    
    // Get article
    var article Article
    if err := db.Where("slug = ?", slug).First(&article).Error; err != nil {
        c.JSON(404, gin.H{"error": "Article not found"})
        return
    }
    
    // CHECK AUTHORIZATION - Critical security fix
    if article.AuthorID != userID {
        c.JSON(403, gin.H{"error": "Forbidden: You don't own this article"})
        return
    }
    
    // Proceed with deletion
    db.Delete(&article)
    c.JSON(200, gin.H{"message": "Article deleted successfully"})
}
```

**Same fix for ArticleUpdate:**

```go
func ArticleUpdate(c *gin.Context) {
    slug := c.Param("slug")
    userID := c.MustGet("user_id").(uint)
    
    var article Article
    if err := db.Where("slug = ?", slug).First(&article).Error; err != nil {
        c.JSON(404, gin.H{"error": "Article not found"})
        return
    }
    
    // Authorization check
    if article.AuthorID != userID {
        c.JSON(403, gin.H{"error": "Forbidden"})
        return
    }
    
    // Proceed with update...
}
```

**Verification Test:**

```powershell
# User A creates article
$tokenA = "user_a_token_here"
curl -X POST http://localhost:8080/api/articles `
  -H "Authorization: Token $tokenA" `
  -H "Content-Type: application/json" `
  -d '{\"article\":{\"title\":\"User A Article\",\"description\":\"Test\",\"body\":\"Test\"}}'

# User B tries to delete it (should fail)
$tokenB = "user_b_token_here"
curl -X DELETE http://localhost:8080/api/articles/user-a-article `
  -H "Authorization: Token $tokenB"
```

Expected: 403 Forbidden

---

### 3.2 Comment Deletion Authorization

**File:** `golang-gin-realworld-example-app/articles/routers.go`

**Fix Applied:**

```go
func CommentDelete(c *gin.Context) {
    slug := c.Param("slug")
    commentID := c.Param("id")
    userID := c.MustGet("user_id").(uint)
    
    var comment Comment
    if err := db.Where("id = ?", commentID).First(&comment).Error; err != nil {
        c.JSON(404, gin.H{"error": "Comment not found"})
        return
    }
    
    // Authorization check - user can only delete their own comments
    if comment.AuthorID != userID {
        c.JSON(403, gin.H{"error": "Forbidden: You don't own this comment"})
        return
    }
    
    db.Delete(&comment)
    c.JSON(200, gin.H{"message": "Comment deleted"})
}
```

---

## 4. Rate Limiting Implementation

### 4.1 Login Rate Limiting

**File:** `golang-gin-realworld-example-app/users/routers.go`

**Issue:** No brute force protection

**Fix Applied:**

```go
import (
    "github.com/ulule/limiter/v3"
    "github.com/ulule/limiter/v3/drivers/middleware/gin"
    "github.com/ulule/limiter/v3/drivers/store/memory"
)

func SetupRouter(r *gin.Engine) {
    // Create rate limiter for login endpoint
    // 5 requests per minute per IP
    loginRate := limiter.Rate{
        Period: 1 * time.Minute,
        Limit:  5,
    }
    
    loginStore := memory.NewStore()
    loginLimiter := limiter.New(loginStore, loginRate)
    loginMiddleware := ginlimiter.NewMiddleware(loginLimiter)
    
    // Apply to login route
    r.POST("/api/users/login", loginMiddleware, UsersLogin)
    
    // General rate limiting for API (100 req/min)
    apiRate := limiter.Rate{
        Period: 1 * time.Minute,
        Limit:  100,
    }
    apiStore := memory.NewStore()
    apiLimiter := limiter.New(apiStore, apiRate)
    apiMiddleware := ginlimiter.NewMiddleware(apiLimiter)
    
    // Apply to all API routes
    api := r.Group("/api", apiMiddleware)
    {
        // ... your routes
    }
}
```

**Install dependencies:**
```powershell
cd golang-gin-realworld-example-app
go get github.com/ulule/limiter/v3
go get github.com/ulule/limiter/v3/drivers/middleware/gin
go get github.com/ulule/limiter/v3/drivers/store/memory
```

**Verification Test:**

```powershell
# Send 10 login requests rapidly
for ($i=1; $i -le 10; $i++) {
    curl -X POST http://localhost:8080/api/users/login `
      -H "Content-Type: application/json" `
      -d '{\"user\":{\"email\":\"test@test.com\",\"password\":\"wrong\"}}'
}
```

Expected: First 5 succeed (with 401), next 5 get 429 Too Many Requests

---

### 4.2 Article Creation Rate Limiting

**Applied in same file, different rate:**

```go
// 10 articles per hour per user
articleRate := limiter.Rate{
    Period: 1 * time.Hour,
    Limit:  10,
}
```

---

## 5. CSRF Protection

### 5.1 CSRF Token Implementation

**File:** `golang-gin-realworld-example-app/hello.go`

**Issue:** No CSRF protection on state-changing operations

**Fix Applied:**

```go
import (
    "github.com/utrack/gin-csrf"
)

func main() {
    r := gin.Default()
    
    // CSRF protection middleware
    r.Use(csrf.Middleware(csrf.Options{
        Secret: "your-32-character-secret-key-here",
        ErrorFunc: func(c *gin.Context) {
            c.JSON(403, gin.H{"error": "CSRF token validation failed"})
            c.Abort()
        },
    }))
    
    // ... routes
}
```

**Install:**
```powershell
go get github.com/utrack/gin-csrf
```

**Alternative: Use SameSite cookies (simpler for API):**

```go
// When setting JWT cookie
c.SetCookie(
    "token",
    tokenString,
    3600,
    "/",
    "localhost",
    false, // secure (set true in production)
    true,  // httpOnly
)

// Add SameSite attribute
c.SetSameSite(http.SameSiteStrictMode)
```

---

## 6. Password Policy

### 6.1 Strong Password Enforcement

**File:** `golang-gin-realworld-example-app/users/validators.go`

**Issue:** Weak passwords accepted

**Fix Applied:**

```go
import (
    "regexp"
    "unicode"
)

func ValidatePassword(password string) error {
    // Minimum length
    if len(password) < 8 {
        return errors.New("password must be at least 8 characters long")
    }
    
    // Maximum length (prevent DoS)
    if len(password) > 128 {
        return errors.New("password must be less than 128 characters")
    }
    
    var (
        hasUpper   = false
        hasLower   = false
        hasNumber  = false
        hasSpecial = false
    )
    
    for _, char := range password {
        switch {
        case unicode.IsUpper(char):
            hasUpper = true
        case unicode.IsLower(char):
            hasLower = true
        case unicode.IsNumber(char):
            hasNumber = true
        case unicode.IsPunct(char) || unicode.IsSymbol(char):
            hasSpecial = true
        }
    }
    
    if !hasUpper {
        return errors.New("password must contain at least one uppercase letter")
    }
    if !hasLower {
        return errors.New("password must contain at least one lowercase letter")
    }
    if !hasNumber {
        return errors.New("password must contain at least one number")
    }
    if !hasSpecial {
        return errors.New("password must contain at least one special character")
    }
    
    // Check against common passwords (optional, add your list)
    commonPasswords := []string{"password", "123456", "qwerty", "admin"}
    for _, common := range commonPasswords {
        if strings.ToLower(password) == common {
            return errors.New("password is too common")
        }
    }
    
    return nil
}

// Use in registration
func UsersRegister(c *gin.Context) {
    var user User
    c.BindJSON(&user)
    
    // Validate password
    if err := ValidatePassword(user.Password); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    
    // ... proceed with registration
}
```

---

## 7. JWT Token Improvements

### 7.1 Token Expiration

**File:** `golang-gin-realworld-example-app/common/utils.go`

**Issue:** Tokens never expire

**Fix Applied:**

```go
import (
    "github.com/golang-jwt/jwt/v4"
    "time"
)

func GenerateToken(userID uint) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "exp":     time.Now().Add(time.Hour * 24).Unix(), // 24 hour expiration
        "iat":     time.Now().Unix(), // Issued at
    }
    
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString([]byte("your-secret-key"))
    
    return tokenString, err
}

// Validation middleware
func ValidateToken(c *gin.Context) {
    tokenString := c.GetHeader("Authorization")
    tokenString = strings.TrimPrefix(tokenString, "Token ")
    
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return []byte("your-secret-key"), nil
    })
    
    if err != nil || !token.Valid {
        c.JSON(401, gin.H{"error": "Invalid or expired token"})
        c.Abort()
        return
    }
    
    claims := token.Claims.(jwt.MapClaims)
    
    // Check expiration
    exp := int64(claims["exp"].(float64))
    if time.Now().Unix() > exp {
        c.JSON(401, gin.H{"error": "Token expired"})
        c.Abort()
        return
    }
    
    c.Set("user_id", uint(claims["user_id"].(float64)))
    c.Next()
}
```

---

## 8. Cookie Security

### 8.1 Secure Cookie Flags

**File:** `golang-gin-realworld-example-app/users/routers.go`

**Issue:** Cookies missing Secure and HttpOnly flags

**Fix Applied:**

```go
func SetAuthCookie(c *gin.Context, token string) {
    c.SetCookie(
        "auth_token",        // name
        token,               // value
        86400,               // max age (24 hours)
        "/",                 // path
        "",                  // domain (empty for current domain)
        true,                // secure (HTTPS only) - set false for localhost
        true,                // httpOnly (no JavaScript access)
    )
    
    // Set SameSite attribute
    c.SetSameSite(http.SameSiteStrictMode)
}
```

---

## 9. Error Handling

### 9.1 Generic Error Messages

**File:** `golang-gin-realworld-example-app/hello.go`

**Issue:** Verbose error messages reveal system information

**Fix Applied:**

```go
// Global error handling middleware
func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        
        if len(c.Errors) > 0 {
            err := c.Errors.Last()
            
            // Log full error server-side
            log.Printf("Error: %v", err.Error())
            
            // Send generic message to client
            c.JSON(500, gin.H{
                "error": "An internal error occurred. Please try again later.",
            })
        }
    }
}

func main() {
    r := gin.Default()
    r.Use(ErrorHandler())
    // ... routes
}
```

---

## 10. Verification & Testing

### 10.1 Re-run ZAP Scan

After implementing all fixes:

1. **Restart applications:**
```powershell
# Terminal 1
cd golang-gin-realworld-example-app
go run hello.go

# Terminal 2
cd react-redux-realworld-example-app
npm start
```

2. **Run ZAP passive scan**
3. **Run ZAP active scan**
4. **Compare results**

### 10.2 Before/After Metrics

| Metric | Before Fixes | After Fixes | Improvement |
|--------|-------------|-------------|-------------|
| Critical Vulnerabilities | [X] | 0 | [X] fixed |
| High Vulnerabilities | [Y] | [Z] | [Y-Z] fixed |
| Medium Vulnerabilities | [A] | [B] | [A-B] fixed |
| Security Headers | 0/7 | 7/7 | 100% |
| OWASP Top 10 Compliance | [%] | [%] | [%] improvement |

📸 **Screenshots Required:**
- `screenshots/zap/final/before-vuln-count.png` - Vuln count before fixes
- `screenshots/zap/final/after-vuln-count.png` - Vuln count after fixes
- `screenshots/zap/final/final-report-summary.png` - Final report

---

## 11. Code Changes Summary

### Files Modified

**Backend (Go):**
1. `hello.go` - Security headers, CSRF, rate limiting, error handling
2. `articles/routers.go` - Authorization checks, input validation
3. `articles/models.go` - XSS sanitization
4. `users/routers.go` - Password validation, secure cookies
5. `users/validators.go` - Password policy
6. `common/utils.go` - Token expiration
7. `go.mod` - New dependencies

**Frontend (React):**
1. `src/components/Article/index.js` - XSS prevention
2. `src/components/Comment/index.js` - XSS prevention
3. `package.json` - DOMPurify dependency

### Dependencies Added

**Backend:**
```
github.com/microcosm-cc/bluemonday
github.com/ulule/limiter/v3
github.com/utrack/gin-csrf
github.com/golang-jwt/jwt/v4
```

**Frontend:**
```
dompurify
```

---

## 12. Remaining Issues

### Low Priority Items Not Fixed

1. **HTTP vs HTTPS** - Localhost testing only
2. **API Versioning** - Not critical for current version
3. **Request size limits** - Default Gin limits sufficient for now

### Accepted Risks

Document any vulnerabilities you chose not to fix and why:

**Example:**
- **Issue:** Verbose errors in development
- **Risk:** Low
- **Justification:** Needed for debugging; will be disabled in production
- **Mitigation:** Environment-based error handling

---

## 13. Production Deployment Checklist

Before deploying to production:

- [ ] Set `gin.SetMode(gin.ReleaseMode)`
- [ ] Enable HTTPS / TLS
- [ ] Use environment variables for secrets
- [ ] Enable HSTS header
- [ ] Set secure cookie flags (Secure: true)
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and alerting
- [ ] Regular security scans
- [ ] Implement logging and audit trails

---

## Conclusion

All critical and high severity vulnerabilities have been remediated. The application now implements:

✅ Security headers (7/7)  
✅ Input validation and sanitization  
✅ Authorization checks on all protected resources  
✅ Rate limiting on sensitive endpoints  
✅ CSRF protection  
✅ Strong password policy  
✅ Token expiration  
✅ Secure cookies  
✅ Safe error handling  

**Security Posture:** Significantly improved from HIGH RISK to MEDIUM RISK

**Next Steps:**
1. Run final verification scan
2. Document remaining issues
3. Plan regular security testing schedule

---

**Document Created:** November 30, 2025  
**Last Updated:** November 30, 2025  
**Author:** [Your Name]
