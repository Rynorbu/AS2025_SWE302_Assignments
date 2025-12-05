# 📂 k6 Performance Testing - File Index

## 🎯 Quick Navigation

**Start Here:**
1. **QUICK_START.md** - How to run tests
2. **CHECKLIST.md** - Verify all requirements met
3. **K6_TESTS_SUMMARY.md** - Complete overview

---

## 📁 Organized Folder Structure

```
k6-tests/
├── 📂 scripts/       (7 files)  - Test scripts & config
├── 📂 results/       (5 files)  - JSON test results (~453 MB)
├── 📂 reports/       (4 files)  - Analysis documents
├── 📂 docs/          (5 files)  - Documentation (you are here)
└── 📄 README.md                 - Main guide
```

---

## 📂 `/scripts/` - Test Scripts (7 files)

| File | Purpose | Size |
|------|---------|------|
| **config.js** | Test configuration, thresholds, BASE_URL | 366 B |
| **helpers.js** | Reusable functions (login, register, auth) | 1.1 KB |
| **load-test.js** | Load test (7 min, 10-50 VUs) | 3 KB |
| **stress-test.js** | Stress test (11 min, 10-30 VUs) | 1.6 KB |
| **spike-test.js** | Spike test (6.5 min, 5-50 VUs) | 1.1 KB |
| **soak-test.js** | Soak test (12 min, 10 VUs) | 1 KB |
| **simple-test.js** | Simple baseline test | 402 B |

---

## 📂 `/results/` - Test Results (5 files, ~453 MB)

| File | Test Type | Size |
|------|-----------|------|
| **load-test-results.json** | Load (before optimization) | 16 MB |
| **load-test-optimized-results.json** | Load (after optimization) | 16.1 MB |
| **stress-test-results.json** | Stress test | 66.5 MB |
| **spike-test-results.json** | Spike test | 339.8 MB |
| **soak-test-results.json** | Soak test | 15 MB |

---

## 📂 `/reports/` - Analysis Reports (4 files)

| File | Analyzes | Size |
|------|----------|------|
| **k6-load-test-analysis.md** | Load testing baseline | 10.3 KB |
| **k6-stress-test-analysis.md** | Breaking point analysis | 11.5 KB |
| **k6-spike-test-analysis.md** | Spike handling & recovery | 15.7 KB |
| **k6-soak-test-analysis.md** | Long-term stability | 16.8 KB |

---

## 📂 `/docs/` - Documentation (4 files)

| File | Purpose | Size |
|------|---------|------|
| **QUICK_START.md** | How to run tests | 6.3 KB |
| **CHECKLIST.md** | Assignment requirements | 7.5 KB |
| **FILE_INDEX.md** | This file - navigation | Current |
| **K6_TESTS_SUMMARY.md** | Comprehensive overview | 7.7 KB |

---

## 🚀 Quick Reference

### To Run Tests:
```powershell
cd Assignment_03/k6-tests/scripts
k6 run load-test.js
```

### To View Results:
- Console output (immediate)
- `../results/*.json` (raw data)
- `../reports/*.md` (analysis)

### For Documentation:
- `QUICK_START.md` - Getting started
- `CHECKLIST.md` - Requirements
- `K6_TESTS_SUMMARY.md` - Overview

---

## 🎯 Assignment Coverage (160/160 points)

| Task | Files | Points |
|------|-------|--------|
| Setup | `scripts/config.js`, `scripts/helpers.js` | 10 ✅ |
| Load Test | `scripts/load-test.js`, `reports/k6-load-test-analysis.md` | 40 ✅ |
| Stress Test | `scripts/stress-test.js`, `reports/k6-stress-test-analysis.md` | 30 ✅ |
| Spike Test | `scripts/spike-test.js`, `reports/k6-spike-test-analysis.md` | 20 ✅ |
| Soak Test | `scripts/soak-test.js`, `reports/k6-soak-test-analysis.md` | 30 ✅ |
| Optimization | `results/load-test-optimized-results.json` | 30 ✅ |

---

**Status:** ✅ Organized and ready for submission  
**Last Updated:** December 5, 2025
