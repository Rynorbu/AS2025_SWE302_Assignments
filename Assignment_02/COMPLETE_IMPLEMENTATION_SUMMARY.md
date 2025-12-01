# Assignment 2 - Complete Implementation Guide & Screenshot Requirements

**Course:** SWE302 - Software Security  
**Assignment:** Static & Dynamic Application Security Testing  
**Due Date:** November 30, 2025  
**Status:** Ready to Execute  

---

## 📋 Executive Summary

You have completed Snyk and SonarQube testing. This guide covers the remaining OWASP ZAP testing to achieve full marks on Assignment 2.

**What's Been Done:**
- ✅ Snyk testing (backend & frontend)
- ✅ SonarQube testing (backend & frontend)

**What Remains:**
- ⏳ OWASP ZAP Passive Scan (15 points)
- ⏳ OWASP ZAP Active Scan (25 points)
- ⏳ OWASP ZAP API Testing (15 points)
- ⏳ Security Fixes Implementation (25 points)
- ⏳ Security Headers (8 points)
- ⏳ Final Verification (12 points)

**Total Remaining Points:** 100 points (ZAP portion)

---

## 📁 Files Created for You

All documentation templates are ready in `Assignment_02/`:

### Implementation Guides
1. ✅ `ZAP_IMPLEMENTATION_GUIDE.md` - Complete step-by-step walkthrough
2. ✅ `ZAP_QUICK_REFERENCE.md` - Quick command reference

### Analysis Documents (Templates to Fill)
3. ✅ `reports/zap-passive-scan-analysis.md` - For passive scan findings
4. ✅ `reports/zap-active-scan-analysis.md` - For active scan findings
5. ✅ `reports/zap-api-security-analysis.md` - For API testing findings
6. ✅ `reports/zap-fixes-applied.md` - Document security fixes
7. ✅ `reports/final-security-assessment.md` - Final comprehensive report

---

## 🎯 Complete Screenshot Requirements

To get **FULL MARKS**, you need these screenshots:

### Phase 1: Setup (6 screenshots)

| # | Screenshot | When to Take | Save As | Points Value |
|---|------------|--------------|---------|--------------|
| 1 | ZAP welcome screen | After installing & launching ZAP | `screenshots/zap/setup/zap-welcome-screen.png` | Setup |
| 2 | Backend running | Terminal showing "Listening on :8080" | `screenshots/zap/setup/backend-running.png` | Setup |
| 3 | Frontend running | Terminal showing "Compiled successfully" | `screenshots/zap/setup/frontend-running.png` | Setup |
| 4 | Conduit homepage | Browser showing http://localhost:4100 | `screenshots/zap/setup/conduit-homepage.png` | Setup |
| 5 | Test user registered | Success message after registration | `screenshots/zap/setup/test-user-registered.png` | Setup |
| 6 | Test articles created | Dashboard showing created articles | `screenshots/zap/setup/test-articles-created.png` | Setup |

### Phase 2: Passive Scan (8 screenshots)

| # | Screenshot | When to Take | Save As | Points Value |
|---|------------|--------------|---------|--------------|
| 7 | Quick Start config | ZAP automated scan dialog | `screenshots/zap/passive/zap-quickstart-config.png` | 2 pts |
| 8 | Spider progress | Spider tab showing progress | `screenshots/zap/passive/spider-progress.png` | 1 pt |
| 9 | Alerts overview | Alerts tab with all findings | `screenshots/zap/passive/alerts-overview.png` | 3 pts |
| 10 | High severity finding | Detail view of high risk alert | `screenshots/zap/passive/high-severity-example.png` | 2 pts |
| 11 | CSP missing | Alert showing CSP header not set | `screenshots/zap/passive/csp-missing.png` | 2 pts |
| 12 | CSRF tokens | Alert about missing CSRF tokens | `screenshots/zap/passive/csrf-tokens.png` | 2 pts |
| 13 | Cookie security | Cookie security issues | `screenshots/zap/passive/cookie-security.png` | 2 pts |
| 14 | HTML report | Generated HTML report in browser | `screenshots/zap/passive/html-report-view.png` | 1 pt |

**Total Passive Scan: 15 points**

### Phase 3: Active Scan (17 screenshots)

