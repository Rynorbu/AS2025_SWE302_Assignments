# Assignment 2 - Commands to Run with Screenshot Prompts

## 🚀 Prerequisites Setup

### Check Required Software
```powershell
# Check Node.js
node --version
# Should be v14+ or higher

# Check npm
npm --version

# Check Go
go version
# Should be 1.16+ or higher

# Check Docker (optional, for SonarQube local)
docker --version

# Check Git
git --version
```

---

## PHASE 1: SAST with Snyk

### 📁 Setup: Navigate to Project Root
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master"
```

---

## STEP 1: Install and Authenticate Snyk

### Command 1.1: Install Snyk CLI
```powershell
npm install -g snyk
```
**Expected Output:** Snyk installed successfully

### Command 1.2: Check Snyk Installation
```powershell
snyk --version
```
**Expected Output:** Version number (e.g., 1.1293.0)

### Command 1.3: Authenticate with Snyk
```powershell
snyk auth
```
**What Happens:** 
- Browser will open for authentication
- Login or create a free Snyk account at https://snyk.io
- Return to terminal after authentication

**📸 TAKE SCREENSHOT 1: Snyk Authentication Success**
- Capture terminal showing "Your account has been authenticated"
- Capture browser showing "Authenticated" confirmation

---

## STEP 2: Backend (Go) Security Scanning

### Navigate to Backend Directory
```powershell
cd golang-gin-realworld-example-app
```

### Command 2.1: Test for Vulnerabilities
```powershell
snyk test
```
**Expected Output:** 
- Scanning dependencies...
- List of vulnerabilities found
- Severity breakdown (Critical, High, Medium, Low)

**⏸️ WAIT FOR SCAN TO COMPLETE (may take 30-60 seconds)**

**📸 TAKE SCREENSHOT 2: Snyk Backend Test - Vulnerability Summary**
- Capture the summary at the top showing total vulnerabilities
- Make sure severity breakdown is visible

**📸 TAKE SCREENSHOT 3: Snyk Backend - Detailed Vulnerabilities**
- Scroll through output to show 2-3 detailed vulnerability descriptions
- Should show CVE numbers, package names, recommended fixes

### Command 2.2: Generate JSON Report
```powershell
snyk test --json > snyk-backend-report.json
```
**Expected Output:** File created: snyk-backend-report.json

### Command 2.3: Test All Projects
```powershell
snyk test --all-projects
```
**Expected Output:** Comprehensive scan of all Go modules

### Command 2.4: Monitor Project (Upload to Snyk Dashboard)
```powershell
snyk monitor
```
**Expected Output:** 
- "Monitoring golang-gin-realworld-example-app..."
- "Explore this snapshot at https://app.snyk.io/..."

**Action:** Click the URL to open Snyk dashboard

**📸 TAKE SCREENSHOT 4: Snyk Monitor - Backend Dashboard**
- Capture Snyk web dashboard showing backend project
- Show vulnerability overview and project name

**📸 TAKE SCREENSHOT 5: Snyk Dashboard - Dependency Tree**
- In dashboard, navigate to Dependencies or Dependency Tree view
- Show visual representation of dependencies

---

## STEP 3: Frontend (React) Security Scanning

### Navigate to Frontend Directory
```powershell
cd ..
cd react-redux-realworld-example-app
```

### Command 3.1: Install Dependencies (if not already installed)
```powershell
npm install --legacy-peer-deps
```
**Expected Output:** Dependencies installed (may take 2-3 minutes)

### Command 3.2: Test for Dependency Vulnerabilities
```powershell
snyk test
```
**Expected Output:** 
- Testing npm packages...
- List of vulnerable npm packages
- Severity breakdown

**⏸️ WAIT FOR SCAN TO COMPLETE (may take 1-2 minutes)**

**📸 TAKE SCREENSHOT 6: Snyk Frontend Test - Vulnerability Summary**
- Capture summary of npm dependency vulnerabilities
- Show total count and severity distribution

### Command 3.3: Generate JSON Report for Dependencies
```powershell
snyk test --json > snyk-frontend-report.json
```

### Command 3.4: Test Source Code for Vulnerabilities
```powershell
snyk code test
```
**Expected Output:**
- Analyzing source code...
- Code-level security issues (XSS, hardcoded secrets, etc.)
- File paths and line numbers

**⏸️ WAIT FOR CODE SCAN (may take 2-3 minutes)**

**📸 TAKE SCREENSHOT 7: Snyk Code Test - Source Code Issues**
- Capture output showing code-level vulnerabilities
- Show file paths and issue types

**Action:** If prompted to enable Snyk Code, type `yes` and press Enter

### Command 3.5: Generate JSON Report for Code Analysis
```powershell
snyk code test --json > snyk-code-report.json
```

### Command 3.6: View Detailed Code Issue (Optional)
```powershell
snyk code test --json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**📸 TAKE SCREENSHOT 8: Snyk Code Test - Detailed Issue**
- Capture a specific vulnerability with code snippet
- Show line number and fix suggestion

