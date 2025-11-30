# Assignment 2 - Implementation Plan & Script Review

## 📋 EXECUTIVE SUMMARY

This document provides a complete plan for implementing Assignment 2: Static & Dynamic Application Security Testing (SAST & DAST).

**Total Time Estimate:** 4-6 hours  
**Total Screenshots Required:** 47  
**Total Deliverable Documents:** 15+  
**Total Points:** 200

---

## 🎯 OBJECTIVES

1. **SAST with Snyk** (50 points)
   - Scan backend Go code for vulnerabilities
   - Scan frontend React code and dependencies
   - Fix at least 3 critical/high severity issues

2. **SAST with SonarQube** (50 points)
   - Set up SonarQube Cloud
   - Analyze code quality and security for both backend and frontend
   - Review security hotspots

3. **DAST with OWASP ZAP** (100 points)
   - Run passive and active security scans
   - Test API security
   - Implement security fixes
   - Verify improvements

---

## 📁 FILE STRUCTURE TO BE CREATED

```
Assignment_02/
├── COMMANDS_TO_RUN.md ✅ (Created)
├── SCREENSHOTS.md ✅ (Created)
├── IMPLEMENTATION_PLAN.md ✅ (This file)
├── ASSIGNMENT_2_REPORT.md (To be created after completion)
│
├── screenshots/
│   ├── snyk/
│   │   ├── backend/
│   │   │   ├── 01_auth_success.png
│   │   │   ├── 02_vulnerability_summary.png
│   │   │   ├── 03_detailed_vulnerabilities.png
│   │   │   ├── 04_dashboard.png
│   │   │   └── 05_dependency_tree.png
│   │   └── frontend/
│   │       ├── 06_vulnerability_summary.png
│   │       ├── 07_code_issues.png
│   │       ├── 08_detailed_issue.png
│   │       ├── 09_dashboard.png
│   │       ├── 10_fix_suggestions.png
│   │       ├── 11_before_fix.png
│   │       └── 12_after_fix.png
│   │
│   ├── sonarqube/
│   │   ├── backend/
│   │   │   ├── 13_project_setup.png
│   │   │   ├── 14_overview_dashboard.png
│   │   │   ├── 15_issues_list.png
│   │   │   ├── 16_specific_vulnerability.png
│   │   │   ├── 17_security_hotspots.png
│   │   │   └── 18_code_smells.png
│   │   └── frontend/
│   │       ├── 19_overview_dashboard.png
│   │       ├── 20_security_issues.png
│   │       ├── 21_code_quality.png
│   │       └── 22_metrics.png
│   │
│   └── zap/
│       ├── setup/
│       │   ├── 23_initial_screen.png
│       │   ├── 24_backend_running.png
│       │   ├── 25_frontend_running.png
│       │   └── 26_test_user.png
│       ├── passive/
│       │   ├── 27_config.png
│       │   ├── 28_spider_progress.png
│       │   ├── 29_alerts_summary.png
│       │   ├── 30_high_alert_details.png
│       │   └── 31_security_headers.png
│       ├── active/
│       │   ├── 32_context_config.png
│       │   ├── 33_auth_config.png
│       │   ├── 34_launch_dialog.png
│       │   ├── 35_progress.png
│       │   ├── 36_vulnerability_summary.png
│       │   ├── 37_sql_injection.png
│       │   ├── 38_xss.png
│       │   └── 39_auth_issues.png
│       ├── api/
│       │   ├── 40_endpoints_list.png
│       │   └── 41_request_response.png
│       └── final/
│           ├── 42_code_changes.png
│           ├── 43_headers_verification.png
│           ├── 44_improved_results.png
│           ├── 45_package_json_updates.png
│           ├── 46_go_mod_updates.png
│           └── 47_final_dashboard.png
│
├── reports/
│   ├── snyk-backend-report.json
│   ├── snyk-frontend-report.json
│   ├── snyk-code-report.json
│   ├── zap-passive-report.html
│   ├── zap-active-report.html
│   ├── zap-active-report.xml
│   └── zap-active-report.json
│
└── analysis/
    ├── snyk-backend-analysis.md
    ├── snyk-frontend-analysis.md
    ├── snyk-remediation-plan.md
    ├── snyk-fixes-applied.md
    ├── sonarqube-backend-analysis.md
    ├── sonarqube-frontend-analysis.md
    ├── security-hotspots-review.md
    ├── sonarqube-improvements.md
    ├── zap-passive-scan-analysis.md
    ├── zap-active-scan-analysis.md
    ├── zap-api-security-analysis.md
    ├── zap-fixes-applied.md
    ├── security-headers-analysis.md
    └── final-security-assessment.md
```

