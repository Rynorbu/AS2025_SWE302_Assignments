# Assignment 2 - Required Screenshots Guide

## 📸 Screenshot Checklist

This document outlines all required screenshots for Assignment 2. Take each screenshot when prompted by the commands script.

---

## PART A: SAST - Snyk (12 Screenshots)

### Backend (Go) - Snyk Screenshots

#### Screenshot 1: Snyk Authentication Success
**When to take:** After running `snyk auth`
**What to capture:** 
- Terminal showing successful authentication message
- Browser window showing "Authenticated" confirmation

#### Screenshot 2: Snyk Backend Test - Vulnerability Summary
**When to take:** After running `snyk test` in Go directory
**What to capture:**
- Terminal output showing:
  - Total number of vulnerabilities
  - Breakdown by severity (Critical, High, Medium, Low)
  - List of vulnerable packages

#### Screenshot 3: Snyk Backend - Detailed Vulnerabilities
**When to take:** Scroll through `snyk test` output
**What to capture:**
- Detailed view of at least 2-3 high/critical vulnerabilities
- Should show:
  - Vulnerability name
  - Package name and version
  - CVE number
  - Recommended fix

#### Screenshot 4: Snyk Monitor - Backend Dashboard
**When to take:** After running `snyk monitor` and visiting Snyk web dashboard
**What to capture:**
- Snyk dashboard showing backend project
- Overview of vulnerabilities
- Project name visible

#### Screenshot 5: Snyk Dashboard - Dependency Tree
**When to take:** In Snyk web dashboard, navigate to dependency tree
**What to capture:**
- Visual dependency tree
- Direct vs transitive dependencies highlighted

---

### Frontend (React) - Snyk Screenshots

#### Screenshot 6: Snyk Frontend Test - Vulnerability Summary
**When to take:** After running `snyk test` in React directory
**What to capture:**
- Terminal output showing npm dependency vulnerabilities
- Severity breakdown
- Total vulnerability count

#### Screenshot 7: Snyk Code Test - Source Code Issues
**When to take:** After running `snyk code test` in React directory
**What to capture:**
- Code-level security issues
- File paths where issues found
- Issue types (XSS, hardcoded secrets, etc.)

#### Screenshot 8: Snyk Code Test - Detailed Issue
**When to take:** Expand a code vulnerability in terminal or dashboard
**What to capture:**
- Specific code snippet with vulnerability
- Line number
- Explanation and fix suggestion

#### Screenshot 9: Snyk Frontend Dashboard
**When to take:** After running `snyk monitor` for frontend
**What to capture:**
- Frontend project in Snyk dashboard
- Vulnerability overview
- License issues (if any)

#### Screenshot 10: Snyk Fix Suggestions
**When to take:** In Snyk dashboard or CLI output
**What to capture:**
- Automated fix suggestions
- Upgrade paths for vulnerable packages
- Breaking change warnings (if any)

#### Screenshot 11: Before Fix - Vulnerability Count
**When to take:** Before applying fixes
**What to capture:**
- Clear view of total vulnerability count
- Severity distribution
- Can be CLI or dashboard

#### Screenshot 12: After Fix - Improved Security
**When to take:** After applying fixes and re-running `snyk test`
**What to capture:**
- Reduced vulnerability count
- Fixed issues marked as resolved
- Comparison showing improvement

---

## PART B: SAST - SonarQube (10 Screenshots)

### Backend (Go) - SonarQube Screenshots

#### Screenshot 13: SonarQube Cloud - Project Setup
**When to take:** After connecting GitHub repository
**What to capture:**
- SonarQube Cloud dashboard
- Backend project listed
- Repository connection status

#### Screenshot 14: SonarQube Backend - Overview Dashboard
**When to take:** After first analysis completes
**What to capture:**
- Quality Gate status (Pass/Fail)
- Overall metrics:
  - Lines of code
  - Bugs
  - Vulnerabilities
  - Code Smells
  - Coverage
  - Duplications
  - Security Rating

#### Screenshot 15: SonarQube Backend - Issues List
**When to take:** Click on "Issues" tab
**What to capture:**
- List of all issues (Bugs, Vulnerabilities, Code Smells)
- Severity indicators
- File locations
- At least 5-10 issues visible

#### Screenshot 16: SonarQube Backend - Specific Vulnerability
**When to take:** Click on a security vulnerability issue
**What to capture:**
- Issue description
- Code snippet with highlighted problem
- OWASP/CWE reference
- Remediation guidance
- "Why is this an issue?" explanation

#### Screenshot 17: SonarQube Backend - Security Hotspots
**When to take:** Navigate to "Security Hotspots" tab
**What to capture:**
- List of security hotspots
- Security categories
- Status (To Review, Reviewed, etc.)
- At least 3-5 hotspots visible

