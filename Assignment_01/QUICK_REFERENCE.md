# 🎯 Assignment 1 - Quick Reference

## 📁 What's Where?

### Documentation (Assignment_01 folder)
- **README.md** - Start here! Overview of everything
- **ASSIGNMENT_1_REPORT.md** - Your main submission report
- **COMMANDS_TO_RUN.md** - Step-by-step testing commands
- **testing-analysis.md** - Before/after test analysis
- **coverage-report.md** - Coverage metrics and analysis
- **assets/** - Put your 9 screenshots here

### Test Files (golang-gin-realworld-example-app folder)
- **articles/unit_test.go** - 30+ new unit tests
- **common/unit_test.go** - Enhanced with 9 new tests
- **integration_test.go** - 18 new integration tests
- **users/unit_test.go** - 100+ existing tests

---

## ⚡ Quick Commands

### Navigate to test directory:
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"
```

### Run all tests:
```powershell
go test ./... -v
```

### Get coverage:
```powershell
go test ./... -cover
```

### Generate HTML report:
```powershell
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
start coverage.html
```

---

## 📸 Screenshot Checklist

Save screenshots in `Assignment_01/assets/` folder:

- [ ] `01-all-tests.png` - All tests passing
- [ ] `02-coverage-summary.png` - Coverage percentages
- [ ] `03-articles-tests.png` - Articles tests output
- [ ] `04-common-tests.png` - Common tests output
- [ ] `05-integration-tests.png` - Integration tests output
- [ ] `06-html-coverage-overview.png` - HTML report overview
- [ ] `07-articles-models-coverage.png` - Articles models file
- [ ] `08-articles-serializers-coverage.png` - Serializers file
- [ ] `09-function-coverage.png` - Function-level coverage

---

## 📦 What to Submit

1. **Assignment_01/** folder (complete with all documentation)
2. **Test files** from golang-gin-realworld-example-app:
   - articles/unit_test.go
   - integration_test.go
   - Enhanced common/unit_test.go
3. **Coverage files**:
   - coverage.out
   - coverage.html
4. **Screenshots** in assets/ folder (9 files)

---

## 📊 Expected Results

✅ **Tests:** 78 total (all passing)  
✅ **Coverage:** 75-85%  
✅ **Articles Package:** 30+ tests  
✅ **Integration Tests:** 18 tests  
✅ **Documentation:** Complete  

---

## 🚀 Ready to Run?

1. Open PowerShell
2. Navigate to golang directory (see command above)
3. Run: `go test ./... -v`
4. Take screenshots as tests run
5. Generate coverage report
6. Done! ✨

---

**Need help?** Check `COMMANDS_TO_RUN.md` for detailed instructions!
