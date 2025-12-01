# OWASP ZAP Implementation Guide - Complete Walkthrough

## Overview
This guide provides step-by-step instructions for completing the DAST (Dynamic Application Security Testing) portion of Assignment 2 using OWASP ZAP. Follow each step carefully and take screenshots as indicated.

---

## Prerequisites Checklist
- [ ] Backend application code ready
- [ ] Frontend application code ready
- [ ] Both applications can run successfully
- [ ] OWASP ZAP installed

---

## Phase 1: Setup OWASP ZAP

### Step 1.1: Download and Install OWASP ZAP

1. **Download ZAP:**
   - Visit: https://www.zaproxy.org/download/
   - Download "ZAP 2.14.0 Installer" for Windows
   - Choose the Windows (64-bit) installer

2. **Install ZAP:**
   - Run the installer
   - Accept default installation path
   - Complete installation

3. **Launch ZAP:**
   - Open OWASP ZAP
   - On first launch, choose "Persist Session" option
   - Click "Start"

📸 **SCREENSHOT 1:** Take screenshot of ZAP welcome screen after successful launch
   - Save as: `screenshots/zap/setup/zap-welcome-screen.png`

---

## Phase 2: Prepare Applications for Testing

### Step 2.1: Start Backend Application

Open PowerShell Terminal 1:
```powershell
cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app
go run hello.go
```

📸 **SCREENSHOT 2:** Backend running successfully
   - Terminal showing "Listening on :8080" or similar
   - Save as: `screenshots/zap/setup/backend-running.png`

**Verify backend:**
- Open browser: http://localhost:8080/api/health (or appropriate endpoint)
- Should see API response

### Step 2.2: Start Frontend Application

Open PowerShell Terminal 2:
```powershell
cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\react-redux-realworld-example-app
npm start
```

📸 **SCREENSHOT 3:** Frontend running successfully
   - Terminal showing "Compiled successfully" and "webpack compiled"
   - Save as: `screenshots/zap/setup/frontend-running.png`

**Verify frontend:**
- Browser should automatically open to http://localhost:4100
- You should see the Conduit homepage

📸 **SCREENSHOT 4:** Conduit homepage loaded
   - Save as: `screenshots/zap/setup/conduit-homepage.png`

### Step 2.3: Create Test User Account

1. **Register a new account:**
   - Navigate to: http://localhost:4100/#/register
   - Username: `zaptest`
   - Email: `zaptest@security.test`
   - Password: `ZapTest123!@#`
   - Click "Sign up"

📸 **SCREENSHOT 5:** Successful registration
   - Save as: `screenshots/zap/setup/test-user-registered.png`

2. **Create sample content:**
   - Create 2-3 test articles
   - Add some comments
   - This gives ZAP more content to test

📸 **SCREENSHOT 6:** Test articles created
   - Save as: `screenshots/zap/setup/test-articles-created.png`

3. **Document credentials:**
   - Email: `zaptest@security.test`
   - Password: `ZapTest123!@#`
   - Keep these for ZAP authentication setup

---

## Phase 3: Passive Scan

### Step 3.1: Configure ZAP for Passive Scanning

1. **Set Target in ZAP:**
   - In ZAP, look for the "Quick Start" tab
   - Select "Automated Scan"
   - URL to attack: `http://localhost:4100`
   - Leave "Use traditional spider" checked
   - Click "Attack"

📸 **SCREENSHOT 7:** ZAP Quick Start configuration
   - Save as: `screenshots/zap/passive/zap-quickstart-config.png`

### Step 3.2: Run Passive Scan

The scan will start automatically. ZAP will:
- Spider the application (discover all pages)
- Passively analyze HTTP traffic
- Identify security issues without attacking

**Wait for spider to complete** (usually 2-5 minutes)

📸 **SCREENSHOT 8:** Spider progress/completion
   - Save as: `screenshots/zap/passive/spider-progress.png`

### Step 3.3: Review Passive Scan Results

1. **View Alerts:**
   - Click on "Alerts" tab (bottom panel)
   - Expand to see all findings