| # | Screenshot | When to Take | Save As | Points Value |
|---|------------|--------------|---------|--------------|
| 15 | Context creation | Dialog creating new context | `screenshots/zap/active/context-creation.png` | 2 pts |
| 16 | Context URLs | URL patterns included | `screenshots/zap/active/context-urls.png` | 1 pt |
| 17 | Auth method config | JSON auth configuration | `screenshots/zap/active/auth-method-config.png` | 3 pts |
| 18 | Login indicators | Logged in regex pattern | `screenshots/zap/active/login-indicators.png` | 2 pts |
| 19 | Login test response | Successful login with token | `screenshots/zap/active/login-test-response.png` | 2 pts |
| 20 | User configuration | User added to context | `screenshots/zap/active/user-config.png` | 1 pt |
| 21 | Session management | Session config | `screenshots/zap/active/session-management.png` | 1 pt |
| 22 | Scan policy | OWASP Top 10 policy selected | `screenshots/zap/active/scan-policy.png` | 2 pts |
| 23 | Spider as user | Spider with auth dialog | `screenshots/zap/active/spider-as-user.png` | 1 pt |
| 24 | Spider complete | Authenticated pages discovered | `screenshots/zap/active/spider-authenticated-complete.png` | 1 pt |
| 25 | Active scan start | Active scan dialog | `screenshots/zap/active/active-scan-start.png` | 1 pt |
| 26 | Active scan progress | Scan running | `screenshots/zap/active/active-scan-progress.png` | 1 pt |
| 27 | Active scan complete | 100% complete | `screenshots/zap/active/active-scan-complete.png` | 1 pt |
| 28-31 | Vulnerability examples | SQL injection, XSS, CSRF, Auth bypass | `screenshots/zap/active/sql-injection-finding.png` etc. | 4 pts |
| 32 | Critical vuln detail | Full request/response details | `screenshots/zap/active/critical-vuln-detail.png` | 2 pts |
| 33 | Reports exported | All 3 report files | `screenshots/zap/active/reports-exported.png` | 1 pt |

**Total Active Scan: 25 points**

### Phase 4: API Testing (9 screenshots)

| # | Screenshot | When to Take | Save As | Points Value |
|---|------------|--------------|---------|--------------|
| 34 | Auth bypass test | GET /api/user without token | `screenshots/zap/api/auth-bypass-test.png` | 2 pts |
| 35 | Invalid token test | Response to invalid token | `screenshots/zap/api/invalid-token-test.png` | 2 pts |
| 36 | Authorization test | IDOR test result | `screenshots/zap/api/authorization-test.png` | 3 pts |
| 37 | SQL injection test | SQL injection attempt | `screenshots/zap/api/sql-injection-test.png` | 2 pts |
| 38 | XSS test create | Creating article with XSS | `screenshots/zap/api/xss-test-create.png` | 2 pts |
| 39 | XSS execution | Alert firing in browser (if vulnerable) | `screenshots/zap/api/xss-execution.png` | 2 pts |
| 40 | Rate limit fuzzer | Fuzzer configuration | `screenshots/zap/api/rate-limit-fuzzer.png` | 1 pt |
| 41 | Rate limit results | Results showing rate limiting | `screenshots/zap/api/rate-limit-results.png` | 1 pt |
| 42 | Verbose error | Detailed error message | `screenshots/zap/api/verbose-error.png` | 1 pt |

**Total API Testing: 15 points**

### Phase 5: Security Fixes (5 screenshots)

| # | Screenshot | When to Take | Save As | Points Value |
|---|------------|--------------|---------|--------------|
| 43 | Security headers code | Code showing middleware | `screenshots/zap/final/security-headers-code.png` | 5 pts |
| 44 | Headers in response | curl -I showing all headers | `screenshots/zap/final/headers-present.png` | 5 pts |
| 45 | Before vuln count | ZAP alerts before fixes | `screenshots/zap/final/before-vuln-count.png` | 5 pts |
| 46 | After vuln count | ZAP alerts after fixes | `screenshots/zap/final/after-vuln-count.png` | 5 pts |
| 47 | Final report | HTML report showing improvement | `screenshots/zap/final/final-report-summary.png` | 5 pts |

**Total Security Fixes & Headers: 25 points**

### Phase 6: Documentation (Points from written analysis)

| Document | Points | Requirements |
|----------|--------|--------------|
| zap-passive-scan-analysis.md | 5 pts | Complete analysis of all passive findings |
| zap-active-scan-analysis.md | 10 pts | Detailed analysis of active scan vulnerabilities |
| zap-api-security-analysis.md | 8 pts | API-specific testing documentation |
| zap-fixes-applied.md | 7 pts | All fixes implemented with code |
| final-security-assessment.md | 10 pts | Comprehensive final assessment |

**Total Documentation: 40 points**

---

## ✅ Implementation Checklist

### Day 1: Setup & Passive Scan (2-3 hours)

- [ ] **Step 1:** Download & install OWASP ZAP
  - Visit: https://www.zaproxy.org/download/
  - Install Windows version
  - Launch and take screenshot #1

