# k6 Performance Testing - Assignment 3

## 📁 Organized Folder Structure

```
k6-tests/
├── 📂 scripts/          Test scripts and configuration files
├── 📂 results/          JSON output from test runs
├── 📂 reports/          Analysis and findings documents
├── 📂 docs/             Documentation and guides
└── 📄 README.md         This file
```

---

## 📂 Folder Details

### `/scripts/` - Test Scripts (7 files)
All executable k6 test files and configurations:
- **config.js** - Base URL, thresholds, test user credentials
- **helpers.js** - Reusable helper functions (login, register, auth)
- **load-test.js** - Load testing (7 minutes, 10-50 VUs)
- **stress-test.js** - Stress testing (11 minutes, 10-30 VUs)
- **spike-test.js** - Spike testing (6.5 minutes, 5-50 VUs)
- **soak-test.js** - Soak testing (12 minutes, 10 VUs)
- **simple-test.js** - Simple baseline test

### `/results/` - Test Results (5 files, ~453 MB)
JSON output files from test executions:
- **load-test-results.json** (16 MB) - Before optimization
- **load-test-optimized-results.json** (16.1 MB) - After optimization
- **stress-test-results.json** (66.5 MB) - Stress test data
- **spike-test-results.json** (339.8 MB) - Spike test data
- **soak-test-results.json** (15 MB) - Soak test data

### `/reports/` - Analysis Reports (4 files)
Detailed analysis of test results:
- **k6-load-test-analysis.md** - Load test findings and metrics
- **k6-stress-test-analysis.md** - Breaking point analysis
- **k6-spike-test-analysis.md** - Spike handling and recovery
- **k6-soak-test-analysis.md** - Long-term stability assessment

### `/docs/` - Documentation (5 files)
Guides and reference materials:
- **README.md** - Basic test information
- **QUICK_START.md** - How to run tests
- **CHECKLIST.md** - Assignment requirements tracker
- **FILE_INDEX.md** - Complete file navigation guide
- **K6_TESTS_SUMMARY.md** - Comprehensive overview

---

## 🚀 Quick Start

### 1. Ensure Backend is Running
```powershell
cd golang-gin-realworld-example-app
go run main.go
# Backend should be on http://localhost:8080
```

### 2. Run Tests
```powershell
cd Assignment_03/k6-tests/scripts

# Run individual tests
k6 run load-test.js
k6 run stress-test.js
k6 run spike-test.js
k6 run soak-test.js

# Save results to results folder
k6 run --out json=../results/load-test-results.json load-test.js
```

### 3. Review Results
- Console output for immediate feedback
- JSON files in `/results/` for detailed metrics
- Analysis reports in `/reports/` for insights

---

## 📊 Test Overview

| Test Type | Script | Duration | Max VUs | Report |
|-----------|--------|----------|---------|--------|
| Load | load-test.js | 7 min | 10-50 | k6-load-test-analysis.md |
| Stress | stress-test.js | 11 min | 10-30 | k6-stress-test-analysis.md |
| Spike | spike-test.js | 6.5 min | 5-50 | k6-spike-test-analysis.md |
| Soak | soak-test.js | 12 min | 10 | k6-soak-test-analysis.md |

---

## 📖 Documentation

- **For running tests:** `/docs/QUICK_START.md`
- **For file navigation:** `/docs/FILE_INDEX.md`
- **For requirements:** `/docs/CHECKLIST.md`
- **For overview:** `/docs/K6_TESTS_SUMMARY.md`

---

## ✅ Assignment Coverage

**Part A: k6 Performance Testing - 160 points**

- ✅ Task 1: k6 Setup (10 pts) - `scripts/config.js`, `scripts/helpers.js`
- ✅ Task 2: Load Testing (40 pts) - `scripts/load-test.js`, `reports/k6-load-test-analysis.md`
- ✅ Task 3: Stress Testing (30 pts) - `scripts/stress-test.js`, `reports/k6-stress-test-analysis.md`
- ✅ Task 4: Spike Testing (20 pts) - `scripts/spike-test.js`, `reports/k6-spike-test-analysis.md`
- ✅ Task 5: Soak Testing (30 pts) - `scripts/soak-test.js`, `reports/k6-soak-test-analysis.md`
- ✅ Task 6: Performance Optimization (30 pts) - See parent folder files

---

## 🎯 Key Findings

### Performance Baseline
- Target p95 response time: < 500ms
- Error rate target: < 1%
- Sustainable load: 10-15 concurrent users
- Breaking point: ~30-50 concurrent users

### Optimizations Applied
See `../performance-optimizations.md` for:
- Database indexes
- Query optimization
- Connection pooling
- ~40% performance improvement

---