📸 **SCREENSHOT 9:** Alerts overview showing all findings
   - Save as: `screenshots/zap/passive/alerts-overview.png`

2. **High/Medium Alerts:**
   - Click on each High/Medium severity alert
   - Review details in right panel

📸 **SCREENSHOT 10:** Example of a High severity finding with details
   - Save as: `screenshots/zap/passive/high-severity-example.png`

3. **Common findings to look for:**
   - Missing Anti-clickjacking Header
   - Content Security Policy (CSP) Header Not Set
   - Missing Anti-CSRF Tokens
   - X-Content-Type-Options Header Missing
   - Cookie Without Secure Flag
   - Cookie Without HttpOnly Flag

📸 **SCREENSHOT 11:** Each major category of finding (take 3-4 screenshots)
   - Save as: `screenshots/zap/passive/csp-missing.png`
   - Save as: `screenshots/zap/passive/csrf-tokens.png`
   - Save as: `screenshots/zap/passive/cookie-security.png`

### Step 3.4: Export Passive Scan Report

1. **Generate HTML Report:**
   - Menu: Report → Generate HTML Report
   - Choose location: `Assignment_02/reports/zap-passive-report.html`
   - Click "Save"

📸 **SCREENSHOT 12:** Report generation dialog
   - Save as: `screenshots/zap/passive/report-generation.png`

2. **Open the HTML report** to verify it contains all findings

📸 **SCREENSHOT 13:** Generated HTML report open in browser
   - Save as: `screenshots/zap/passive/html-report-view.png`

### Step 3.5: Document Passive Scan Findings

Create detailed documentation in the analysis file (this will be done after this guide).

---

## Phase 4: Active Scan (Authenticated)

### Step 4.1: Configure Authentication Context

This is the most complex part. Follow carefully.

#### 4.1.1: Create Context

1. **Open Context Menu:**
   - Top menu: Analyze → Show All → Sites
   - Right-click on "http://localhost:4100" in Sites tree
   - Select "Include in Context" → "New Context"
   - Name: `Conduit Authenticated`

📸 **SCREENSHOT 14:** Context creation dialog
   - Save as: `screenshots/zap/active/context-creation.png`

2. **Configure Context URLs:**
   - In Session Properties window, go to "Context" section
   - Ensure these patterns are included:
     - `http://localhost:4100.*`
     - `http://localhost:8080/api.*`

📸 **SCREENSHOT 15:** Context URL patterns
   - Save as: `screenshots/zap/active/context-urls.png`

#### 4.1.2: Configure Authentication Method

1. **Set Authentication:**
   - In Session Properties, click "Authentication" tab
   - Click on "Conduit Authenticated" context
   - Authentication Method: Select "JSON-based authentication"