### Command 3.7: Monitor Frontend Project
```powershell
snyk monitor
```

**Action:** Click the URL to open dashboard

**📸 TAKE SCREENSHOT 9: Snyk Frontend Dashboard**
- Capture frontend project in Snyk dashboard
- Show vulnerability overview

---

## STEP 4: Analyze Snyk Results

### Command 4.1: View Backend Report Summary
```powershell
cd ..
cd golang-gin-realworld-example-app
cat snyk-backend-report.json | ConvertFrom-Json | Select-Object -ExpandProperty vulnerabilities | Measure-Object
```

### Command 4.2: View Frontend Report Summary
```powershell
cd ..
cd react-redux-realworld-example-app
cat snyk-frontend-report.json | ConvertFrom-Json | Select-Object -ExpandProperty vulnerabilities | Measure-Object
```

**📸 TAKE SCREENSHOT 10: Snyk Fix Suggestions**
- In Snyk dashboard or CLI output, show automated fix suggestions
- Capture upgrade paths for packages

**📸 TAKE SCREENSHOT 11: Before Fix - Vulnerability Count**
- Capture clear view of total vulnerability count (CLI or Dashboard)
- Show severity distribution

---

## STEP 5: Apply Fixes

### Command 5.1: Check for Automatic Fixes (Frontend)
```powershell
cd react-redux-realworld-example-app
snyk wizard
```
**or**
```powershell
snyk fix
```
**Expected Output:** Snyk will attempt to automatically fix vulnerabilities

### Command 5.2: Manual Package Updates (Example)
```powershell
# Update specific vulnerable package (example)
npm update <package-name>

# Or update all packages to latest compatible versions
npm update --legacy-peer-deps
```

### Command 5.3: Verify Fixes - Re-run Snyk Test
```powershell
snyk test
```

**📸 TAKE SCREENSHOT 12: After Fix - Improved Security**
- Capture reduced vulnerability count
- Show comparison with before state

---

## PHASE 2: SAST with SonarQube Cloud

## STEP 6: Setup SonarQube Cloud

### Manual Setup Steps:

1. **Visit SonarQube Cloud:** https://sonarcloud.io/
2. **Sign Up/Login:** Use GitHub account
3. **Click:** "Analyze new project"
4. **Select:** Your GitHub repository
5. **Import Organization:** Allow SonarQube access to GitHub

**📸 TAKE SCREENSHOT 13: SonarQube Cloud - Project Setup**
- Capture SonarQube dashboard after connecting repository
- Show project listed

### Command 6.1: Install SonarScanner (Optional - if using CLI)
```powershell
# Install via npm
npm install -g sonarqube-scanner

# Or download standalone: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
```

---

## STEP 7: Analyze Backend with SonarQube

### Method 1: GitHub Actions (Recommended)
SonarQube Cloud automatically analyzes your code on push/PR via GitHub Actions.

**Check Analysis Status:**
1. Go to your GitHub repository
2. Click "Actions" tab
3. View SonarQube scan workflow

### Method 2: Manual CLI Scan

### Command 7.1: Navigate to Backend
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"
```

### Command 7.2: Run SonarScanner (if using CLI)
```powershell
sonar-scanner `
  -Dsonar.projectKey=your-project-key `
  -Dsonar.organization=your-org `
  -Dsonar.sources=. `
  -Dsonar.host.url=https://sonarcloud.io `
  -Dsonar.login=your-token