- [ ] **Step 2:** Start applications
  ```powershell
  # Terminal 1
  cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app
  go run hello.go
  ```
  - Take screenshot #2
  
  ```powershell
  # Terminal 2
  cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\react-redux-realworld-example-app
  npm start
  ```
  - Take screenshot #3
  - Take screenshot #4 (browser)

- [ ] **Step 3:** Create test user
  - Register: zaptest@security.test / ZapTest123!@#
  - Take screenshot #5
  - Create 2-3 articles
  - Take screenshot #6

- [ ] **Step 4:** Run passive scan
  - ZAP → Automated Scan → http://localhost:4100
  - Take screenshots #7-14
  - Document findings in `zap-passive-scan-analysis.md`

### Day 2: Active Scan (4-5 hours including scan time)

- [ ] **Step 5:** Configure authentication
  - Create context "Conduit Authenticated"
  - Take screenshots #15-22
  - Follow `ZAP_IMPLEMENTATION_GUIDE.md` Phase 4

- [ ] **Step 6:** Run active scan
  - Spider as user
  - Active scan (takes 30-60 minutes)
  - Take screenshots #23-33
  - Document findings in `zap-active-scan-analysis.md`

### Day 3: API Testing & Fixes (3-4 hours)

- [ ] **Step 7:** Manual API testing
  - Test authentication bypass
  - Test authorization (IDOR)
  - Test SQL injection
  - Test XSS
  - Test rate limiting
  - Take screenshots #34-42
  - Document in `zap-api-security-analysis.md`

- [ ] **Step 8:** Implement security fixes
  - Add security headers middleware
  - Implement input validation
  - Add authorization checks
  - Implement rate limiting
  - Take screenshots #43-44
  - Document in `zap-fixes-applied.md`

### Day 4: Verification & Documentation (2-3 hours)

- [ ] **Step 9:** Final verification scan
  - Restart apps with fixes
  - Run passive + active scan again
  - Take screenshots #45-47
  - Compare before/after

- [ ] **Step 10:** Complete documentation
  - Fill in all [FILL IN] sections in templates
  - Complete `final-security-assessment.md`
  - Organize all screenshots
  - Export all ZAP reports (HTML, XML, JSON)

---

## 📊 Grading Breakdown

| Component | Your Task | Points | Status |
|-----------|-----------|--------|--------|
| **Snyk Backend** | Already done | 8 | ✅ |
| **Snyk Frontend** | Already done | 8 | ✅ |
| **SonarQube Backend** | Already done | 8 | ✅ |
| **SonarQube Frontend** | Already done | 8 | ✅ |
| **SonarQube Improvements** | Already done | 10 | ✅ |
| **ZAP Passive Scan** | Screenshots #7-14 + analysis | 15 | ⏳ |
| **ZAP Active Scan** | Screenshots #15-33 + analysis | 25 | ⏳ |
| **ZAP API Testing** | Screenshots #34-42 + analysis | 15 | ⏳ |
| **Security Fixes** | Code + Screenshots #43-47 | 25 | ⏳ |
| **Documentation** | All markdown files complete | 40 | ⏳ |
| **TOTAL** | | **200** | **50% Done** |

---

## 🎓 Tips for Full Marks

### Documentation Quality (40 points)
1. **Be thorough:** Don't just list findings, explain them
2. **Show understanding:** Explain why each vulnerability is dangerous
3. **Provide evidence:** Every finding needs screenshot evidence
4. **Professional format:** Use tables, proper formatting
5. **Technical accuracy:** Use correct CVE/CWE references

### Screenshot Quality
1. **Clear and readable:** Full screen, good resolution
2. **Relevant:** Show exactly what's needed
3. **Annotated:** Add arrows/highlights if needed
4. **Organized:** Proper folder structure

### Security Fixes (25 points)
1. **Actually fix the issues:** Code must work
2. **Show before/after:** Demonstrate improvement
3. **Explain the fix:** Don't just paste code
4. **Test your fixes:** Verify they work

### Analysis Depth
- ❌ **Poor:** "XSS found in article creation"
- ✅ **Good:** "Stored XSS vulnerability in article body field (CWE-79). Attacker can inject `<script>alert('XSS')</script>` which executes when other users view the article. Impact: Session hijacking, credential theft. Fix: Implement HTML sanitization using bluemonday library."

---

## 📚 Resources Available

### Your Guides
1. **ZAP_IMPLEMENTATION_GUIDE.md** - Complete walkthrough (48 pages)
2. **ZAP_QUICK_REFERENCE.md** - Quick commands
3. **Template files** - All in `reports/` folder

