# Assignment 2: Static & Dynamic Application Security Testing (SAST & DAST)

## 📋 Overview

This folder contains all deliverables for Assignment 2, organized by task according to the assignment requirements. The assignment demonstrates comprehensive security testing using industry-standard tools (Snyk, SonarQube, OWASP ZAP) on the RealWorld Conduit full-stack application.

---

## 📂 Folder Structure

```
Assignment_02/
├── Task1_Snyk/              # SAST with Snyk (50 points)
│   ├── README.md
│   ├── snyk-backend-report.json
│   ├── snyk-frontend-report.json
│   ├── snyk-code-report.json
│   └── screenshots/
│
├── Task2_SonarQube/         # SAST with SonarQube (50 points)
│   ├── README.md
│   ├── sonarqube-backend-analysis.md (467 lines)
│   ├── sonarqube-frontend-analysis.md
│   ├── security-hotspots-review.md (558 lines)
│   ├── sonarqube-improvements.md
│   ├── SECURITY_HOTSPOTS_REVIEW_GUIDE.md
│   ├── BEFORE_AFTER_COMPARISON.md
│   ├── FINAL_COVERAGE_SUMMARY.md
│   └── screenshots/
│       ├── backend/ (5 screenshots)
│       └── frontend/ (4 screenshots)
│
├── Task3_ZAP/               # DAST with OWASP ZAP (100 points)
│   ├── README.md
│   ├── zap-passive-scan-analysis.md
│   ├── zap-active-scan-analysis.md
│   ├── zap-api-security-analysis.md
│   ├── zap-fixes-applied.md
│   ├── final-security-assessment.md
│   ├── ZAP_IMPLEMENTATION_GUIDE.md
│   └── screenshots/
│
└── README.md (this file)
```

---

## 🎯 Quick Navigation

### Task 1: SAST with Snyk (50 points)
**Location**: `Task1_Snyk/`

**Status**: Reports generated ✅ | Analysis documents pending ⏳

**What's Inside**:
- Snyk JSON reports (backend, frontend, code analysis)
- Analysis documents (to be created from reports)
- Remediation plan
- Fix documentation
- Screenshots

[📖 Read Task 1 README](Task1_Snyk/README.md)

---

### Task 2: SAST with SonarQube (50 points)
**Location**: `Task2_SonarQube/`

**Status**: ✅ Complete (pending 5-min manual hotspot review)

**What's Inside**:
- Complete backend analysis (467 lines)
- Complete frontend analysis
- Security hotspots review (558 lines)
- Before/after comparison showing **+36.93% coverage improvement**
- **262 passing tests** (from ~50)
- 9 screenshots documenting metrics
- CI/CD workflows integrated

**Key Achievement**: 
- Frontend coverage: 77.81% (from 40.88%)
- 7 components modernized (deprecated patterns removed)
- Professional-grade test suite

[📖 Read Task 2 README](Task2_SonarQube/README.md)

---

### Task 3: DAST with OWASP ZAP (100 points)
**Location**: `Task3_ZAP/`

**Status**: Analysis documents complete ✅ | ZAP reports pending ⏳

**What's Inside**:
- Passive scan analysis
- Active scan analysis (authenticated)
- API security testing
- Security fixes applied
- Final security assessment
- Implementation guides

**Required**: Export ZAP HTML/XML/JSON reports

[📖 Read Task 3 README](Task3_ZAP/README.md)

---

## 📊 Assignment Deliverables Checklist

### Task 1: Snyk (50 points)

**Reports**:
- [x] snyk-backend-report.json
- [x] snyk-frontend-report.json
- [x] snyk-code-report.json

**Analysis Documents** (to be created):
- [ ] snyk-backend-analysis.md
- [ ] snyk-frontend-analysis.md
- [ ] snyk-remediation-plan.md
- [ ] snyk-fixes-applied.md

**Screenshots**:
- [ ] Snyk dashboard before/after
- [ ] Vulnerability severity breakdown
- [ ] Fixed vulnerabilities

---

### Task 2: SonarQube (50 points)

