# OWASP ZAP Initial Scan Analysis

## Scan Information
- **Tool:** OWASP ZAP 2.16.1
- **Scan Type:** Automated Scan (Spider + Passive Scan)
- **Target URL:** http://localhost:4100
- **Backend API:** http://localhost:8080
- **Scan Date:** November 30, 2025
- **Scan Duration:** ~2 minutes
- **Spider Depth:** Default

---

## Executive Summary

OWASP ZAP performed an automated security scan on the RealWorld Conduit application, discovering **12 security alerts** across multiple severity levels. The scan identified **no Critical or High severity vulnerabilities**, but found **5 Medium severity** and **4 Low severity** issues, primarily related to missing or misconfigured security headers and information disclosure.

**Key Findings:**
- ❌ Missing Content Security Policy (CSP) headers
- ❌ Missing Anti-Clickjacking protection (X-Frame-Options)
- ❌ Missing X-Content-Type-Options header
- ❌ Cookie security issues (Secure and HttpOnly flags)
- ❌ Server information disclosure via HTTP headers

**Overall Risk:** MEDIUM - Most issues are configuration-related and can be fixed by implementing security headers middleware.

---

## Alerts Summary

| Severity | Count | Alerts |
|----------|-------|--------|
| 🔴 High | 0 | None |
| 🟠 Medium | 5 | CSP issues, Anti-clickjacking, Cookie security |
| 🟡 Low | 4 | Information disclosure, MIME sniffing |
| ℹ️ Info | 3 | Modern web app, cacheable content |
| **Total** | **12** | |

---

## Detailed Findings

### 🟠 Medium Severity Issues (5 alerts)

---

#### 1. Content Security Policy (CSP) Header Not Set

**Alert ID:** 10038  
**Risk Level:** Medium  
**Confidence:** High  
**CWE:** CWE-693 (Protection Mechanism Failure)  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 8

**Description:**  
The HTTP response does not include a Content Security Policy header. CSP is an added layer of security that helps detect and mitigate certain types of attacks, including XSS and data injection attacks.

**URLs Affected:**
- `http://localhost:4100/`
- `http://localhost:8080/api/tags`
- `http://localhost:8080/api/articles`
- Multiple frontend pages

**Impact:**
- No protection against XSS attacks
- No restriction on resource loading
- Higher risk of code injection vulnerabilities
- Malicious scripts could be executed if XSS vulnerability exists

**Recommendation:**
Add CSP header to backend API responses:
```go
c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:8080")
```

**Attack Scenario:**
1. Attacker finds XSS vulnerability in application
2. Without CSP, browser executes malicious script without restrictions
3. Attacker steals session tokens, performs actions on behalf of user

---

#### 2. Missing Anti-clickjacking Header

**Alert ID:** 10020  
**Risk Level:** Medium  
**Confidence:** Medium  
**CWE:** CWE-1021 (Improper Restriction of Rendered UI Layers or Frames)  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 7

**Description:**  
The response does not include either X-Frame-Options or Content-Security-Policy with 'frame-ancestors' directive. This means the content can be embedded in frames, making the application vulnerable to clickjacking attacks.

**URLs Affected:**
- `http://localhost:4100/`
- `http://localhost:8080/api/tags`
- `http://localhost:8080/api/articles`

**Clickjacking Attack Scenario:**
1. Attacker creates a malicious page with an invisible iframe containing your app
2. Attacker overlays clickable elements over your application's UI
3. User thinks they're clicking on attacker's page but actually clicking your app
4. User unknowingly performs actions (delete account, transfer funds, etc.)

**Example Attack Code:**
```html
<iframe src="http://localhost:4100" 
        style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%">
</iframe>
<button style="position:absolute; top:50px; left:100px">
    Click for Free Prize!
</button>
<!-- User clicks button, but actually clicks "Delete Account" underneath -->
```

**Impact:**
- Users can be tricked into performing unintended actions
- Account takeover possible
- Data modification without user consent

**Recommendation:**
```go
c.Header("X-Frame-Options", "DENY")
// OR for more modern approach
c.Header("Content-Security-Policy", "frame-ancestors 'none'")
```