---

## 🔄 IMPLEMENTATION WORKFLOW

### **PHASE 1: PREPARATION (15 minutes)**

#### Step 0: Verify Prerequisites
- [ ] Node.js installed (v14+)
- [ ] Go installed (1.16+)
- [ ] Git installed
- [ ] Both applications can run locally
- [ ] Internet connection for cloud tools

#### Step 1: Create Directory Structure
```powershell
cd Assignment_02
mkdir screenshots\snyk\backend, screenshots\snyk\frontend
mkdir screenshots\sonarqube\backend, screenshots\sonarqube\frontend
mkdir screenshots\zap\setup, screenshots\zap\passive
mkdir screenshots\zap\active, screenshots\zap\api, screenshots\zap\final
mkdir reports, analysis
```

#### Step 2: Set Up Screen Capture Tool
- Windows Snipping Tool (Win + Shift + S)
- Or install ShareX / Greenshot for easier workflow
- Test capturing a screenshot

---

### **PHASE 2: SNYK SAST (90 minutes)**

#### Step 3: Install & Authenticate Snyk (10 min)
- [ ] Install Snyk CLI globally
- [ ] Create Snyk account
- [ ] Authenticate CLI
- [ ] **Take Screenshot 1: Auth success**

#### Step 4: Backend Scanning (30 min)
- [ ] Navigate to Go project directory
- [ ] Run `snyk test`
- [ ] **Take Screenshot 2: Vulnerability summary**
- [ ] **Take Screenshot 3: Detailed vulnerabilities**
- [ ] Generate JSON report
- [ ] Run `snyk monitor`
- [ ] **Take Screenshot 4: Dashboard**
- [ ] **Take Screenshot 5: Dependency tree**

#### Step 5: Frontend Scanning (30 min)
- [ ] Navigate to React project directory
- [ ] Install dependencies if needed
- [ ] Run `snyk test` (dependencies)
- [ ] **Take Screenshot 6: Vulnerability summary**
- [ ] Run `snyk code test` (source code)
- [ ] **Take Screenshot 7: Code issues**
- [ ] **Take Screenshot 8: Detailed issue**
- [ ] Run `snyk monitor`
- [ ] **Take Screenshot 9: Dashboard**

#### Step 6: Analysis & Fixes (20 min)
- [ ] **Take Screenshot 10: Fix suggestions**
- [ ] **Take Screenshot 11: Before fix counts**
- [ ] Identify 3 critical/high issues to fix
- [ ] Apply fixes (update packages)
- [ ] Re-run scans
- [ ] **Take Screenshot 12: After fix improvements**

#### Deliverables from Phase 2:
- 12 screenshots saved
- 3 JSON reports generated
- Both projects monitored in Snyk

---

### **PHASE 3: SONARQUBE SAST (60 minutes)**

#### Step 7: SonarQube Cloud Setup (20 min)
- [ ] Visit https://sonarcloud.io
- [ ] Sign up with GitHub account
- [ ] Import organization
- [ ] Connect repository
- [ ] **Take Screenshot 13: Project setup**
- [ ] Trigger initial analysis

#### Step 8: Backend Analysis (15 min)
- [ ] Wait for analysis to complete
- [ ] Navigate to backend project
- [ ] **Take Screenshot 14: Overview dashboard**
- [ ] **Take Screenshot 15: Issues list**
- [ ] **Take Screenshot 16: Specific vulnerability**
- [ ] **Take Screenshot 17: Security hotspots**
- [ ] **Take Screenshot 18: Code smells**

#### Step 9: Frontend Analysis (15 min)
- [ ] Navigate to frontend project
- [ ] **Take Screenshot 19: Overview dashboard**
- [ ] **Take Screenshot 20: Security issues**
- [ ] **Take Screenshot 21: Code quality issues**
- [ ] **Take Screenshot 22: Metrics**