**Analysis Documents**:
- [x] sonarqube-backend-analysis.md (467 lines)
- [x] sonarqube-frontend-analysis.md
- [x] security-hotspots-review.md (558 lines)
- [x] sonarqube-improvements.md

**Supporting Docs**:
- [x] SECURITY_HOTSPOTS_REVIEW_GUIDE.md
- [x] BEFORE_AFTER_COMPARISON.md
- [x] FINAL_COVERAGE_SUMMARY.md

**Screenshots**:
- [x] Backend: 5 screenshots (dashboard, issues, vulnerabilities, hotspots, code smells)
- [x] Frontend: 4 screenshots (security, quality, metrics, updates)

**Outstanding**:
- [ ] Manual security hotspot review in SonarCloud UI (5 minutes)

---

### Task 3: OWASP ZAP (100 points)

**Analysis Documents**:
- [x] zap-passive-scan-analysis.md
- [x] zap-active-scan-analysis.md
- [x] zap-api-security-analysis.md
- [x] zap-fixes-applied.md
- [x] final-security-assessment.md

**ZAP Reports** (to be exported):
- [ ] zap-passive-report.html
- [ ] zap-active-report.html
- [ ] zap-active-report.xml
- [ ] zap-active-report.json

**Additional**:
- [ ] security-headers-analysis.md
- [ ] Screenshots of ZAP testing

---

## 🎓 Grading Summary

| Task | Points | Status | Notes |
|------|--------|--------|-------|
| **Task 1: Snyk** | 50 | ⏳ In Progress | Reports generated, analysis docs needed |
| Snyk Backend Analysis | 8 | ⏳ | JSON report ready |
| Snyk Frontend Analysis | 8 | ⏳ | JSON reports ready |
| Remediation Plan | 15 | ⏳ | To be created |
| Fixes Applied | 15 | ⏳ | To be documented |
| Documentation | 4 | ⏳ | To be completed |
| | | | |
| **Task 2: SonarQube** | 50 | ✅ 46-50 | Nearly complete |
| Backend Analysis | 8 | ✅ | 467-line comprehensive analysis |
| Frontend Analysis | 8 | ✅ | Coverage progression documented |
| Security Hotspots | 8 | ⚠️ 6-8 | Analyzed, needs UI review |
| Improvements | 10 | ✅ | Before/after metrics complete |
| Implementation | 16 | ✅ | 77.81% coverage, 262 tests |
| | | | |
| **Task 3: OWASP ZAP** | 100 | ⏳ In Progress | Analysis docs complete |
| Passive Scan | 8 | ✅ | Analysis documented |
| Active Scan | 15 | ✅ | Analysis documented |
| API Testing | 10 | ✅ | Analysis documented |
| Security Fixes | 15 | ✅ | Fixes documented |
| Security Headers | 5 | ⏳ | Implementation needed |
| Final Assessment | 15 | ✅ | Assessment complete |
| Documentation | 10 | ✅ | Comprehensive guides |
| Implementation | 22 | ⏳ | Fixes verification needed |
| | | | |
| **Total** | **200** | **~140-150** | ~70-75% complete |

---

## 🚀 Quick Start Guide

### For Submission Review (15 minutes)

1. **Start with Task 2 (Most Complete)**:
   - Open `Task2_SonarQube/README.md`
   - Review `FINAL_COVERAGE_SUMMARY.md` for achievements
   - Check `BEFORE_AFTER_COMPARISON.md` for detailed metrics
   - View screenshots in `screenshots/` folders

2. **Review Task 3 Analysis**:
   - Open `Task3_ZAP/README.md`
   - Review analysis documents
   - Note: ZAP HTML/XML/JSON reports need to be exported

3. **Check Task 1 Reports**:
   - Open `Task1_Snyk/README.md`
   - JSON reports are ready
   - Analysis documents need to be created from JSON data

### For Completing Remaining Work

**Priority 1: Task 2 (5 minutes)**
- Complete manual security hotspot review in SonarCloud UI
- Follow guide: `Task2_SonarQube/SECURITY_HOTSPOTS_REVIEW_GUIDE.md`
- Capture screenshot showing 100% reviewed