### External Resources
- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Database](https://cwe.mitre.org/)
- Assignment file: `ASSIGNMENT_2.md`

---

## 🚨 Common Mistakes to Avoid

1. ❌ **Running scan without authentication** → Won't find authenticated vulnerabilities
2. ❌ **Not taking screenshots as you go** → Hard to recreate later
3. ❌ **Copying findings without understanding** → Professors can tell
4. ❌ **Not testing fixes** → Submitting broken code
5. ❌ **Missing evidence** → Can't prove you did the work
6. ❌ **Incomplete documentation** → Leaving [FILL IN] sections
7. ❌ **Wrong screenshot locations** → Grader can't find them

---

## ⏰ Time Estimates

| Phase | Time Required | Can Do Async? |
|-------|--------------|---------------|
| Setup & Install | 30 min | No |
| Passive Scan | 30 min | No |
| Passive Analysis | 1 hour | Yes |
| Active Scan Config | 1 hour | No |
| Active Scan Running | 45 min | **Yes - Let it run** |
| Active Analysis | 2 hours | Yes |
| API Testing | 2 hours | No |
| Implement Fixes | 3 hours | Yes |
| Final Verification | 1 hour | No |
| Documentation | 3 hours | Yes |
| **Total** | **~15 hours** | |

**💡 Pro Tip:** Start active scan before lunch/dinner - let it run while you eat!

---

## 📞 What to Do When Stuck

### ZAP won't connect to app
```powershell
# Check if apps are running
Test-NetConnection localhost -Port 8080
Test-NetConnection localhost -Port 4100
```

### Authentication not working in ZAP
1. Verify login works manually (curl command)
2. Check JSON format exactly matches
3. Verify token appears in response
4. Check regex pattern captures token

### Active scan finds nothing
1. Ensure authentication is working
2. Check spider discovered authenticated pages
3. Verify scan policy includes OWASP Top 10
4. Try increasing scan intensity

### Need help?
1. Check `ZAP_IMPLEMENTATION_GUIDE.md` troubleshooting section
2. Review `ZAP_QUICK_REFERENCE.md` for commands
3. Re-read assignment requirements in `ASSIGNMENT_2.md`

---

## ✨ Final Submission Checklist

Before submitting, verify you have:

### Screenshots (47 minimum)
- [ ] All setup screenshots (6)
- [ ] All passive scan screenshots (8)
- [ ] All active scan screenshots (17)
- [ ] All API testing screenshots (9)
- [ ] All final verification screenshots (5)
- [ ] Additional vulnerability examples (2+)

### Reports
- [ ] `zap-passive-report.html`
- [ ] `zap-active-report.html`
- [ ] `zap-active-report.xml`
- [ ] `zap-active-report.json`
- [ ] `zap-final-report.html`

### Documentation (All [FILL IN] sections completed)
- [ ] `zap-passive-scan-analysis.md`
- [ ] `zap-active-scan-analysis.md`
- [ ] `zap-api-security-analysis.md`
- [ ] `zap-fixes-applied.md`
- [ ] `final-security-assessment.md`

### Code Changes
- [ ] Security headers implemented in `hello.go`
- [ ] Input validation added
- [ ] Authorization checks added
- [ ] Rate limiting implemented
- [ ] All code tested and working

### Organization
- [ ] All screenshots in correct folders
- [ ] All reports in `reports/` folder
- [ ] All files have correct names
- [ ] README or summary document

---

## 🎯 Success Criteria

You'll know you're ready to submit when:

✅ All 47+ screenshots taken and organized  
✅ All ZAP scans completed (passive + active + API)  
✅ All vulnerability findings documented  
✅ Security fixes implemented and tested  
✅ Before/after comparison shows improvement  
✅ All markdown files complete (no [FILL IN] left)  
✅ All ZAP reports exported  
✅ Code runs without errors  
✅ Security headers present in responses  

---

## 🏆 Aim for Excellence

**Good (70-80%):**
- All scans completed
- Basic documentation
- Some fixes implemented
- Screenshots present

**Very Good (80-90%):**
- Thorough analysis
- Most vulnerabilities fixed
- Well-organized documentation
- Clear evidence

**Excellent (90-100%):**
- Deep technical understanding
- All critical/high vulns fixed
- Professional documentation
- Comprehensive evidence
- Before/after comparison
- Additional security improvements

---

**You're ready to get full marks! Follow the guides, take all screenshots, and document thoroughly.**

**Start with:** `ZAP_IMPLEMENTATION_GUIDE.md` Phase 1

**Good luck! 🚀**