#### Step 10: Review & Document (10 min)
- [ ] Review all Quality Gates
- [ ] Note down key metrics
- [ ] Identify patterns in issues

#### Deliverables from Phase 3:
- 10 screenshots saved
- Both projects analyzed in SonarQube Cloud
- Quality metrics recorded

---

### **PHASE 4: OWASP ZAP DAST (180 minutes)**

#### Step 11: ZAP Installation (15 min)
- [ ] Download OWASP ZAP
- [ ] Install application
- [ ] Launch and familiarize with UI
- [ ] **Take Screenshot 23: Initial screen**

#### Step 12: Application Setup (15 min)
- [ ] Open Terminal 1: Start Go backend
- [ ] **Take Screenshot 24: Backend running**
- [ ] Open Terminal 2: Start React frontend
- [ ] **Take Screenshot 25: Frontend running**
- [ ] Create test user in browser
- [ ] Create 2-3 test articles
- [ ] **Take Screenshot 26: Test user**

#### Step 13: Passive Scan (20 min)
- [ ] Configure Automated Scan in ZAP
- [ ] **Take Screenshot 27: Config**
- [ ] Start scan
- [ ] Monitor spider progress
- [ ] **Take Screenshot 28: Spider progress**
- [ ] Wait for completion (10-15 min)
- [ ] **Take Screenshot 29: Alerts summary**
- [ ] **Take Screenshot 30: High alert details**
- [ ] **Take Screenshot 31: Security headers**
- [ ] Export HTML report

#### Step 14: Active Scan Setup (30 min)
- [ ] Create authentication context
- [ ] **Take Screenshot 32: Context config**
- [ ] Configure JSON authentication
- [ ] **Take Screenshot 33: Auth config**
- [ ] Set up user credentials
- [ ] Test authentication
- [ ] Launch active scan
- [ ] **Take Screenshot 34: Launch dialog**

#### Step 15: Active Scan Execution (60 min)
- [ ] Wait for scan to run (30-60 min)
- [ ] **Take Screenshot 35: Progress (after 10-15 min)**
- [ ] Continue waiting for completion
- [ ] Review results when complete
- [ ] **Take Screenshot 36: Vulnerability summary**
- [ ] **Take Screenshot 37: SQL injection (if found)**
- [ ] **Take Screenshot 38: XSS (if found)**
- [ ] **Take Screenshot 39: Auth issues (if found)**
- [ ] Export HTML, XML, JSON reports

#### Step 16: API Security Testing (20 min)
- [ ] Test API endpoints manually
- [ ] **Take Screenshot 40: Endpoints list**
- [ ] Test authentication bypass
- [ ] Test authorization flaws
- [ ] **Take Screenshot 41: Request/response**
- [ ] Document findings

#### Step 17: Implement Fixes (20 min)
- [ ] Add security headers to backend code
- [ ] **Take Screenshot 42: Code changes**
- [ ] Restart backend server
- [ ] Test headers in ZAP
- [ ] **Take Screenshot 43: Headers verification**

#### Step 18: Final Verification (20 min)
- [ ] Run final ZAP scan
- [ ] **Take Screenshot 44: Improved results**
- [ ] Compare before/after
- [ ] Export final reports

#### Deliverables from Phase 4:
- 23 screenshots saved
- 4 ZAP reports exported
- Security headers implemented
- Before/after comparison documented

---

### **PHASE 5: DOCUMENTATION (90 minutes)**

#### Step 19: Code Changes Documentation (10 min)
- [ ] **Take Screenshot 45: package.json updates**
- [ ] **Take Screenshot 46: go.mod updates**
- [ ] **Take Screenshot 47: Final Snyk dashboard**

#### Step 20: Create Analysis Documents (60 min)

Create the following markdown files in `analysis/` directory:

1. **snyk-backend-analysis.md** (10 min)
   - Vulnerability summary
   - Critical/high severity issues
   - Dependency analysis

2. **snyk-frontend-analysis.md** (10 min)
   - Dependency vulnerabilities
   - Code vulnerabilities
   - React-specific issues

3. **snyk-remediation-plan.md** (10 min)
   - Critical issues (must fix)
   - High priority issues
   - Medium/low priority
   - Update strategy

