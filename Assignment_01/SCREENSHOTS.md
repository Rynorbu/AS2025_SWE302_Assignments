# 📸 Assignment 1 - Screenshots Guide

## Required Screenshots: 9 Total

Save all screenshots in the `assets/` folder with the exact filenames shown below.

---

## Screenshot 1: All Tests Running
**Filename:** `01-all-tests.png`

**Command:**
```powershell
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"
go test ./... -v
```

**What to capture:** Full terminal output showing all test packages running with PASS status for each test function.

---

## Screenshot 2: Coverage Summary
**Filename:** `02-coverage-summary.png`

**Command:**
```powershell
go test ./... -cover
```

**What to capture:** Terminal output showing coverage percentages for each package:
- `realworld-backend/common` - coverage: XX.X%
- `realworld-backend/users` - coverage: XX.X%
- `realworld-backend/articles` - coverage: XX.X%

---

## Screenshot 3: Articles Package Tests
**Filename:** `03-articles-tests.png`

**Command:**
```powershell
go test ./articles -v
```

**What to capture:** Terminal showing all 30+ articles tests running:
- TestArticleModelCreation
- TestFavoriteArticle
- TestUnfavoriteArticle
- TestArticleSerializer
- And all other article tests with PASS status

---

## Screenshot 4: Common Package Tests
**Filename:** `04-common-tests.png`

**Command:**
```powershell
go test ./common -v
```

**What to capture:** Terminal showing all 15 common package tests:
- TestConnectingDatabase
- TestGenToken
- TestGenTokenWithDifferentUserIDs
- And all other common tests with PASS status

---

## Screenshot 5: Integration Tests
**Filename:** `05-integration-tests.png`

**Command:**
```powershell
go test -v integration_test.go
```

**What to capture:** Terminal showing all 18 integration tests:
- TestUserRegistrationIntegration
- TestUserLoginIntegration
- TestCreateArticleAuthenticated
- TestFavoriteArticle
- And all other integration tests with PASS status

---

## Screenshot 6: HTML Coverage Overview
**Filename:** `06-html-coverage-overview.png`

**Commands:**
```powershell
# Generate coverage files
go test ./... -coverprofile=coverage.out

# Generate HTML report
go tool cover -html=coverage.out -o coverage.html

# Open in browser
start coverage.html
```

**What to capture:** Browser window showing:
- The main coverage report page
- Overall coverage percentage at the top
- List of all packages with their coverage percentages
- File list with coverage bars

---

## Screenshot 7: Articles Models Coverage
**Filename:** `07-articles-models-coverage.png`

**Steps:**
1. Open `coverage.html` in browser (from previous step)
2. Click on `realworld-backend/articles` package
3. Click on `models.go` file

**What to capture:** Browser showing `models.go` source code with:
- Green highlighted lines (covered by tests)
- Red highlighted lines (not covered)
- Line numbers visible

---

## Screenshot 8: Articles Serializers Coverage
**Filename:** `08-articles-serializers-coverage.png`

**Steps:**
1. In the coverage HTML report
2. Navigate to `realworld-backend/articles` package
3. Click on `serializers.go` file

**What to capture:** Browser showing `serializers.go` source code with:
- Coverage highlighting (green/red lines)
- Line numbers visible

---

## Screenshot 9: Function-Level Coverage
**Filename:** `09-function-coverage.png`

**Command:**
```powershell
go tool cover -func=coverage.out
```

**What to capture:** Terminal output showing function-by-function coverage like:
```
realworld-backend/articles/models.go:XX:    FunctionName    XX.X%
realworld-backend/common/utils.go:XX:       FunctionName    XX.X%
```
(Scroll through the output to show various functions)

---

## Quick Workflow

Run these commands in order:

```powershell
# Navigate to project
cd "C:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app"

# Screenshot 1
go test ./... -v

# Screenshot 2
go test ./... -cover

# Screenshot 3
go test ./articles -v

# Screenshot 4
go test ./common -v

# Screenshot 5
go test -v integration_test.go

# Generate coverage files for Screenshots 6-9
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
start coverage.html

# Screenshot 9
go tool cover -func=coverage.out
```

---

## Checklist

- [ ] `01-all-tests.png` - All tests output
- [ ] `02-coverage-summary.png` - Coverage percentages
- [ ] `03-articles-tests.png` - Articles tests
- [ ] `04-common-tests.png` - Common tests
- [ ] `05-integration-tests.png` - Integration tests
- [ ] `06-html-coverage-overview.png` - HTML report main page
- [ ] `07-articles-models-coverage.png` - models.go coverage
- [ ] `08-articles-serializers-coverage.png` - serializers.go coverage
- [ ] `09-function-coverage.png` - Function coverage output

---

## Tips

- **Clear your terminal** before each screenshot for clean output: `Clear-Host`
- **Maximize terminal window** to capture all output
- **Use high resolution** for clear, readable screenshots
- **Crop screenshots** to remove unnecessary borders if needed
- **Name files exactly** as shown above for easy grading

---

## Expected Results

✅ All tests should show **PASS**  
✅ Coverage should be **75-85%**  
✅ No **FAIL** or errors in output  
✅ HTML report should show **green coverage** for tested code

---

**Total time needed:** ~10-15 minutes to run all commands and take screenshots.