#### Screenshot 18: SonarQube Backend - Code Smells
**When to take:** Filter issues to show only Code Smells
**What to capture:**
- Code maintainability issues
- Complexity metrics
- Duplication warnings
- Technical debt estimation

---

### Frontend (React) - SonarQube Screenshots

#### Screenshot 19: SonarQube Frontend - Overview Dashboard
**When to take:** After React project analysis completes
**What to capture:**
- Quality Gate status
- Overall metrics for frontend
- JavaScript/React specific metrics
- Security rating

#### Screenshot 20: SonarQube Frontend - Security Issues
**When to take:** Filter to show security vulnerabilities
**What to capture:**
- XSS vulnerabilities (if found)
- Insecure crypto usage
- React-specific security issues
- At least 2-3 detailed issues

#### Screenshot 21: SonarQube Frontend - Code Quality Issues
**When to take:** View code quality/maintainability issues
**What to capture:**
- Duplicated code blocks
- Complex functions (cognitive complexity)
- Unused variables/imports
- Console statements

#### Screenshot 22: SonarQube Frontend - Measures/Metrics
**When to take:** Navigate to "Measures" or "Metrics" tab
**What to capture:**
- Maintainability rating
- Reliability rating
- Security rating
- Technical debt
- Code coverage (if available)

---

## PART C: DAST - OWASP ZAP (15 Screenshots)

### ZAP Setup & Configuration

#### Screenshot 23: OWASP ZAP - Initial Screen
**When to take:** When ZAP first launches
**What to capture:**
- ZAP welcome screen or main interface
- Version number visible
- Menu and toolbar visible

#### Screenshot 24: Application Running - Backend
**When to take:** After starting Go backend
**What to capture:**
- Terminal showing backend running
- Port number (usually :8080)
- No error messages

#### Screenshot 25: Application Running - Frontend
**When to take:** After starting React frontend
**What to capture:**
- Terminal showing React dev server running
- Browser showing app at http://localhost:4100
- App loaded successfully

#### Screenshot 26: Test User Registration
**When to take:** After creating test user
**What to capture:**
- Registration page or success message
- Test user credentials visible (for documentation)
- User logged in state

---

### Passive Scan Screenshots

#### Screenshot 27: ZAP Passive Scan - Configuration
**When to take:** Before starting passive scan
**What to capture:**
- ZAP Automated Scan dialog
- Target URL set to http://localhost:4100
- Spider and passive scan options selected

#### Screenshot 28: ZAP Passive Scan - Spider Progress
**When to take:** While spider is running
**What to capture:**
- Sites tree showing discovered URLs
- Spider progress indicator
- Number of URLs found

#### Screenshot 29: ZAP Passive Scan - Alerts Summary
**When to take:** After passive scan completes
**What to capture:**
- Alerts tab showing all findings
- Breakdown by risk level (High, Medium, Low, Info)
- Total alert count

#### Screenshot 30: ZAP Passive Scan - High Priority Alert Details
**When to take:** Click on a High or Medium risk alert
**What to capture:**
- Alert name and description
- URLs affected
- Risk level
- CWE/OWASP reference
- Solution/remediation guidance

#### Screenshot 31: ZAP Passive Scan - Security Headers Missing
**When to take:** Find alerts about missing security headers
**What to capture:**
- Missing security headers alerts:
  - X-Frame-Options
  - X-Content-Type-Options
  - Content-Security-Policy
  - Strict-Transport-Security
- URLs affected

---

### Active Scan Screenshots

#### Screenshot 32: ZAP Context Configuration
**When to take:** After setting up authentication context
**What to capture:**
- Context dialog showing:
  - Context name: "Conduit Authenticated"
  - Include in context URLs
  - Authentication settings

#### Screenshot 33: ZAP Authentication Configuration
**When to take:** After configuring JSON authentication
**What to capture:**
- Authentication method settings
- Login URL
- Login request body structure
- Token extraction pattern

#### Screenshot 34: ZAP Active Scan - Launch Dialog
**When to take:** Before starting active scan
**What to capture:**
- Active scan dialog
- Target selection
- User selection for authenticated scan
- Scan policy (OWASP Top 10)

#### Screenshot 35: ZAP Active Scan - Progress
**When to take:** While active scan is running (after 5-10 minutes)
**What to capture:**
- Active scan progress bar
- Percentage complete
- Number of alerts found so far
- Current test being performed

#### Screenshot 36: ZAP Active Scan - Vulnerability Summary
**When to take:** After active scan completes
**What to capture:**
- Complete list of all vulnerabilities found
- Risk distribution (Critical, High, Medium, Low)
- Total number of alerts

#### Screenshot 37: ZAP - SQL Injection Vulnerability (if found)
**When to take:** If SQL injection alert appears
**What to capture:**
- Alert details
- Affected URL/parameter
- Attack payload used
- Response evidence
- Risk assessment

