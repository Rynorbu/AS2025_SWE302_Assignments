# SonarCloud Setup - Step-by-Step Guide

**Date:** December 1, 2025  
**Assignment:** Assignment 2 - SAST with SonarQube Cloud  

---

## 🎯 WHAT WE'RE DOING

Setting up SonarCloud to analyze your backend (Go) and frontend (React) projects automatically via GitHub Actions.

---

## 📸 SCREENSHOT CHECKPOINTS

You'll take screenshots at these points:
- ✅ **Screenshot #13:** SonarCloud project setup page
- ✅ **Screenshot #14:** Backend dashboard after first analysis
- ✅ **Screenshot #15:** Backend issues list
- ✅ **Screenshot #16:** Backend vulnerability details
- ✅ **Screenshot #17:** Backend security hotspots
- ✅ **Screenshot #18:** Backend code smells
- ✅ **Screenshot #19:** Frontend dashboard
- ✅ **Screenshot #20:** Frontend security issues
- ✅ **Screenshot #21:** Frontend code quality
- ✅ **Screenshot #22:** Frontend metrics

---

## STEP 1: CREATE SONARCLOUD ACCOUNT (5 minutes)

### Actions:

1. **Open your browser and go to:** https://sonarcloud.io

2. **Click "Log in" (top right)**

3. **Select "With GitHub"**

4. **Authorize SonarCloud:**
   - GitHub will ask for permissions
   - Click "Authorize SonarSource"
   
5. **Import GitHub organization:**
   - You'll see a dialog asking to import your organization
   - Select **"Rynorbu"** (your GitHub username/organization)
   - Click "Continue"

---

## 🛑 **SCREENSHOT CHECKPOINT #13**

**What to capture:** SonarCloud welcome/organization page showing:
- Your organization imported
- Option to "Analyze new project" visible
- Your username in the top right

**Save as:** `Assignment_02/screenshots/sonarqube/setup/13_sonarcloud_organization.png`

**⏸️ PAUSE HERE - Take the screenshot now before continuing!**

---

## STEP 2: GET SONARCLOUD TOKEN (3 minutes)

### Actions:

1. **Click on your profile picture** (top right) → "My Account"

2. **Click on "Security" tab**