```

**Note:** Replace placeholders with actual values from SonarQube Cloud

### View Results in SonarQube Dashboard

**📸 TAKE SCREENSHOT 14: SonarQube Backend - Overview Dashboard**
- Navigate to SonarQube Cloud and select backend project
- Capture:
  - Quality Gate status
  - Lines of code
  - Bugs, Vulnerabilities, Code Smells counts
  - Security Rating
  - Coverage percentage

**📸 TAKE SCREENSHOT 15: SonarQube Backend - Issues List**
- Click "Issues" tab
- Capture list showing all issues with severity indicators

**📸 TAKE SCREENSHOT 16: SonarQube Backend - Specific Vulnerability**
- Click on a security vulnerability
- Capture:
  - Issue description
  - Code snippet with highlighted problem
  - OWASP/CWE reference
  - Remediation guidance

**📸 TAKE SCREENSHOT 17: SonarQube Backend - Security Hotspots**
- Navigate to "Security Hotspots" tab
- Capture list of security hotspots with categories

**📸 TAKE SCREENSHOT 18: SonarQube Backend - Code Smells**
- Filter issues to show only "Code Smells"
- Capture maintainability issues and technical debt

---

## STEP 8: Analyze Frontend with SonarQube

### Command 8.1: Navigate to Frontend
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\react-redux-realworld-example-app"
```

### View Frontend Results in SonarQube Dashboard

**📸 TAKE SCREENSHOT 19: SonarQube Frontend - Overview Dashboard**
- Capture frontend project dashboard
- Show Quality Gate and all metrics

**📸 TAKE SCREENSHOT 20: SonarQube Frontend - Security Issues**
- Filter to security vulnerabilities
- Capture XSS, insecure crypto, React-specific issues

**📸 TAKE SCREENSHOT 21: SonarQube Frontend - Code Quality Issues**
- Show duplicated code, complex functions, unused imports
- Capture code smells specific to JavaScript/React

**📸 TAKE SCREENSHOT 22: SonarQube Frontend - Measures/Metrics**
- Navigate to "Measures" tab
- Capture maintainability, reliability, security ratings

---

## PHASE 3: DAST with OWASP ZAP

## STEP 9: Install and Setup OWASP ZAP

### Download OWASP ZAP
1. Visit: https://www.zaproxy.org/download/
2. Download Windows installer
3. Install ZAP
4. Launch application

**📸 TAKE SCREENSHOT 23: OWASP ZAP - Initial Screen**
- Capture ZAP welcome screen or main interface
- Show version number

---

## STEP 10: Prepare Application for Testing

### Command 10.1: Start Backend Server
```powershell
# Open NEW terminal window (Terminal 1)
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"

go run hello.go
```
**Expected Output:** 
- Server listening on port 8080
- Database connected

**⏸️ LEAVE THIS TERMINAL RUNNING**

**📸 TAKE SCREENSHOT 24: Application Running - Backend**
- Capture terminal showing backend running
- Show port number and no errors

### Command 10.2: Start Frontend Server
```powershell
# Open ANOTHER NEW terminal window (Terminal 2)
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\react-redux-realworld-example-app"

npm start
```
**Expected Output:**
- Compiled successfully
- App running on http://localhost:4100
- Browser window opens automatically

**⏸️ LEAVE THIS TERMINAL RUNNING**

**📸 TAKE SCREENSHOT 25: Application Running - Frontend**
- Capture terminal showing React server running
- Capture browser showing app loaded at localhost:4100

---

## STEP 11: Create Test User

### Manual Steps in Browser:
1. Navigate to: http://localhost:4100
2. Click "Sign up"
3. Register with:
   - Username: `securitytest`
   - Email: `security-test@example.com`
   - Password: `SecurePass123!`
4. After registration, create 2-3 test articles
5. Add some comments

**📸 TAKE SCREENSHOT 26: Test User Registration**
- Capture successful registration or logged-in state
- Show username visible in header

---