4. **snyk-fixes-applied.md** (5 min)
   - Issues fixed
   - Changes made
   - Before/after results

5. **sonarqube-backend-analysis.md** (5 min)
   - Quality Gate status
   - Code metrics
   - Issues by category

6. **sonarqube-frontend-analysis.md** (5 min)
   - Quality Gate status
   - JS/React issues
   - Security vulnerabilities

7. **security-hotspots-review.md** (5 min)
   - Hotspot descriptions
   - Risk assessments

8. **zap-passive-scan-analysis.md** (5 min)
   - Alerts summary
   - High priority findings

9. **zap-active-scan-analysis.md** (10 min)
   - Vulnerability summary
   - Critical/high vulnerabilities
   - OWASP Top 10 mapping

10. **zap-api-security-analysis.md** (5 min)
    - API-specific findings
    - Authentication tests
    - Authorization tests

11. **security-headers-analysis.md** (5 min)
    - Headers implemented
    - Purpose of each header
    - Verification results

12. **final-security-assessment.md** (10 min)
    - Before/after comparison
    - Risk score improvement
    - Outstanding issues

#### Step 21: Create Final Report (20 min)
- [ ] Create `ASSIGNMENT_2_REPORT.md`
- [ ] Executive summary
- [ ] Key findings across all tools
- [ ] Improvements made
- [ ] Remaining risks
- [ ] Lessons learned

#### Deliverables from Phase 5:
- 14+ analysis documents
- 1 comprehensive final report
- All screenshots properly organized

---

## 📊 GRADING ALIGNMENT

| Deliverable | Points | Time | Completion Criteria |
|-------------|--------|------|---------------------|
| Snyk Backend Analysis | 8 | 30 min | Complete vulnerability documentation |
| Snyk Frontend Analysis | 8 | 30 min | Code + dependency analysis |
| Snyk Remediation & Fixes | 9 | 20 min | 3+ issues fixed with verification |
| SonarQube Backend | 8 | 15 min | Complete analysis, all metrics |
| SonarQube Frontend | 8 | 15 min | Quality + security issues |
| SonarQube Improvements | 10 | 30 min | Measurable improvement documented |
| ZAP Passive Scan | 8 | 20 min | Complete scan, findings documented |
| ZAP Active Scan | 15 | 90 min | Authenticated scan, all vulns found |
| ZAP API Testing | 10 | 20 min | API-specific vulnerabilities |
| Security Fixes | 15 | 30 min | Headers + fixes implemented |
| Security Headers | 5 | 10 min | All headers present |
| Documentation | 5 | 60 min | Clear, professional reports |
| **TOTAL** | **109** | **6h** | **(Plus 91 from quality)** |

---

## ⚠️ CRITICAL SUCCESS FACTORS

### Must-Do Items:
1. ✅ **Take screenshots IMMEDIATELY when prompted** - Don't skip any
2. ✅ **Save reports in correct directories** - Organization matters
3. ✅ **Keep applications running** during ZAP scans - Don't close terminals
4. ✅ **Document before/after** for all fixes - Show improvement
5. ✅ **Fix at least 3 critical issues** - Required for full points
6. ✅ **Complete authenticated active scan** - Most important ZAP component
7. ✅ **Export all reports** before closing tools

### Common Mistakes to Avoid:
1. ❌ Skipping screenshots ("I'll come back to it")
2. ❌ Not waiting for active scan to complete
3. ❌ Forgetting to configure authentication in ZAP
4. ❌ Closing applications during scans
5. ❌ Not documenting what was fixed
6. ❌ Copying findings without analysis
7. ❌ Rushing documentation phase

---

## 🔧 RISK MITIGATION

### If Active Scan Takes Too Long:
**Option 1:** Reduce scan policy to specific tests (SQLi, XSS, etc.)  
**Option 2:** Lower thread count in Options  
**Option 3:** Run overnight and take screenshots in morning

### If Critical Vulnerabilities Can't Be Fixed:
- Document why (breaking changes, no patch available)
- Propose workaround or mitigation
- Still fix other lower-severity issues

### If SonarQube GitHub Integration Fails:
- Use CLI scanner instead
- Or manually upload code
- Document setup issues in report