3. **Generate Token:**
   - Token Name: `Assignment2-SonarCloud`
   - Click "Generate"
   - **⚠️ IMPORTANT:** Copy the token immediately (you won't see it again!)
   
4. **Save the token somewhere safe** - You'll need it in the next step

**Example token format:** `sqp_1234567890abcdef1234567890abcdef12345678`

---

## STEP 3: ADD TOKEN TO GITHUB SECRETS (5 minutes)

### Actions:

1. **Open your GitHub repository:** https://github.com/Rynorbu/AS2025_SWE302_Assignments

2. **Go to Settings:**
   - Click "Settings" tab (top navigation)
   - If you don't see Settings, make sure you're the owner/admin

3. **Navigate to Secrets:**
   - In left sidebar: Click "Secrets and variables" → "Actions"

4. **Add new secret:**
   - Click "New repository secret"
   - Name: `SONAR_TOKEN`
   - Value: [Paste the token you copied]
   - Click "Add secret"

**✅ Verification:** You should now see `SONAR_TOKEN` in your secrets list

---

## STEP 4: CREATE BACKEND PROJECT IN SONARCLOUD (5 minutes)

### Actions:

1. **Go back to SonarCloud:** https://sonarcloud.io

2. **Click the "+" icon** (top right) → "Analyze new project"

3. **Select your repository:**
   - Find and check: `AS2025_SWE302_Assignments`
   - Click "Set Up"

4. **Choose analysis method:**
   - Select "With GitHub Actions"
   - Click "Continue"

5. **Configure project:**
   - Project key will be auto-generated: `Rynorbu_AS2025_SWE302_Assignments`
   - We'll customize this for backend/frontend separately

6. **Skip the workflow creation** (we already created it!)
   - Just note the organization key shown: `rynorbu`

---

## STEP 5: UPDATE WORKFLOW FILES (2 minutes)

The workflow files are already created in `.github/workflows/`. We just need to verify the organization key.

### Open these files and check:

**File 1:** `.github/workflows/sonarcloud-backend.yml`
**File 2:** `.github/workflows/sonarcloud-frontend.yml`

Both should have: `-Dsonar.organization=rynorbu`

**✅ This is already correct in the files I created!**

---

## STEP 6: COMMIT AND PUSH WORKFLOW FILES (5 minutes)

### Actions in PowerShell:

```powershell
# Navigate to repository root
cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master

# Check what files we're adding
git status

# Add the workflow files
git add .github/workflows/sonarcloud-backend.yml
git add .github/workflows/sonarcloud-frontend.yml
git add sonar-project.properties

# Commit
git commit -m "Add SonarCloud CI/CD workflows for Assignment 2"

# Push to GitHub
git push origin main
```

---

## STEP 7: TRIGGER BACKEND ANALYSIS (2 minutes + wait time)

### Actions:

1. **Go to GitHub Actions:**
   - Open: https://github.com/Rynorbu/AS2025_SWE302_Assignments/actions

2. **Find the workflow:**
   - You should see "SonarCloud Backend Analysis" in the list
   - It might already be running from the push!

3. **If not running, trigger manually:**
   - Click "SonarCloud Backend Analysis"
   - Click "Run workflow" button
   - Select "main" branch
   - Click green "Run workflow"

4. **Monitor progress:**
   - Click on the running workflow
   - Watch the steps execute
   - **This will take 3-5 minutes**

---

## 🛑 **WAIT FOR ANALYSIS TO COMPLETE**

You'll see these steps complete:
- ✅ Checkout repository
- ✅ Set up Go
- ✅ Install dependencies
- ✅ Run tests with coverage
- ✅ SonarCloud Scan

**When all steps show green checkmarks, proceed to next step.**

---

## STEP 8: VIEW BACKEND RESULTS & TAKE SCREENSHOTS (10 minutes)

### Actions:

1. **Go to SonarCloud:** https://sonarcloud.io/projects

2. **Click on backend project:**
   - Project name: `Rynorbu_AS2025_SWE302_Assignments_backend`

---

### 🛑 **SCREENSHOT CHECKPOINT #14**

**What to capture:** Backend Overview Dashboard showing:
- Quality Gate status (Passed/Failed)
- Bugs count
- Vulnerabilities count
- Code Smells count
- Coverage percentage
- Duplications percentage
- Lines of code
- Security Rating, Reliability Rating, Maintainability Rating

**Save as:** `Assignment_02/screenshots/sonarqube/backend/14_dashboard.png`

**⏸️ PAUSE - Take screenshot now!**

---

3. **Click "Issues" tab** (left sidebar)

---

### 🛑 **SCREENSHOT CHECKPOINT #15**

**What to capture:** Issues List showing:
- All issues (Bugs, Vulnerabilities, Code Smells)
- Severity filters
- At least 10-15 issues visible
- File locations

**Save as:** `Assignment_02/screenshots/sonarqube/backend/15_issues_list.png`

**⏸️ PAUSE - Take screenshot now!**

---

4. **Click on a VULNERABILITY issue** (find one marked as "Vulnerability")

---

### 🛑 **SCREENSHOT CHECKPOINT #16**

**What to capture:** Vulnerability Details showing:
- Issue title and description
- Code snippet with highlighted problem
- OWASP/CWE reference
- "Why is this an issue?" explanation
- Remediation guidance
- File path and line number

**Save as:** `Assignment_02/screenshots/sonarqube/backend/16_vulnerability_details.png`

**⏸️ PAUSE - Take screenshot now!**

---

5. **Click "Security Hotspots" tab** (left sidebar)

---

### 🛑 **SCREENSHOT CHECKPOINT #17**

**What to capture:** Security Hotspots page showing:
- List of security hotspots
- Security categories (Weak Cryptography, SQL Injection, etc.)
- Status indicators (To Review, Safe, etc.)
- At least 3-5 hotspots visible

**Save as:** `Assignment_02/screenshots/sonarqube/backend/17_security_hotspots.png`

**⏸️ PAUSE - Take screenshot now!**

---

6. **Go back to Issues tab, filter by "Code Smell"**

---

### 🛑 **SCREENSHOT CHECKPOINT #18**

**What to capture:** Code Smells showing:
- Filtered list of code smells
- Maintainability issues
- Complexity metrics
- At least 10+ code smells visible
- Technical debt shown

**Save as:** `Assignment_02/screenshots/sonarqube/backend/18_code_smells.png`

**⏸️ PAUSE - Take screenshot now!**

---

## STEP 9: TRIGGER FRONTEND ANALYSIS (2 minutes + wait time)

### Actions:

1. **Go to GitHub Actions:**
   - https://github.com/Rynorbu/AS2025_SWE302_Assignments/actions

2. **Find "SonarCloud Frontend Analysis"**

3. **Trigger manually:**
   - Click "Run workflow"
   - Select "main" branch
   - Click "Run workflow"

4. **Monitor progress:**
   - This will take 5-8 minutes (frontend tests take longer)
   - Watch for all green checkmarks

---

## STEP 10: VIEW FRONTEND RESULTS & TAKE SCREENSHOTS (10 minutes)

### Actions:

1. **Go to SonarCloud:** https://sonarcloud.io/projects

2. **Click on frontend project:**
   - Project name: `Rynorbu_AS2025_SWE302_Assignments_frontend`

---

### 🛑 **SCREENSHOT CHECKPOINT #19**

**What to capture:** Frontend Overview Dashboard showing:
- Quality Gate status
- All metrics (Bugs, Vulnerabilities, Code Smells)
- JavaScript/React specific metrics
- Security rating
- Test coverage

**Save as:** `Assignment_02/screenshots/sonarqube/frontend/19_dashboard.png`

**⏸️ PAUSE - Take screenshot now!**

---

3. **Click "Issues" tab, filter by "Vulnerability"**

---

### 🛑 **SCREENSHOT CHECKPOINT #20**

**What to capture:** Frontend Security Issues showing:
- Vulnerabilities (XSS, weak crypto, etc.)
- React-specific security issues
- At least 2-3 security issues visible with details

**Save as:** `Assignment_02/screenshots/sonarqube/frontend/20_security_issues.png`

**⏸️ PAUSE - Take screenshot now!**

---

4. **Filter by "Code Smell" or view all issues**

---

### 🛑 **SCREENSHOT CHECKPOINT #21**

**What to capture:** Code Quality Issues showing:
- Code smells
- Duplicated code blocks
- Complex functions
- Unused variables/imports
- Console statements
- Missing PropTypes

**Save as:** `Assignment_02/screenshots/sonarqube/frontend/21_code_quality.png`

**⏸️ PAUSE - Take screenshot now!**

---

5. **Click "Measures" tab** (left sidebar)

---

### 🛑 **SCREENSHOT CHECKPOINT #22**

**What to capture:** Metrics page showing:
- Maintainability rating
- Reliability rating  
- Security rating
- Technical debt
- Code coverage
- Complexity metrics
- Duplications

**Save as:** `Assignment_02/screenshots/sonarqube/frontend/22_metrics.png`

**⏸️ PAUSE - Take screenshot now!**

---

## ✅ COMPLETION CHECKLIST

### Screenshots Taken:
- [ ] #13: SonarCloud organization setup
- [ ] #14: Backend dashboard
- [ ] #15: Backend issues list
- [ ] #16: Backend vulnerability details
- [ ] #17: Backend security hotspots
- [ ] #18: Backend code smells
- [ ] #19: Frontend dashboard
- [ ] #20: Frontend security issues
- [ ] #21: Frontend code quality
- [ ] #22: Frontend metrics

### Configuration:
- [ ] SonarCloud account created
- [ ] GitHub organization imported
- [ ] SONAR_TOKEN added to GitHub secrets
- [ ] Backend project created
- [ ] Frontend project created
- [ ] Both workflows committed and pushed
- [ ] Both analyses completed successfully

---

## 🎉 CONGRATULATIONS!

You've completed the SonarCloud setup and analysis!

**Next Steps:**
1. I'll create the analysis documents based on your screenshots
2. We'll document all findings
3. Then move to ZAP testing

---

## ⚠️ TROUBLESHOOTING

### Workflow fails with "SONAR_TOKEN not found"
- Go back to Step 3, verify secret name is exactly `SONAR_TOKEN`
- No spaces, all caps

### Analysis shows 0 issues
- This is unlikely but possible
- Verify the correct directories are being scanned
- Check workflow logs for errors

### Can't see Security Hotspots
- Some projects may not have any
- This is fine, document "No hotspots found"

### Frontend workflow fails on tests
- This is OK! We used `continue-on-error: true`
- SonarCloud will still analyze the code

---

**Ready to proceed? Follow these steps and pause for each screenshot!**