## STEP 12: Run ZAP Passive Scan

### ZAP GUI Steps:

#### Configure Scan
1. In ZAP, click "Automated Scan" button (lightning bolt icon)
2. Enter URL: `http://localhost:4100`
3. Select: "Use traditional spider"
4. Check: "Use AJAX spider" (optional but recommended)
5. Click "Attack"

**📸 TAKE SCREENSHOT 27: ZAP Passive Scan - Configuration**
- Capture Automated Scan dialog with settings

#### Monitor Progress
- Watch "Spider" tab for progress
- Sites tree populates with discovered URLs

**📸 TAKE SCREENSHOT 28: ZAP Passive Scan - Spider Progress**
- Capture Sites tree showing discovered URLs
- Show spider progress

#### View Results (After scan completes - 5-10 minutes)

**📸 TAKE SCREENSHOT 29: ZAP Passive Scan - Alerts Summary**
- Click "Alerts" tab
- Capture alerts grouped by risk level
- Show total alert count

**📸 TAKE SCREENSHOT 30: ZAP Passive Scan - High Priority Alert Details**
- Click on a High or Medium risk alert
- Capture detailed view showing:
  - Alert description
  - URLs affected
  - CWE/OWASP reference
  - Solution

**📸 TAKE SCREENSHOT 31: ZAP Passive Scan - Security Headers Missing**
- Find and click "Missing Security Headers" alerts
- Capture list of missing headers

### Command 12.1: Export Passive Scan Report
In ZAP:
1. Menu: Report → Generate HTML Report
2. Save as: `zap-passive-report.html`
3. Location: `Assignment_02/reports/`

---

## STEP 13: Run ZAP Active Scan (Authenticated)

### Configure Authentication Context

#### Step 13.1: Create Context
In ZAP:
1. Right-click on `http://localhost:4100` in Sites tree
2. Select: "Include in Context" → "New Context"
3. Name: `Conduit Authenticated`
4. Click "OK"

**📸 TAKE SCREENSHOT 32: ZAP Context Configuration**
- Menu: Edit → Show Session Properties
- Navigate to Contexts → Conduit Authenticated
- Capture context settings

#### Step 13.2: Configure Authentication
1. In Session Properties → Context → Authentication
2. Select: "JSON-based Authentication"
3. Login URL: `http://localhost:8080/api/users/login`
4. Login Request Body:
   ```json
   {"user":{"email":"security-test@example.com","password":"SecurePass123!"}}
   ```
5. Username Parameter: `user.email`
6. Password Parameter: `user.password`
7. Logged In Indicator: `token` (in response)
8. Logged Out Indicator: `unauthorized`

**📸 TAKE SCREENSHOT 33: ZAP Authentication Configuration**
- Capture authentication settings with login URL and body

#### Step 13.3: Configure User
1. Session Properties → Context → Users
2. Click "Add"
3. Username: `securitytest`
4. Set authentication credentials
5. Enable user

#### Step 13.4: Configure Session Management
1. Session Properties → Context → Session Management
2. Select: "HTTP Authentication"
3. Header: `Authorization`
4. Value pattern: `Token .*`

#### Step 13.5: Test Authentication
1. Right-click on context
2. Select: "Test Authentication"
3. Verify successful login

### Launch Active Scan

1. Right-click on `http://localhost:4100` in Sites tree
2. Select: "Attack" → "Active Scan"
3. In dialog:
   - Select Context: "Conduit Authenticated"
   - Select User: "securitytest"
   - Policy: "OWASP Top 10"
   - Recurse: Enabled
4. Click "Start Scan"

**📸 TAKE SCREENSHOT 34: ZAP Active Scan - Launch Dialog**
- Capture active scan configuration dialog

**⏸️ ACTIVE SCAN WILL TAKE 30-60 MINUTES - BE PATIENT!**

#### Monitor Progress

**📸 TAKE SCREENSHOT 35: ZAP Active Scan - Progress**
- After 10-15 minutes, capture progress bar
- Show percentage complete and alerts found so far

### View Active Scan Results (After completion)

**📸 TAKE SCREENSHOT 36: ZAP Active Scan - Vulnerability Summary**
- Capture Alerts tab with all vulnerabilities
- Show risk distribution