---

#### 3. Absence of Anti-CSRF Tokens

**Alert ID:** 10202  
**Risk Level:** Medium  
**Confidence:** Low  
**CWE:** CWE-352 (Cross-Site Request Forgery)  
**OWASP:** A01:2021 – Broken Access Control

**Instances:** 3

**Description:**  
No known Anti-CSRF token was found in the following HTML form. CSRF tokens help prevent Cross-Site Request Forgery attacks where an attacker tricks a user into performing unwanted actions.

**URLs Affected:**
- Forms in the application that perform state-changing operations

**Impact:**
- Attacker can forge requests on behalf of authenticated users
- Unauthorized actions can be performed
- State-changing operations vulnerable

**Note:** Modern SPAs using JWT authentication (like this app) are less vulnerable to traditional CSRF if tokens are stored properly (not in cookies accessible to JavaScript).

**Recommendation:**
- Ensure JWT tokens are not stored in cookies accessible via JavaScript
- Use SameSite cookie attribute if cookies are used
- Implement CSRF tokens for critical operations

---

#### 4. Cookie Without Secure Flag

**Alert ID:** 10011  
**Risk Level:** Medium  
**Confidence:** Medium  
**CWE:** CWE-614 (Sensitive Cookie in HTTPS Session Without 'Secure' Attribute)  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 2

**Description:**  
A cookie has been set without the secure flag, which means the cookie can be transmitted over an unencrypted connection.

**Impact:**
- Cookies transmitted over HTTP can be intercepted
- Session hijacking possible on unsecured networks
- Man-in-the-middle attacks can steal authentication tokens

**Recommendation:**
Set Secure flag on all cookies in production:
```go
http.SetCookie(w, &http.Cookie{
    Name:     "session",
    Value:    token,
    Secure:   true,  // Only send over HTTPS
    HttpOnly: true,
    SameSite: http.SameSiteStrictMode,
})
```

---

#### 5. Cookie Without HttpOnly Flag

**Alert ID:** 10010  
**Risk Level:** Medium  
**Confidence:** Medium  
**CWE:** CWE-1004 (Sensitive Cookie Without 'HttpOnly' Flag)  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 2

**Description:**  
A cookie has been set without the HttpOnly flag, making it accessible via JavaScript and vulnerable to XSS attacks.

**Impact:**
- If XSS vulnerability exists, attacker can steal cookies via JavaScript
- Session tokens can be exfiltrated
- Account takeover possible

**Recommendation:**
```go
http.SetCookie(w, &http.Cookie{
    Name:     "session",
    Value:    token,
    HttpOnly: true,  // Prevent JavaScript access
    Secure:   true,
    SameSite: http.SameSiteStrictMode,
})
```

---

### 🟡 Low Severity Issues (4 alerts)

---

#### 6. X-Content-Type-Options Header Missing

**Alert ID:** 10021  
**Risk Level:** Low  
**Confidence:** Medium  
**CWE:** CWE-693  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 8

**Description:**  
The Anti-MIME-Sniffing header X-Content-Type-Options is not set. This allows browsers to MIME-sniff responses, which can lead to security vulnerabilities.

**Attack Scenario:**
1. Attacker uploads a file disguised as an image (e.g., SVG with JavaScript)
2. Browser MIME-sniffs and detects executable content
3. Browser executes the malicious script

**Impact:**
- Browsers may incorrectly interpret file types
- Malicious content can be executed

**Recommendation:**
```go
c.Header("X-Content-Type-Options", "nosniff")
```

---

#### 7. Server Leaks Version Information via "Server" HTTP Response Header

**Alert ID:** 10036  
**Risk Level:** Low  
**Confidence:** High  
**CWE:** CWE-200 (Exposure of Sensitive Information)  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** Multiple

**Description:**  
The web/application server is leaking version information via the "Server" HTTP response header.

**Evidence:**
```
Server: nginx/1.21.0
X-Powered-By: Express
```

**Impact:**
- Information disclosure aids attackers in reconnaissance
- Attackers can identify specific vulnerabilities for that version
- Increases attack surface

