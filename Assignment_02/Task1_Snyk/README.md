# Task 1: SAST with Snyk (50 points)

## Overview
This folder contains all deliverables for Task 1 - Static Application Security Testing using Snyk.

## 📂 Contents

### Reports (JSON Format)
- ✅ `snyk-backend-report.json` - Backend Go dependency vulnerabilities
- ✅ `snyk-frontend-report.json` - Frontend npm dependency vulnerabilities
- ✅ `snyk-code-report.json` - Source code security analysis

### Analysis Documents
> **Note**: Analysis documents should be created based on the JSON reports above.

**Required Deliverables** (as per assignment):
1. `snyk-backend-analysis.md` - Backend vulnerability analysis
   - Vulnerability summary
   - Critical/High severity issues
   - Dependency analysis
   
2. `snyk-frontend-analysis.md` - Frontend vulnerability analysis
   - Dependency vulnerabilities
   - Code vulnerabilities (from snyk code test)
   - React-specific issues
   
3. `snyk-remediation-plan.md` - Prioritized remediation plan
   - Critical issues (must fix immediately)
   - High priority issues
   - Medium/Low priority issues
   - Dependency update strategy
   
4. `snyk-fixes-applied.md` - Documentation of fixes implemented
   - Issues fixed
   - Changes made
   - Before/after comparison
   - Screenshots of Snyk dashboard

### Screenshots
- `screenshots/` - Snyk dashboard screenshots showing:
  - Before/after vulnerability counts
  - Severity breakdown
  - Fixed vulnerabilities
  - Updated dashboard

## 🎯 Assignment Requirements

### Deliverable Checklist
- [ ] snyk-backend-analysis.md
- [ ] snyk-frontend-analysis.md
- [ ] snyk-remediation-plan.md
- [ ] snyk-fixes-applied.md
- [x] snyk-backend-report.json
- [x] snyk-frontend-report.json
- [x] snyk-code-report.json
- [ ] Screenshots of Snyk dashboard

### Grading Criteria (50 points)
- **Snyk Backend Analysis (8 pts)**: Thorough analysis, all vulnerabilities documented
- **Snyk Frontend Analysis (8 pts)**: Code and dependency analysis complete
- **Remediation Plan (15 pts)**: Prioritized plan with clear action items
- **Fixes Applied (15 pts)**: Critical issues fixed and verified
- **Documentation (4 pts)**: Clear, professional documentation

## 📊 Key Findings Summary

### Backend (Go)
- **Total Vulnerabilities**: [To be documented]
- **Critical/High**: [To be documented]
- **Medium/Low**: [To be documented]

### Frontend (React)
- **Dependency Vulnerabilities**: [To be documented]
- **Code Vulnerabilities**: [To be documented]
- **React-Specific Issues**: [To be documented]

## ⚙️ How to Reproduce

### Backend Scan
```bash
cd golang-gin-realworld-example-app
snyk test --json > snyk-backend-report.json
snyk monitor
```

### Frontend Scan
```bash
cd react-redux-realworld-example-app
snyk test --json > snyk-frontend-report.json
snyk code test --json > snyk-code-report.json
snyk monitor
```

## 🔗 References
- [Snyk Documentation](https://docs.snyk.io/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CVE Database](https://cve.mitre.org/)

---

**Status**: Reports generated ✅ | Analysis pending ⏳  
**Last Updated**: December 2024
