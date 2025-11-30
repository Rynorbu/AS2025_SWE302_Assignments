# Assignment 2 - Quick Reference Guide

## 🎯 Assignment at a Glance

| Component | Tool | Time | Screenshots | Points |
|-----------|------|------|-------------|--------|
| **Backend SAST** | Snyk | 30 min | 5 | 25 |
| **Frontend SAST** | Snyk | 30 min | 7 | 25 |
| **Backend Code Quality** | SonarQube | 15 min | 6 | 25 |
| **Frontend Code Quality** | SonarQube | 15 min | 4 | 25 |
| **Dynamic Security Testing** | OWASP ZAP | 120 min | 23 | 100 |
| **Documentation** | Markdown | 60 min | 2 | - |
| **TOTAL** | | **~6 hours** | **47** | **200** |

---

## 📋 The 3 Core Documents You Need

1. **IMPLEMENTATION_PLAN.md** ← READ THIS FIRST
   - Complete overview and timeline
   - Phase-by-phase breakdown
   - Quality checklist

2. **COMMANDS_TO_RUN.md** ← FOLLOW THIS DURING WORK
   - Exact commands to run
   - When to take each screenshot
   - Expected outputs

3. **SCREENSHOTS.md** ← REFERENCE FOR SCREENSHOTS
   - All 47 screenshots listed
   - What to capture in each
   - File naming conventions

---

## 🚦 3-Phase Execution Plan

### PHASE 1: STATIC TESTING (2 hours)
```
Install Snyk → Scan Backend → Scan Frontend → Set up SonarQube → Analyze Both
Screenshots: 1-22
```

### PHASE 2: DYNAMIC TESTING (3 hours)
```
Install ZAP → Start Apps → Passive Scan → Active Scan → API Testing → Implement Fixes
Screenshots: 23-44
```

### PHASE 3: DOCUMENTATION (1 hour)
```
Create Analysis Docs → Take Final Screenshots → Write Final Report
Screenshots: 45-47
```

---

## ⚡ Quick Start (5 minutes)

```powershell
# 1. Navigate to Assignment 2 directory
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\Assignment_02"

# 2. Create folder structure
mkdir screenshots\snyk\backend, screenshots\snyk\frontend
mkdir screenshots\sonarqube\backend, screenshots\sonarqube\frontend
mkdir screenshots\zap\setup, screenshots\zap\passive, screenshots\zap\active
mkdir screenshots\zap\api, screenshots\zap\final
mkdir reports, analysis

# 3. Install Snyk (first tool)
npm install -g snyk

# 4. Open COMMANDS_TO_RUN.md
code COMMANDS_TO_RUN.md

# 5. Start following commands from Step 1
```

---

## 🔑 Critical Commands Cheat Sheet

### Snyk
```powershell
snyk auth                           # Authenticate
snyk test                           # Scan dependencies
snyk code test                      # Scan source code
snyk monitor                        # Upload to dashboard
snyk test --json > report.json      # Generate report
```

### SonarQube
```
1. Go to https://sonarcloud.io
2. Connect GitHub repository
3. Wait for automatic analysis
4. Review dashboard
```

### OWASP ZAP
```
1. Launch ZAP Desktop App
2. Automated Scan → http://localhost:4100
3. Configure authentication for Active Scan
4. Export HTML/XML/JSON reports
```

### Starting Applications
```powershell
# Terminal 1 - Backend
cd golang-gin-realworld-example-app
go run hello.go

# Terminal 2 - Frontend  
cd react-redux-realworld-example-app
npm start
```

---

## 📸 Screenshot Checklist (Quick)

- [ ] **1-5:** Snyk Backend (auth, scan, dashboard)
- [ ] **6-12:** Snyk Frontend (scan, code test, fixes)
- [ ] **13-18:** SonarQube Backend (dashboard, issues)
- [ ] **19-22:** SonarQube Frontend (dashboard, quality)
- [ ] **23-26:** ZAP Setup (install, apps running, test user)
- [ ] **27-31:** ZAP Passive (config, alerts, headers)
- [ ] **32-39:** ZAP Active (auth, scan, vulnerabilities)
- [ ] **40-41:** API Testing (endpoints, requests)
- [ ] **42-44:** Fixes & Verification (code, headers, results)
- [ ] **45-47:** Final Evidence (package updates, dashboard)

---

## 📝 Documents to Create (Quick)

### After Snyk (4 docs):
1. `snyk-backend-analysis.md`
2. `snyk-frontend-analysis.md`
3. `snyk-remediation-plan.md`
4. `snyk-fixes-applied.md`

### After SonarQube (3 docs):
5. `sonarqube-backend-analysis.md`
6. `sonarqube-frontend-analysis.md`
7. `security-hotspots-review.md`

### After ZAP (4 docs):
8. `zap-passive-scan-analysis.md`
9. `zap-active-scan-analysis.md`
10. `zap-api-security-analysis.md`
11. `security-headers-analysis.md`