**📸 TAKE SCREENSHOT 37: ZAP - SQL Injection Vulnerability (if found)**
- Click on SQL Injection alert (if exists)
- Capture details, payload, and evidence

**📸 TAKE SCREENSHOT 38: ZAP - XSS Vulnerability (if found)**
- Click on XSS alert (if exists)
- Capture payload and response evidence

**📸 TAKE SCREENSHOT 39: ZAP - Authentication/Authorization Issues**
- Look for broken auth or access control alerts
- Capture relevant findings

### Command 13.1: Export Active Scan Reports
In ZAP Menu:
```
Report → Generate HTML Report → Save as zap-active-report.html
Report → Export Report → XML → Save as zap-active-report.xml
Report → Export Report → JSON → Save as zap-active-report.json
```

---

## STEP 14: API Security Testing

### Test API Endpoints Manually in ZAP

#### Command 14.1: Test API Authentication Bypass

In ZAP Request Editor (Manual Request):
```http
GET http://localhost:8080/api/user HTTP/1.1
Host: localhost:8080
```
(Without Authorization header)

Expected: Should return 401 Unauthorized

#### Command 14.2: Test with Invalid Token
```http
GET http://localhost:8080/api/user HTTP/1.1
Host: localhost:8080
Authorization: Token invalid-token-here
```

#### Command 14.3: Test Authorization - Access Other User's Article
```http
DELETE http://localhost:8080/api/articles/{someone-elses-slug} HTTP/1.1
Host: localhost:8080
Authorization: Token {your-valid-token}
```