#### Screenshot 38: ZAP - XSS Vulnerability (if found)
**When to take:** If XSS alert appears
**What to capture:**
- XSS alert details
- Vulnerable parameter
- Payload that triggered alert
- Context (reflected, stored, or DOM-based)
- Evidence from response

#### Screenshot 39: ZAP - Authentication/Authorization Issues
**When to take:** If found during active scan
**What to capture:**
- Broken authentication or authorization alerts
- Affected endpoints
- Access control issues
- Evidence showing unauthorized access

---

### API Security Testing Screenshots

#### Screenshot 40: ZAP - API Endpoints List
**When to take:** After spidering API endpoints
**What to capture:**
- Sites tree expanded to show /api/* endpoints
- All discovered API routes
- HTTP methods (GET, POST, PUT, DELETE)

#### Screenshot 41: ZAP - API Request/Response
**When to take:** Select an API endpoint
**What to capture:**
- Request tab showing:
  - HTTP method and URL
  - Headers (especially Authorization)
  - Request body (if POST/PUT)
- Response tab showing:
  - Status code
  - Response body
  - Response headers

---

### Remediation & Final Verification Screenshots

#### Screenshot 42: Code Changes - Security Headers Implementation
**When to take:** After implementing security headers in code
**What to capture:**
- Code editor showing security headers middleware
- Backend Go code (hello.go or similar)
- All security headers visible:
  - X-Frame-Options
  - X-Content-Type-Options
  - X-XSS-Protection
  - Strict-Transport-Security
  - Content-Security-Policy

#### Screenshot 43: ZAP - Security Headers Verification
**When to take:** After restarting app with security headers
**What to capture:**
- ZAP response showing all security headers present
- No more "missing security headers" alerts
- Response headers tab clearly showing headers

#### Screenshot 44: Final ZAP Scan - Improved Results
**When to take:** After final scan post-remediation
**What to capture:**
- Alert counts showing improvement
- Comparison with initial scan (if possible)
- Remaining issues (should be fewer)

---

## Additional Screenshots for Documentation

#### Screenshot 45: Package.json Updates (Frontend)
**When to take:** After updating vulnerable packages
**What to capture:**
- Side-by-side comparison or git diff showing:
  - Old package versions
  - New package versions
- Highlight security-related updates

#### Screenshot 46: go.mod Updates (Backend)
**When to take:** After updating Go dependencies
**What to capture:**
- Updated go.mod file
- Version changes for security patches

#### Screenshot 47: Final Snyk Dashboard - Both Projects
**When to take:** At the end, after all fixes
**What to capture:**
- Snyk dashboard showing both projects
- Improved security scores
- Reduced vulnerability counts

---

## 📋 Screenshot Organization Tips

### File Naming Convention
Use this naming format for easy reference:
```
assignment2_[phase]_[tool]_[number]_[description].png

Examples:
assignment2_snyk_backend_01_auth_success.png
assignment2_snyk_backend_02_vulnerability_summary.png
assignment2_sonarqube_frontend_19_dashboard.png
assignment2_zap_passive_27_config.png
```

### Folder Structure
```
Assignment_02/
├── screenshots/
│   ├── snyk/
│   │   ├── backend/
│   │   └── frontend/
│   ├── sonarqube/
│   │   ├── backend/
│   │   └── frontend/
│   └── zap/
│       ├── passive/
│       ├── active/
│       └── api/
```

### Screenshot Quality Guidelines
- **Resolution:** Minimum 1920x1080 (or your screen's native resolution)
- **Format:** PNG (preferred) or JPEG
- **Content:** Ensure all relevant information is visible
- **No Cropping:** Capture full window when possible, or ensure context is clear
- **Annotations:** You can add arrows/highlights in a separate tool if needed
- **Clear Text:** Make sure text is readable (increase terminal font size if needed)

---

## 🎯 Quick Reference: Total Screenshots Required

| Category | Count |
|----------|-------|
| Snyk (SAST) | 12 |
| SonarQube (SAST) | 10 |
| OWASP ZAP (DAST) | 23 |
| **TOTAL** | **45** |

---

## ⚠️ Important Notes

1. **Take screenshots in order** as you follow the commands script
2. **Don't skip screenshots** - they're required for grading
3. **Save immediately** after taking each screenshot
4. **Check clarity** before moving to next step
5. **Keep terminal/window maximized** for better visibility
6. **Use descriptive filenames** for easy reference later

---

## ✅ Completion Checklist

Track your progress:

### Snyk Screenshots
- [ ] 1-12: All Snyk screenshots completed

### SonarQube Screenshots
- [ ] 13-22: All SonarQube screenshots completed

### ZAP Screenshots
- [ ] 23-44: All ZAP screenshots completed

### Final Screenshots
- [ ] 45-47: Final comparison and verification screenshots

---

**Remember:** Quality over quantity. Each screenshot should clearly demonstrate the required information. If a screenshot is blurry or unclear, retake it!