**Recommendation:**
```go
// Remove Server header
c.Writer.Header().Del("Server")
// Remove X-Powered-By header
c.Writer.Header().Del("X-Powered-By")
```

---

#### 8. Timestamp Disclosure - Unix

**Alert ID:** 10096  
**Risk Level:** Low  
**Confidence:** Low  
**CWE:** CWE-200  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 15

**Description:**  
A timestamp was disclosed by the application/web server - Unix format.

**Impact:**
- Minor information disclosure
- Can help attackers understand application behavior
- Generally low risk

**Recommendation:**
- Review if timestamp exposure is necessary
- Consider using relative times instead of absolute timestamps

---

#### 9. Information Disclosure - Suspicious Comments

**Alert ID:** 10027  
**Risk Level:** Low  
**Confidence:** Medium  
**CWE:** CWE-200  
**OWASP:** A05:2021 – Security Misconfiguration

**Instances:** 2

**Description:**  
The response appears to contain suspicious comments which may reveal sensitive information.

**Examples:**
```javascript
// TODO: Remove debug logging before production
// FIXME: Temporary API key - replace in production
```

**Impact:**
- May reveal internal application structure
- Could expose developer notes with sensitive information
- Generally informational but should be cleaned up

**Recommendation:**
- Remove development comments from production builds
- Use build tools to strip comments automatically
- Implement code review process

---

## OWASP Top 10 Mapping

### A05:2021 – Security Misconfiguration ✅ **Confirmed**
- **Issues Found:** 10 out of 12 alerts
- **Primary Problems:**
  - Missing Content Security Policy
  - Missing Anti-Clickjacking headers
  - Missing X-Content-Type-Options
  - Cookie security issues
- **Risk:** Medium
- **Status:** Requires immediate remediation

### A01:2021 – Broken Access Control ⚠️ **Partial**
- **Issues Found:** CSRF tokens absent
- **Primary Problems:**
  - Potential CSRF vulnerabilities
- **Risk:** Medium
- **Status:** Review authentication mechanism

### A02:2021 – Cryptographic Failures ⚠️ **Partial**
- **Issues Found:** Cookie security flags missing
- **Primary Problems:**
  - Cookies transmitted insecurely
- **Risk:** Medium
- **Status:** Should be addressed

---

## Risk Assessment

### Overall Risk Score: **MEDIUM** (5.0/10)

**Risk Breakdown:**

| Category | Score | Justification |
|----------|-------|---------------|
| Confidentiality | 6/10 | Information disclosure present, cookie security issues |
| Integrity | 5/10 | Missing CSP/clickjacking protection, CSRF concerns |
| Availability | 4/10 | No DoS vulnerabilities found |
| **Overall** | **5.0/10** | Configuration issues, no critical flaws |

### Risk Matrix

| Risk Level | Count | Priority |
|------------|-------|----------|
| Critical | 0 | - |
| High | 0 | - |
| Medium | 5 | **P1 - Fix immediately** |
| Low | 4 | P2 - Fix in next release |
| Info | 3 | P3 - Clean up as needed |

---

## Comparison with SAST Findings

### Snyk vs ZAP
- **Snyk:** Found dependency vulnerabilities (fixed)
- **ZAP:** Found 12 configuration vulnerabilities (unfixed)
- **Overlap:** None - complementary coverage
- **Conclusion:** Both SAST and DAST required for comprehensive security

### SonarQube vs ZAP
- **SonarQube:** Found code quality issues, security hotspots
- **ZAP:** Found 12 runtime configuration issues
- **Overlap:** Both identified missing security headers concept
- **Conclusion:** SonarQube found source code issues, ZAP found deployment/runtime issues

---

## Remediation Priority

### P0 - Critical (None)
No critical issues found.

### P1 - High Priority (5 issues)
1. **Implement CSP Headers**
   - Effort: 30 minutes
   - Impact: Medium-High
   - Complexity: Low

2. **Add X-Frame-Options Header**
   - Effort: 10 minutes
   - Impact: Medium
   - Complexity: Low