### Final (2 docs):
12. `final-security-assessment.md`
13. `ASSIGNMENT_2_REPORT.md`

---

## ⏱️ Time Management Tips

| If you have... | Do this... |
|----------------|------------|
| **6+ hours** | Follow full plan, take all screenshots, detailed documentation |
| **4-5 hours** | Follow plan, take all screenshots, streamlined documentation |
| **3-4 hours** | Focus on scans & screenshots, basic documentation |
| **2-3 hours** | Run scans, key screenshots only, minimal docs |

**Minimum for passing grade:** All scans completed, 30+ screenshots, basic analysis docs

---

## 🚨 Common Issues & Quick Fixes

| Problem | Solution |
|---------|----------|
| `snyk: command not found` | `npm install -g snyk` |
| Snyk auth fails | `snyk config clear` then `snyk auth` again |
| Backend won't start | Check if port 8080 in use: `netstat -ano \| findstr :8080` |
| Frontend won't start | Check if port 4100 in use, or run `npm install --legacy-peer-deps` |
| ZAP active scan too slow | Reduce to OWASP Top 10 policy, decrease threads |
| Can't authenticate in ZAP | Verify JSON format, test login manually first |
| Screenshots blurry | Increase terminal font size, maximize windows |
| Running out of time | Prioritize: Scans → Screenshots → Basic docs |

---

## 🎯 Must-Have for Submission

### Minimum Requirements:
✅ 30+ clear screenshots  
✅ All scan reports exported (JSON/HTML)  
✅ At least 10 analysis documents  
✅ Final summary report  
✅ Evidence of 3+ fixes applied  
✅ Before/after comparison  

### For Full Points:
✅ All 47 screenshots  
✅ All 13 analysis documents  
✅ Comprehensive final report  
✅ Security headers implemented  
✅ Detailed vulnerability analysis  
✅ Professional documentation  

---

## 📞 Resources & Links

| Resource | URL |
|----------|-----|
| Snyk | https://snyk.io |
| SonarQube Cloud | https://sonarcloud.io |
| OWASP ZAP | https://www.zaproxy.org/download/ |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |
| Snyk Docs | https://docs.snyk.io/ |
| SonarQube Docs | https://docs.sonarqube.org/ |
| ZAP Docs | https://www.zaproxy.org/docs/ |

---

## 🏁 Starting Checklist

Before you begin:
- [ ] Read IMPLEMENTATION_PLAN.md
- [ ] Have 4-6 hours available
- [ ] Node.js, Go, Git installed
- [ ] Screenshot tool ready (Win + Shift + S)
- [ ] Created folder structure
- [ ] Both apps can run locally
- [ ] Good internet connection

**All set?** → Start with **COMMANDS_TO_RUN.md Step 1**

---

## 💡 Pro Tips

1. **Take screenshots IMMEDIATELY** - Don't wait or you'll forget
2. **Name files descriptively** - Use the suggested naming convention
3. **Keep terminals open** - Don't close while ZAP is scanning
4. **Document as you go** - Don't leave all documentation for the end
5. **Save frequently** - Don't lose work
6. **Read error messages** - They usually tell you what's wrong
7. **Test fixes** - Re-run scans to verify improvements
8. **Use copy-paste** - For commands, URLs, JSON structures

---

## 📊 Progress Tracker

Use this to track your progress:

```
PHASE 1 - SAST
├── [ ] Snyk installed and authenticated
├── [ ] Backend scanned (Screenshots 1-5)
├── [ ] Frontend scanned (Screenshots 6-12)
├── [ ] SonarQube Cloud setup (Screenshot 13)
├── [ ] Backend analyzed (Screenshots 14-18)
└── [ ] Frontend analyzed (Screenshots 19-22)

PHASE 2 - DAST
├── [ ] ZAP installed (Screenshot 23)
├── [ ] Apps running (Screenshots 24-26)
├── [ ] Passive scan complete (Screenshots 27-31)
├── [ ] Active scan complete (Screenshots 32-39)
├── [ ] API testing done (Screenshots 40-41)
└── [ ] Fixes implemented (Screenshots 42-44)

PHASE 3 - DOCUMENTATION
├── [ ] Final screenshots (45-47)
├── [ ] All analysis docs created
└── [ ] Final report completed

SUBMISSION
├── [ ] All files organized
├── [ ] Quality check done
└── [ ] Ready to submit!
```

---

## 🎓 What You'll Learn

1. How to use industry-standard security tools
2. Difference between static and dynamic testing
3. Identifying and prioritizing vulnerabilities
4. Implementing security fixes
5. Professional security documentation
6. OWASP Top 10 vulnerabilities
7. Security best practices for web applications

---

**Good luck! Follow COMMANDS_TO_RUN.md and you'll do great! 🚀**

Need help? Refer back to:
- IMPLEMENTATION_PLAN.md for details
- SCREENSHOTS.md for what to capture
- This guide for quick reference