### If Running Out of Time:
**Priority Order:**
1. Complete all tool scans (even if documentation is brief)
2. Take all required screenshots
3. Implement at least 1-2 critical fixes
4. Complete basic documentation
5. Polish documentation later if time permits

---

## 📅 RECOMMENDED SCHEDULE

### **Session 1 (2 hours): SAST Tools**
- Snyk setup and scanning (1 hour)
- SonarQube setup and analysis (1 hour)

### **Session 2 (3 hours): DAST & Fixes**
- ZAP setup and passive scan (1 hour)
- Active scan setup and execution (1.5 hours)
- API testing (30 minutes)

### **Session 3 (2 hours): Remediation & Documentation**
- Implement security fixes (30 minutes)
- Final verification (30 minutes)
- Complete all analysis documents (1 hour)

### **Session 4 (1 hour): Final Report**
- Review all materials
- Create comprehensive final report
- Organize and verify all deliverables

**Total: 8 hours** (with buffer time)

---

## ✅ FINAL CHECKLIST BEFORE SUBMISSION

### Files to Submit:
- [ ] All 47 screenshots properly named and organized
- [ ] All 14 analysis documents completed
- [ ] ASSIGNMENT_2_REPORT.md with executive summary
- [ ] All JSON/HTML/XML reports from tools
- [ ] Updated package.json and go.mod (if fixes applied)
- [ ] Security headers implementation code

### Quality Check:
- [ ] All screenshots are clear and readable
- [ ] All analysis documents have meaningful content (not templates)
- [ ] Before/after comparisons are documented
- [ ] At least 3 vulnerabilities were fixed
- [ ] All grading criteria addressed
- [ ] Proper markdown formatting
- [ ] No placeholder text or TODOs left

### Verification:
- [ ] Total file count matches expectations
- [ ] File sizes reasonable (screenshots not too large)
- [ ] All links work (if any internal references)
- [ ] Spell check completed
- [ ] Grammar review done

---

## 🎓 LEARNING OUTCOMES

By completing this assignment, you will:

1. **Understand SAST vs DAST** - Different approaches to security testing
2. **Use industry tools** - Snyk, SonarQube, OWASP ZAP
3. **Identify vulnerabilities** - Recognize common security issues
4. **Prioritize risks** - Understand severity and impact
5. **Implement fixes** - Apply security best practices
6. **Verify improvements** - Measure security posture changes
7. **Document professionally** - Create security reports

---

## 📚 REFERENCE MATERIALS

Keep these open during work:

1. **OWASP Top 10:** https://owasp.org/www-project-top-ten/
2. **Snyk Docs:** https://docs.snyk.io/
3. **SonarQube Docs:** https://docs.sonarqube.org/
4. **ZAP Docs:** https://www.zaproxy.org/docs/
5. **CWE Database:** https://cwe.mitre.org/
6. **Assignment Requirements:** ASSIGNMENT_2.md

---

## 🚀 YOU'RE READY TO START!

### Before You Begin:
1. ✅ Read through this entire plan
2. ✅ Read COMMANDS_TO_RUN.md thoroughly
3. ✅ Read SCREENSHOTS.md for screenshot requirements
4. ✅ Verify all prerequisites are met
5. ✅ Set aside uninterrupted time (4-6 hours)
6. ✅ Have screenshot tool ready
7. ✅ Create directory structure

### Starting Point:
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\Assignment_02"

# Follow COMMANDS_TO_RUN.md step by step
# Take screenshots as prompted
# Save everything as you go
```

---

## 💬 APPROVAL TO PROCEED

**Please review this plan and confirm you understand:**

1. ⏱️ **Time Commitment:** 4-6 hours of focused work
2. 📸 **Screenshot Requirements:** 47 screenshots to capture
3. 📝 **Documentation:** 15+ documents to create
4. 🔧 **Technical Setup:** Multiple tools to install and configure
5. 🎯 **Deliverables:** Clear understanding of what needs to be submitted

**Ready to proceed?** 

Type "YES" to confirm you've reviewed this plan and are ready to start, or ask any questions before we begin implementation.

---

**After your approval, I will:**
1. Create the directory structure
2. Create template documents for analysis
3. Guide you through each phase step-by-step
4. Help you troubleshoot any issues
5. Review deliverables before submission

