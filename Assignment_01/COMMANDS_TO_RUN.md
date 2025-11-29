# Commands to Run for Assignment 1 Screenshots

## Prerequisites

Make sure you're in the golang-gin-realworld-example-app directory:
```powershelrl
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"
```

## Command 1: Run All Tests (Screenshot this!)
```powershell
go test ./... -v
```
**What to screenshot**: Terminal output showing all tests passing with green checkmarks

## Command 2: Run Tests with Coverage Summary (Screenshot this!)
```powershell
go test ./... -cover
```
**What to screenshot**: Coverage percentages for common/, users/, and articles/ packages

## Command 3: Run Articles Package Tests Only (Screenshot this!)
```powershell
go test ./articles -v
```
**What to screenshot**: All 30+ articles tests passing

## Command 4: Run Common Package Tests (Screenshot this!)
```powershell
go test ./common -v
```
**What to screenshot**: All 15 common tests passing

## Command 5: Run Integration Tests (Screenshot this!)
```powershell
go test -v integration_test.go
```
**What to screenshot**: All 18 integration tests passing

## Command 6: Generate Coverage Report (Screenshot this!)
```powershell
# Generate coverage profile
go test ./... -coverprofile=coverage.out

# Generate HTML report
go tool cover -html=coverage.out -o coverage.html

# Open in browser (Windows)
start coverage.html
```
**What to screenshot**: 
1. The HTML coverage report overview page showing overall coverage percentage
2. Navigate to articles/models.go and screenshot the coverage (green/red lines)
3. Navigate to articles/serializers.go and screenshot
4. Navigate to common/utils.go and screenshot

## Command 7: View Function-Level Coverage (Screenshot this!)
```powershell
go tool cover -func=coverage.out
```
**What to screenshot**: Function-by-function coverage percentages (scroll to show different packages)

## Command 8: Run Specific Test Function (Optional)
```powershell
# Run a specific test
go test ./articles -v -run TestFavoriteArticle
```

## Quick Test Summary Command
```powershell
# This will show you a nice summary
go test ./... -cover | Select-String "coverage:"
```

---

## Expected Results

### You should see:
- ✅ All tests passing (no FAIL messages)
- ✅ Common package: ~70-80% coverage
- ✅ Users package: ~80-90% coverage  
- ✅ Articles package: ~70-80% coverage
- ✅ Overall project: ~75-85% coverage

### If you see errors:
1. Make sure you're in the correct directory
2. Make sure Go is installed: `go version`
3. Make sure dependencies are installed: `go mod download`

---

## Screenshots Needed for Assignment Submission

1. **All Tests Running** - `go test ./... -v` output
2. **Coverage Summary** - `go test ./... -cover` output
3. **Articles Tests** - `go test ./articles -v` output
4. **Integration Tests** - `go test -v integration_test.go` output
5. **HTML Coverage Report** - Browser showing coverage.html
6. **Specific File Coverage** - articles/models.go coverage in HTML report
7. **Function Coverage** - `go tool cover -func=coverage.out` output

Total: **7 screenshots minimum**

---

## Troubleshooting

### If tests fail due to database:
The tests use SQLite and should clean up automatically. If you have issues:
```powershell
# Remove test databases
Remove-Item -Path ..\gorm_test.db -ErrorAction SilentlyContinue
```

### If you get "package not found":
```powershell
# Make sure you're in the right directory
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"

# Download dependencies
go mod download
```

### To verify your test files exist:
```powershell
# Check articles test file
Test-Path .\articles\unit_test.go

# Check integration test file  
Test-Path .\integration_test.go

# Check coverage report doc
Test-Path .\coverage-report.md

# Check testing analysis
Test-Path .\testing-analysis.md
```

All should return `True`

---

## Frontend Testing Commands (React/Redux)

### Prerequisites
Navigate to the React frontend directory:
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\react-redux-realworld-example-app"
```

### Frontend Command 1: Install Dependencies (First Time Only)
```powershell
npm install --legacy-peer-deps
```
**What to screenshot**: Successful installation message

### Frontend Command 2: Run All Frontend Tests (Screenshot this!)
```powershell
npm test -- --watchAll=false
```
**What to screenshot**: All 135 tests passing (73 component + 62 Redux + 20 integration)

### Frontend Command 3: Run Tests with Coverage (Screenshot this!)
```powershell
npm test -- --coverage --watchAll=false
```
**What to screenshot**: 
1. Test execution showing all 135 tests passing
2. Coverage summary table showing percentages for all files
3. Coverage details for components, reducers, and middleware

### Frontend Command 4: Generate HTML Coverage Report
```powershell
# Run tests with coverage (generates coverage/ folder)
npm test -- --coverage --watchAll=false

# Open HTML report in browser (Windows)
start coverage/lcov-report/index.html
```
**What to screenshot**:
1. HTML coverage overview page
2. Coverage for src/components/ directory
3. Coverage for src/reducers/ directory
4. Coverage for src/middleware.js

### Frontend Command 5: Run Specific Test File (Optional)
```powershell
# Run only component tests
npm test -- ArticleList.test.js --watchAll=false

# Run only Redux tests
npm test -- auth.test.js --watchAll=false

# Run integration tests
npm test -- integration.test.js --watchAll=false
```

---

## Frontend Screenshots Needed

1. **All Frontend Tests Passing** - `npm test -- --watchAll=false` output
2. **Frontend Coverage Report** - `npm test -- --coverage --watchAll=false` output
3. **HTML Coverage Overview** - Browser showing coverage/lcov-report/index.html
4. **Component Coverage Details** - Individual component coverage in HTML report

Total Frontend Screenshots: **4 minimum**

---

## Expected Frontend Results

### You should see:
- ✅ 135 tests passing (0 failing)
- ✅ Component tests: 73 passing
- ✅ Redux tests: 62 passing
- ✅ Integration tests: 20 passing
- ✅ Overall coverage: ~40-45%
- ✅ Tested components: 88-100% coverage
- ✅ Middleware: 97%+ coverage
- ✅ Reducers: 77-92% coverage

---

## Time Estimate
- **Backend testing**: 15-20 minutes
- **Frontend testing**: 10-15 minutes
- **Total**: 25-35 minutes

Good luck with your assignment! 🚀