**Priority 2: Task 1 (2-3 hours)**
- Create analysis documents from JSON reports
- Document vulnerabilities found
- Create remediation plan
- Implement and verify fixes

**Priority 3: Task 3 (2-3 hours)**
- Export ZAP reports (HTML, XML, JSON)
- Create security headers analysis
- Capture screenshots of ZAP testing
- Verify all fixes implemented

---

## 📈 Key Achievements (Task 2 - SonarQube)

### Quantitative Improvements
- **+36.93% frontend coverage** (40.88% → 77.81%)
- **+212 tests created** (50 → 262)
- **0 failing tests** (100% pass rate)
- **7 components modernized** (deprecated lifecycles removed)
- **2 CI/CD workflows** (automated analysis)

### Qualitative Improvements
- Modern React patterns (componentDidMount, componentDidUpdate)
- Comprehensive Redux reducer testing (88.4% coverage)
- Component isolation testing (React Testing Library)
- Integration tests for complex workflows
- Professional documentation (6 comprehensive files)

### Technical Debt Reduction
- Removed deprecated React lifecycle methods
- Fixed PropTypes warnings
- Improved code maintainability
- Established quality gate standards

---

## 🔗 External Resources

### SonarCloud Project
- **URL**: https://sonarcloud.io/project/overview?id=SWE302_Assignment_2_RealWorld_Full_Stack
- **Organization**: rynorbu
- **Status**: Active, analyzing on every commit

### GitHub Repository
- **URL**: https://github.com/Rynorbu/AS2025_SWE302_Assignments
- **Branch**: main
- **CI/CD**: GitHub Actions workflows running

### Documentation References
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Snyk Documentation](https://docs.snyk.io/)
- [SonarQube Cloud Docs](https://docs.sonarsource.com/sonarqube-cloud/)
- [OWASP ZAP Docs](https://www.zaproxy.org/docs/)

---

## 📝 Submission Notes

### What's Ready for Submission

**Task 2 (SonarQube)** - ✅ 90% Complete:
- All analysis documents complete
- All screenshots captured
- CI/CD workflows active
- Code improvements implemented
- Only needs: 5-minute manual hotspot review

### What Needs Completion

**Task 1 (Snyk)** - 40% Complete:
- JSON reports generated ✅
- Need to create analysis markdown files
- Need to document fixes applied
- Need to capture screenshots

**Task 3 (OWASP ZAP)** - 70% Complete:
- Analysis documents complete ✅
- Need to export ZAP reports (HTML, XML, JSON)
- Need to capture testing screenshots
- Need security headers implementation doc

### Time Estimates
- Complete Task 2: 5 minutes
- Complete Task 1: 2-3 hours
- Complete Task 3: 2-3 hours
- **Total remaining**: ~5-7 hours

---

## 🎯 Final Status

```
┌─────────────────────────────────────────────┐
│   ASSIGNMENT 2: SECURITY TESTING            │
│                                             │
│   Overall Progress: ~70-75%                 │
│                                             │
│   ✅ Task 2 (SonarQube): 90% Complete       │
│   ⏳ Task 1 (Snyk): 40% Complete            │
│   ⏳ Task 3 (ZAP): 70% Complete             │
│                                             │
│   📊 Current Score: ~140-150 / 200 points   │
│   🎯 Target: 180+ / 200 points              │
│                                             │
│   ⏰ Estimated Completion: 5-7 hours        │
└─────────────────────────────────────────────┘
```

---

**Organization Date**: December 2, 2024  
**Assignment Deadline**: November 30, 2025  
**Student**: SWE302 Assignment 2  
**Project**: RealWorld Full Stack Security Testing

---

## 📞 Navigation Quick Links

- [Task 1: Snyk Documentation](Task1_Snyk/README.md)
- [Task 2: SonarQube Documentation](Task2_SonarQube/README.md)
- [Task 3: ZAP Documentation](Task3_ZAP/README.md)
- [Assignment Requirements](../ASSIGNMENT_2.md)

**Everything is now organized and ready for systematic completion and submission!** 🎉