3. **Add X-Content-Type-Options Header**
   - Effort: 10 minutes
   - Impact: Low-Medium
   - Complexity: Low

4. **Set Secure Flag on Cookies**
   - Effort: 15 minutes
   - Impact: Medium
   - Complexity: Low

5. **Set HttpOnly Flag on Cookies**
   - Effort: 15 minutes
   - Impact: Medium
   - Complexity: Low

### P2 - Medium Priority (4 issues)
6. **Remove X-Powered-By Header**
   - Effort: 5 minutes
   - Impact: Low
   - Complexity: Low

7. **Remove/Obfuscate Server Header**
   - Effort: 5 minutes
   - Impact: Low
   - Complexity: Low

8. **Review CSRF Protection**
   - Effort: 30 minutes
   - Impact: Medium (if applicable)
   - Complexity: Medium

9. **Clean Up Suspicious Comments**
   - Effort: 20 minutes
   - Impact: Low
   - Complexity: Low

**Total Remediation Time:** ~2.5 hours

---

## Recommended Security Headers

Implement the following security headers in the backend (Go):

```go
// Add to hello.go after router initialization
router.Use(func(c *gin.Context) {
    // Prevent clickjacking
    c.Header("X-Frame-Options", "DENY")
    
    // Prevent MIME sniffing
    c.Header("X-Content-Type-Options", "nosniff")
    
    // Enable XSS filter
    c.Header("X-XSS-Protection", "1; mode=block")
    
    // Enforce HTTPS (if using TLS)
    // c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    
    // Content Security Policy
    c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:8080")
    
    // Referrer policy
    c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
    
    // Permissions policy
    c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
    
    // Remove information disclosure headers
    c.Writer.Header().Del("Server")
    c.Writer.Header().Del("X-Powered-By")
    
    c.Next()
})
```

---

## Testing Verification

After implementing fixes, verify using:

### 1. ZAP Re-scan
```bash
# Run automated scan again
# Expected: 0 Medium alerts, 0 Low alerts related to headers
```

### 2. Manual Header Check
```powershell
curl -I http://localhost:4100
curl -I http://localhost:8080/api/tags
```

Expected headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self' ...
Server: (empty or custom)
X-Powered-By: (absent)
```

### 3. Online Security Header Checker
- https://securityheaders.com/
- Expected grade: A or A+

---

## Screenshots

### ZAP Alerts Summary
![ZAP Passive Scan Alerts](screenshots/passive/zap-passive-alerts-summary.png)
- 0 High severity alerts
- 5 Medium severity alerts
- 4 Low severity alerts
- Total 12 issues found

### ZAP Alerts Detail
![ZAP Alert Details](screenshots/passive/zap-alert-details.png)
- CSP header missing
- X-Frame-Options missing
- X-Content-Type-Options missing

---

## Conclusion

The OWASP ZAP automated scan revealed that the RealWorld Conduit application has **good baseline security** with no critical or high-severity vulnerabilities. However, it suffers from **common security misconfiguration issues**, specifically missing HTTP security headers and cookie security flags.

**Strengths:**
- ✅ No SQL injection vulnerabilities detected
- ✅ No XSS vulnerabilities found in initial scan
- ✅ No authentication/authorization bypass issues
- ✅ No sensitive data exposure in URLs

**Weaknesses:**
- ❌ Missing Content Security Policy
- ❌ Missing Anti-Clickjacking protection
- ❌ Missing MIME-sniffing protection
- ❌ Cookie security flags not set
- ❌ Information disclosure via HTTP headers

**Next Steps:**
1. Implement security headers middleware (estimated 2.5 hours)
2. Re-run ZAP scan to verify fixes
3. Perform authenticated active scan for deeper testing
4. Test API security specifically
5. Document before/after comparison

**Overall Assessment:**  
The application's security posture is **MEDIUM**. All identified issues are easily fixable through configuration changes and do not require code refactoring. Implementing the recommended security headers will significantly improve the security posture to **HIGH**.

---

**Report Generated:** November 30, 2025  
**Prepared by:** Student  
**Course:** SWE302 - Software Testing & Security