2. **Configure Login Request:**
   - Login URL: `http://localhost:8080/api/users/login`
   - URL Content-Type: `application/json`
   - POST Data:
     ```json
     {"user":{"email":"zaptest@security.test","password":"ZapTest123!@#"}}
     ```
   - Username parameter: Leave empty (we're using JSON)
   - Password parameter: Leave empty

📸 **SCREENSHOT 16:** Authentication method configuration
   - Save as: `screenshots/zap/active/auth-method-config.png`

3. **Configure Login Indicators:**
   - Logged in indicator (regex): `"token":\s*"[^"]+"`
   - OR simpler: `user.*token`
   - This regex looks for the token in the response

📸 **SCREENSHOT 17:** Login indicators
   - Save as: `screenshots/zap/active/login-indicators.png`

#### 4.1.3: Test Authentication

1. **Manual Login Test:**
   - In ZAP, go to "Request" tab
   - Manual Request Editor → "Open/Resend with Request Editor"
   - Method: POST
   - URL: `http://localhost:8080/api/users/login`
   - Header: `Content-Type: application/json`
   - Body:
     ```json
     {"user":{"email":"zaptest@security.test","password":"ZapTest123!@#"}}
     ```
   - Send request
   - Check response for token

📸 **SCREENSHOT 18:** Successful login response showing token
   - Save as: `screenshots/zap/active/login-test-response.png`

#### 4.1.4: Configure User

1. **Add User:**
   - Session Properties → "Users" tab
   - Select "Conduit Authenticated" context
   - Click "Add"
   - User Name: `zaptest`
   - Click "Add" then "OK"

📸 **SCREENSHOT 19:** User configuration
   - Save as: `screenshots/zap/active/user-config.png`

2. **Configure Session Management:**
   - Session Properties → "Session Management" tab
   - Select "HTTP Authentication"
   - This will use the token from login response

📸 **SCREENSHOT 20:** Session management configuration
   - Save as: `screenshots/zap/active/session-management.png`

### Step 4.2: Configure Active Scanner

1. **Set Scan Policy:**
   - Menu: Analyze → Scan Policy Manager
   - Select "Default Policy" or create new
   - Enable all OWASP Top 10 categories:
     - SQL Injection
     - Cross Site Scripting (XSS)
     - Security Misconfiguration
     - Broken Authentication
     - Etc.

📸 **SCREENSHOT 21:** Scan policy configuration
   - Save as: `screenshots/zap/active/scan-policy.png`

2. **Configure Scan Intensity:**
   - Set threshold: Medium
   - Set strength: Medium
   - (Can increase later if needed)

### Step 4.3: Run Active Scan

1. **Start Spider with Authentication:**
   - Right-click on "http://localhost:4100" in Sites
   - Attack → Spider as User
   - Select "zaptest" user
   - Click "Start Scan"

📸 **SCREENSHOT 22:** Spider as user dialog
   - Save as: `screenshots/zap/active/spider-as-user.png`

2. **Wait for Spider to Complete:**
   - Monitor progress in Spider tab
   - Should discover more authenticated pages

📸 **SCREENSHOT 23:** Spider completion with authenticated pages
   - Save as: `screenshots/zap/active/spider-authenticated-complete.png`

3. **Start Active Scan:**
   - Right-click on "http://localhost:4100" in Sites
   - Attack → Active Scan
   - Select "Conduit Authenticated" context
   - Select "zaptest" user
   - Policy: Choose your configured policy
   - Click "Start Scan"

📸 **SCREENSHOT 24:** Active scan start dialog
   - Save as: `screenshots/zap/active/active-scan-start.png`

⚠️ **IMPORTANT:** Active scan will take 30-60 minutes. Let it complete.

📸 **SCREENSHOT 25:** Active scan in progress
   - Save as: `screenshots/zap/active/active-scan-progress.png`

### Step 4.4: Review Active Scan Results

1. **Once scan completes**, review all alerts:

📸 **SCREENSHOT 26:** Active scan completion status
   - Save as: `screenshots/zap/active/active-scan-complete.png`

2. **Review High/Critical Alerts:**
   - Click each alert to see details
   - Note the request/response that triggered it
   - Document exploit evidence

📸 **SCREENSHOT 27-30:** Examples of each vulnerability type found:
   - SQL Injection (if found): `screenshots/zap/active/sql-injection-finding.png`
   - XSS (if found): `screenshots/zap/active/xss-finding.png`
   - CSRF (if found): `screenshots/zap/active/csrf-finding.png`
   - Auth issues (if found): `screenshots/zap/active/auth-bypass-finding.png`

3. **Review Alert Details:**
   - For EACH high/critical alert, capture:
     - Alert name and description
     - CWE/OWASP reference
     - Request that triggered it
     - Response received
     - Recommended solution

📸 **SCREENSHOT 31:** Detailed view of a critical vulnerability showing request/response
   - Save as: `screenshots/zap/active/critical-vuln-detail.png`

### Step 4.5: Export Active Scan Reports

1. **HTML Report:**
   - Report → Generate HTML Report
   - Save as: `Assignment_02/reports/zap-active-report.html`

2. **XML Report:**
   - Report → Export Report → XML
   - Save as: `Assignment_02/reports/zap-active-report.xml`

3. **JSON Report:**
   - Report → Export Report → JSON
   - Save as: `Assignment_02/reports/zap-active-report.json`

📸 **SCREENSHOT 32:** All three report files created
   - Save as: `screenshots/zap/active/reports-exported.png`

---

## Phase 5: API Security Testing

### Step 5.1: Test API Endpoints Manually

Use ZAP's Manual Request Editor or the Sites tree to test each endpoint.

#### 5.1.1: Test Authentication Bypass

1. **Test accessing protected endpoint without token:**
   - Manual Request: GET `http://localhost:8080/api/user`
   - No Authorization header
   - Expected: 401/403 error
   - Actual: Document the response

📸 **SCREENSHOT 33:** Attempt to access protected endpoint without auth
   - Save as: `screenshots/zap/api/auth-bypass-test.png`

2. **Test with invalid token:**
   - Manual Request: GET `http://localhost:8080/api/user`
   - Header: `Authorization: Token invalidtoken123`
   - Document response

📸 **SCREENSHOT 34:** Invalid token response
   - Save as: `screenshots/zap/api/invalid-token-test.png`

#### 5.1.2: Test Authorization Flaws

1. **Create second test user:**
   - Register: `zaptest2@security.test` / `ZapTest456!@#`
   - Create an article with this user
   - Note the article slug

2. **Test modifying another user's article:**
   - Login as first user (get token)
   - Try to PUT/DELETE second user's article
   - Manual Request: `PUT http://localhost:8080/api/articles/{slug-from-user2}`
   - Header: `Authorization: Token {user1-token}`
   - Document if it succeeds (authorization flaw) or fails (correct)

📸 **SCREENSHOT 35:** Authorization test result
   - Save as: `screenshots/zap/api/authorization-test.png`

#### 5.1.3: Test Input Validation

1. **Test SQL Injection in article creation:**
   - Manual Request: POST `http://localhost:8080/api/articles`
   - Body with SQL injection attempt:
     ```json
     {
       "article": {
         "title": "Test' OR '1'='1",
         "description": "Test",
         "body": "Test",
         "tagList": ["test"]
       }
     }
     ```
   - Document response

📸 **SCREENSHOT 36:** SQL injection test
   - Save as: `screenshots/zap/api/sql-injection-test.png`

2. **Test XSS in article content:**
   - Manual Request: POST `http://localhost:8080/api/articles`
   - Body with XSS payload:
     ```json
     {
       "article": {
         "title": "XSS Test",
         "description": "<script>alert('XSS')</script>",
         "body": "<img src=x onerror=alert('XSS')>",
         "tagList": ["test"]
       }
     }
     ```
   - Create the article
   - View it in browser
   - Document if XSS executes

📸 **SCREENSHOT 37:** XSS test in article
   - Save as: `screenshots/zap/api/xss-test-create.png`

📸 **SCREENSHOT 38:** XSS execution in browser (if it fires)
   - Save as: `screenshots/zap/api/xss-execution.png`

#### 5.1.4: Test Rate Limiting

1. **Test login brute force:**
   - In ZAP, use Fuzzer
   - Right-click on login request
   - Attack → Fuzz
   - Fuzz the password parameter with multiple values
   - Send 50+ requests quickly
   - Check if rate limiting blocks requests

📸 **SCREENSHOT 39:** Fuzzer configuration for rate limiting test
   - Save as: `screenshots/zap/api/rate-limit-fuzzer.png`

📸 **SCREENSHOT 40:** Rate limiting test results
   - Save as: `screenshots/zap/api/rate-limit-results.png`

#### 5.1.5: Test Information Disclosure

1. **Test error messages:**
   - Send malformed requests to various endpoints
   - Check for:
     - Stack traces
     - Database errors
     - Debug information
     - Internal paths

📸 **SCREENSHOT 41:** Verbose error message example
   - Save as: `screenshots/zap/api/verbose-error.png`

---

## Phase 6: Implement Security Fixes

### Step 6.1: Implement Security Headers in Backend

Edit `golang-gin-realworld-example-app/hello.go`:

Add security headers middleware:

```go
// Add this function before main()
func SecurityHeaders() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("X-Frame-Options", "DENY")
        c.Header("X-Content-Type-Options", "nosniff")
        c.Header("X-XSS-Protection", "1; mode=block")
        c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'")
        c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
        c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
        c.Next()
    }
}

// In main(), add before routes:
router.Use(SecurityHeaders())
```

📸 **SCREENSHOT 42:** Code showing security headers implementation
   - Save as: `screenshots/zap/final/security-headers-code.png`

### Step 6.2: Test Security Headers

1. **Restart backend with security headers**
2. **In ZAP, make a request to the API**
3. **Check Response headers tab**

📸 **SCREENSHOT 43:** Response showing all security headers present
   - Save as: `screenshots/zap/final/headers-present.png`

### Step 6.3: Implement Additional Fixes

Based on findings, implement fixes for:
- Input validation
- Output encoding
- Authentication improvements
- Authorization checks
- CSRF protection

Document each fix in code comments.

---

## Phase 7: Final Verification Scan

### Step 7.1: Run Complete Scan Again

1. **Clear previous session:**
   - File → New Session

2. **Run full passive + active scan** with all fixes in place

3. **Compare results:**

📸 **SCREENSHOT 44:** Before scan - vulnerability count
   - Save as: `screenshots/zap/final/before-vuln-count.png`

📸 **SCREENSHOT 45:** After scan - vulnerability count (reduced)
   - Save as: `screenshots/zap/final/after-vuln-count.png`

### Step 7.2: Generate Final Reports

1. **Export all report formats:**
   - HTML: `Assignment_02/reports/zap-final-report.html`
   - XML: `Assignment_02/reports/zap-final-report.xml`
   - JSON: `Assignment_02/reports/zap-final-report.json`

📸 **SCREENSHOT 46:** Final HTML report showing improvements
   - Save as: `screenshots/zap/final/final-report-summary.png`

---

## Required Screenshots Summary

### Setup Phase (6 screenshots)
1. ZAP welcome screen
2. Backend running
3. Frontend running
4. Conduit homepage
5. Test user registered
6. Test articles created

### Passive Scan Phase (8 screenshots)
7. Quick start configuration
8. Spider progress
9. Alerts overview
10. High severity example
11. CSP missing
12. CSRF tokens
13. Cookie security
14. Report generation
15. HTML report view

### Active Scan Phase (17 screenshots)
16. Context creation
17. Context URLs
18. Authentication config
19. Login indicators
20. Login test response
21. User configuration
22. Session management
23. Scan policy
24. Spider as user
25. Spider authenticated complete
26. Active scan start
27. Active scan progress
28. Active scan complete
29-32. Vulnerability examples (SQL, XSS, CSRF, Auth)
33. Critical vulnerability detail
34. Reports exported

### API Testing Phase (9 screenshots)
35. Auth bypass test
36. Invalid token test
37. Authorization test
38. SQL injection test
39. XSS test create
40. XSS execution
41. Rate limit fuzzer
42. Rate limit results
43. Verbose error

### Final Phase (5 screenshots)
44. Security headers code
45. Headers present in response
46. Before vulnerability count
47. After vulnerability count
48. Final report summary

**Total: ~48 screenshots minimum**

---

## Next Steps

After completing all ZAP testing:

1. ✅ Create all required markdown analysis files
2. ✅ Export all reports (HTML, XML, JSON)
3. ✅ Document all fixes applied
4. ✅ Create final security assessment
5. ✅ Organize all screenshots in proper folders

---

## Tips for Success

- **Be patient**: Active scans take time
- **Document everything**: Screenshot as you go
- **Test fixes**: Always verify fixes work before final scan
- **Understand findings**: Don't just copy-paste, understand what each vulnerability means
- **Be thorough**: Cover all API endpoints
- **Keep evidence**: Save all request/response pairs for critical findings

---

## Troubleshooting

**Issue: ZAP can't connect to app**
- Solution: Ensure both backend and frontend are running
- Check firewall settings

**Issue: Authentication not working**
- Solution: Verify login endpoint and response format
- Check that token is being extracted correctly

**Issue: Active scan finds nothing**
- Solution: Ensure context and user are configured correctly
- Check that spider discovered authenticated pages

**Issue: Scan takes too long**
- Solution: Reduce scan policy intensity
- Scan specific paths instead of entire site

---

Good luck with your ZAP testing!