**📸 TAKE SCREENSHOT 40: ZAP - API Endpoints List**
- Expand Sites tree to show all /api/* endpoints
- Show discovered API routes

**📸 TAKE SCREENSHOT 41: ZAP - API Request/Response**
- Select an API endpoint
- Capture Request and Response tabs showing:
  - HTTP method, headers, body
  - Response status and content

---

## STEP 15: Implement Security Fixes

### Fix 1: Add Security Headers to Backend

### Command 15.1: Edit Go Backend
```powershell
cd golang-gin-realworld-example-app
code hello.go
```

Add security headers middleware in `hello.go`:

```go
// Add this before your routes
router.Use(func(c *gin.Context) {
    c.Header("X-Frame-Options", "DENY")
    c.Header("X-Content-Type-Options", "nosniff")
    c.Header("X-XSS-Protection", "1; mode=block")
    c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    c.Header("Content-Security-Policy", "default-src 'self'")
    c.Next()
})
```

**📸 TAKE SCREENSHOT 42: Code Changes - Security Headers Implementation**
- Capture code editor showing security headers middleware
- Show all headers clearly

### Command 15.2: Restart Backend
```powershell
# Stop current backend (Ctrl+C in Terminal 1)
# Restart:
go run hello.go
```

### Fix 2: Verify Headers in ZAP

1. In ZAP, browse to `http://localhost:4100`
2. Select any request in History
3. View Response headers

**📸 TAKE SCREENSHOT 43: ZAP - Security Headers Verification**
- Capture Response tab showing all security headers present
- Highlight the headers you added

---

## STEP 16: Final Verification Scan

### Command 16.1: Run Final ZAP Scan
1. Clear ZAP session or start new scan
2. Run Automated Scan again on `http://localhost:4100`
3. Wait for completion

**📸 TAKE SCREENSHOT 44: Final ZAP Scan - Improved Results**
- Capture Alerts tab showing reduced alert count
- Compare with initial scan results

---

## STEP 17: Export Final Reports and Documentation

### Command 17.1: View Updated Packages (Frontend)
```powershell
cd react-redux-realworld-example-app
code package.json
```

**📸 TAKE SCREENSHOT 45: Package.json Updates**
- Show git diff or side-by-side comparison of package.json
- Highlight updated package versions

### Command 17.2: View Updated Dependencies (Backend)
```powershell
cd golang-gin-realworld-example-app
code go.mod
```

**📸 TAKE SCREENSHOT 46: go.mod Updates**
- Show updated go.mod file
- Highlight version changes

### Command 17.3: Final Snyk Dashboard View
1. Open Snyk dashboard: https://app.snyk.io
2. View both projects side-by-side

**📸 TAKE SCREENSHOT 47: Final Snyk Dashboard - Both Projects**
- Capture both backend and frontend projects
- Show improved security scores

---

## 📋 Summary of Files Generated

After completing all commands, you should have:

### Snyk Reports:
```
Assignment_02/
├── snyk-backend-report.json
├── snyk-frontend-report.json
└── snyk-code-report.json
```

### ZAP Reports:
```
Assignment_02/reports/
├── zap-passive-report.html
├── zap-active-report.html
├── zap-active-report.xml
└── zap-active-report.json
```

### Screenshots:
```
Assignment_02/screenshots/
├── snyk/ (12 screenshots)
├── sonarqube/ (10 screenshots)
└── zap/ (23 screenshots)
Total: 47 screenshots
```

---

## ⏱️ Time Estimates

| Phase | Estimated Time |
|-------|----------------|
| Snyk Setup & Scans | 30-45 minutes |
| SonarQube Setup & Analysis | 20-30 minutes |
| OWASP ZAP Setup | 15-20 minutes |
| ZAP Passive Scan | 10-15 minutes |
| ZAP Active Scan | 30-60 minutes |
| API Testing | 20-30 minutes |
| Implementing Fixes | 30-45 minutes |
| Final Verification | 20-30 minutes |
| Documentation | 60-90 minutes |
| **TOTAL** | **4-6 hours** |

---

## ✅ Completion Checklist

### Phase 1: Snyk
- [ ] Snyk installed and authenticated
- [ ] Backend scanned
- [ ] Frontend scanned
- [ ] Code analysis completed
- [ ] Reports generated
- [ ] 12 screenshots taken

### Phase 2: SonarQube
- [ ] SonarQube Cloud account created
- [ ] Repository connected
- [ ] Backend analyzed
- [ ] Frontend analyzed
- [ ] 10 screenshots taken

### Phase 3: OWASP ZAP
- [ ] ZAP installed
- [ ] Application running
- [ ] Test user created
- [ ] Passive scan completed
- [ ] Active scan completed
- [ ] API testing completed
- [ ] Security fixes implemented
- [ ] Final verification completed
- [ ] 23 screenshots taken

### Documentation
- [ ] All analysis documents created
- [ ] All reports exported
- [ ] Screenshots organized
- [ ] Final summary completed

---

## 🚨 Troubleshooting

### Snyk Issues

**Problem:** `snyk: command not found`
```powershell
# Reinstall globally
npm install -g snyk

# Or use npx
npx snyk test
```

**Problem:** Authentication fails
```powershell
# Clear auth and retry
snyk config clear
snyk auth
```

### SonarQube Issues

**Problem:** Can't connect to SonarQube Cloud
- Check GitHub repository permissions
- Verify organization setup
- Try re-importing project

### ZAP Issues

**Problem:** Active scan too slow
- Reduce scan policy to specific tests
- Decrease thread count in Options → Active Scan

**Problem:** Authentication not working
- Verify test user credentials
- Check login URL and request format
- Test login manually first in browser

**Problem:** Backend/Frontend not starting
```powershell
# Backend - check if port 8080 is in use
netstat -ano | findstr :8080

# Frontend - check if port 4100 is in use
netstat -ano | findstr :4100

# Kill process if needed
taskkill /F /PID <process-id>
```

### General Issues

**Problem:** Screenshots are blurry
- Increase terminal font size
- Maximize windows before capturing
- Use Windows Snipping Tool or Snip & Sketch

**Problem:** Running out of time
- Prioritize critical screenshots
- Active scan can run overnight
- Documentation can be done while scans run

---

## 📞 Need Help?

- **Snyk Docs:** https://docs.snyk.io/
- **SonarQube Docs:** https://docs.sonarqube.org/
- **ZAP Docs:** https://www.zaproxy.org/docs/
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/

---

**Good luck with Assignment 2! 🔒**

Remember: Security testing is about understanding vulnerabilities, not just finding them. Take time to read and understand each finding.
