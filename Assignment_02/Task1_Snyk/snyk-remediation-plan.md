# Snyk Remediation Plan

## Executive Summary

This document outlines a prioritized remediation plan for all security vulnerabilities identified by Snyk across both the backend (Go) and frontend (React) applications of the RealWorld Conduit project.

**Total Vulnerabilities**: 9 (3 backend + 6 frontend)  
**Total Code Issues**: 8 (all frontend test files)  
**Estimated Total Remediation Time**: 16-24 hours

---

## Quick Overview

| Priority | Issues | Effort | Timeline |
|----------|--------|--------|----------|
| **CRITICAL** | 1 | 2-4 hours | This week |
| **HIGH** | 1 | 2-4 hours | This week |
| **MEDIUM** | 5 | 8-12 hours | Next sprint |
| **LOW/INFO** | 8 | 3-4 hours | Next sprint |

---

## PRIORITY 1: CRITICAL ISSUES (Must Fix Immediately)

### 🚨 Issue #1: form-data Predictable Boundary Values (Frontend)

**Severity**: CRITICAL (CVSS 9.4)  
**Package**: `form-data` (npm)  
**Impact**: HTTP parameter pollution, potential data manipulation  
**Effort**: 2-4 hours

#### Vulnerability Details
- **CVE**: CVE-2025-7783
- **Affected Versions**: < 2.5.4, 3.0.0-3.0.3, 4.0.0-4.0.3
- **Fixed Versions**: 2.5.4, 3.0.4, 4.0.4+
- **Risk**: Proof of concept exists, allows HTTP request manipulation

#### Remediation Steps

**Step 1: Check Current Version**
```bash
cd react-redux-realworld-example-app
npm list form-data
```

**Step 2: Update Package**
```bash
# Update to latest secure version
npm install form-data@latest

# Verify the update
npm list form-data
```

**Step 3: Update Package Lock**
```bash
# Ensure package-lock.json is updated
npm install

# Verify no vulnerabilities remain
npm audit
```

**Step 4: Testing Requirements**
- ✅ Run all frontend unit tests
- ✅ Test file upload functionality (if any)
- ✅ Test form submission flows
- ✅ Test multipart/form-data requests
- ✅ Integration testing with backend

**Step 5: Verification**
```bash
# Re-run Snyk scan
snyk test

# Verify the vulnerability is resolved
npm audit
```

#### Breaking Changes Assessment
- **Likelihood**: LOW
- **Reason**: Patch version updates typically maintain API compatibility
- **Affected Areas**: Multipart form data handling
- **Mitigation**: Comprehensive testing of form submissions

#### Rollback Plan
```bash
# If issues occur, rollback to previous version
git checkout package.json package-lock.json
npm install
```

#### Success Criteria
- ✅ form-data upgraded to v4.0.4 or higher
- ✅ All tests passing
- ✅ Snyk scan shows 0 critical vulnerabilities
- ✅ npm audit clean or acceptable risk level

**Estimated Time**: 2-4 hours (including testing)  
**Deadline**: End of this week  
**Owner**: Frontend Team Lead

---

## PRIORITY 2: HIGH SEVERITY ISSUES

### ⚠️ Issue #2: JWT Access Restriction Bypass (Backend)

**Severity**: HIGH (CVSS 7.5)  
**Package**: `github.com/dgrijalva/jwt-go` (Go)  
**Impact**: Authentication bypass, unauthorized access  
**Effort**: 2-4 hours

#### Vulnerability Details
- **Snyk ID**: SNYK-GOLANG-GITHUBCOMDGRIJALVAJWTGO-596515
- **Affected Versions**: All < v4.0.0-preview1
- **Fix**: Migrate to maintained fork `github.com/golang-jwt/jwt`
- **Risk**: Access control bypass in JWT validation

#### Remediation Steps

**Step 1: Assessment**
```bash
cd golang-gin-realworld-example-app

# Find all JWT usage
grep -r "dgrijalva/jwt-go" .

# Check current version
cat go.mod | grep jwt-go
```

**Step 2: Install New Package**
```bash
# Add maintained fork
go get -u github.com/golang-jwt/jwt/v4

# Remove old package
go mod edit -dropreplace github.com/dgrijalva/jwt-go
```

**Step 3: Code Migration**

Update all import statements:
```go
// OLD - Remove this
import "github.com/dgrijalva/jwt-go"

// NEW - Replace with this
import "github.com/golang-jwt/jwt/v4"
```

**Files Likely Affected**:
- `common/middlewares.go` - JWT authentication middleware
- `users/models.go` - User model with JWT generation
- Any custom JWT handlers

**Step 4: Code Changes**

Typical changes needed:
```go
// Before
token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "id":  user.ID,
    "exp": time.Now().Add(time.Hour * 72).Unix(),
})

// After (same code, just different import)
token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "id":  user.ID,
    "exp": time.Now().Add(time.Hour * 72).Unix(),
})
```

**Step 5: Testing Requirements**
- ✅ User registration flow
- ✅ User login flow
- ✅ Token generation
- ✅ Token validation
- ✅ Protected endpoint access
- ✅ Token expiration handling
- ✅ Invalid token rejection
- ✅ Token refresh (if implemented)

**Step 6: Verification**
```bash
# Clean up dependencies
go mod tidy

# Run tests
go test ./...

# Re-scan with Snyk
snyk test
```

#### Breaking Changes Assessment
- **Likelihood**: VERY LOW
- **Reason**: golang-jwt/jwt is a maintained fork with API compatibility
- **Changes**: Import path only, function signatures remain the same

#### Integration Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access protected endpoints with valid token
- [ ] Access protected endpoints without token
- [ ] Access protected endpoints with expired token
- [ ] Token-based CRUD operations
- [ ] Concurrent user sessions

#### Success Criteria
- ✅ All imports updated to golang-jwt/jwt/v4
- ✅ No references to dgrijalva/jwt-go remain
- ✅ All backend tests passing
- ✅ Integration tests passing
- ✅ Snyk scan shows 0 high severity vulnerabilities

**Estimated Time**: 2-4 hours  
**Deadline**: End of this week  
**Owner**: Backend Team Lead  
**Dependencies**: None

---

## PRIORITY 3: MEDIUM SEVERITY ISSUES

### Issue #3-7: Five Medium Severity npm Vulnerabilities (Frontend)

**Severity**: MEDIUM  
**Count**: 5 vulnerabilities  
**Impact**: Various security risks (DoS, information disclosure, etc.)  
**Effort**: 8-12 hours total

#### Approach

**Option A: Automated Fix (Preferred)**
```bash
cd react-redux-realworld-example-app

# Attempt automatic fixes
npm audit fix

# Review changes
git diff package.json package-lock.json

# Test thoroughly
npm test
npm run build
```

**Option B: Manual Review and Fix**
```bash
# Get detailed vulnerability report
npm audit --json > npm-audit-report.json

# Review each vulnerability
npm audit

# Update specific packages
npm update [package-name]
```

#### General Remediation Strategy

**For each medium vulnerability**:

1. **Identify the Package**
   ```bash
   npm audit
   # Note the package name and current version
   ```

2. **Research the Vulnerability**
   - Read Snyk advisory
   - Check CVE details if available
   - Understand the impact on the application

3. **Determine if Package is Used**
   ```bash
   # Check if it's a direct or transitive dependency
   npm ls [package-name]
   
   # Search for usage in code
   grep -r "package-name" src/
   ```

4. **Update Strategy**
   - If direct dependency: Update in package.json
   - If transitive: Update parent package or override version

5. **Test Impact**
   - Run unit tests: `npm test`
   - Run integration tests
   - Manual testing of affected features
   - Build production bundle: `npm run build`

6. **Document**
   - Note package updated
   - Version change (from → to)
   - Breaking changes encountered
   - Testing performed

#### Common Medium Severity Patterns

**Expected Issues** (typical for React apps):
1. **Prototype Pollution** in utility libraries
2. **Regular Expression DoS (ReDoS)** in parsing libraries
3. **Information Disclosure** in development dependencies
4. **Path Traversal** in file handling packages
5. **XSS** in sanitization libraries

#### Testing Requirements Per Package Update
- ✅ npm test passes
- ✅ npm run build successful
- ✅ No console errors in development
- ✅ Application loads correctly
- ✅ Core functionality works (CRUD operations)
- ✅ Authentication flows intact
- ✅ No visual regressions

#### Rollback Strategy
```bash
# If a specific update causes issues
git checkout package.json package-lock.json
npm install

# Or restore specific package
npm install package-name@previous-version
```

#### Workarounds if Upgrade Not Possible

If a package cannot be upgraded due to breaking changes:

1. **Override Vulnerable Transitive Dependency**
   ```json
   // package.json
   {
     "overrides": {
       "vulnerable-package": "^safe-version"
     }
   }
   ```

2. **Use npm audit --force** (last resort)
   ```bash
   npm audit fix --force
   # WARNING: May introduce breaking changes
   ```

3. **Document Risk Acceptance**
   - If vulnerability doesn't affect the application
   - If exploit requires unrealistic conditions
   - If no patch available and risk is acceptable

#### Success Criteria
- ✅ All 5 medium vulnerabilities resolved or documented
- ✅ npm audit shows only low/info issues (acceptable)
- ✅ Full test suite passing
- ✅ Application functionality verified
- ✅ No regressions introduced

**Estimated Time**: 8-12 hours (1.5-2.5 hours per vulnerability)  
**Deadline**: End of next sprint  
**Owner**: Frontend Developer  
**Risk**: Medium - potential for breaking changes

---

## PRIORITY 4: LOW SEVERITY / INFORMATIONAL ISSUES

### Issue #8: Hardcoded Passwords in Test Files

**Severity**: LOW (Informational)  
**Count**: 8 instances  
**Impact**: Code quality, security best practices  
**Effort**: 3-4 hours

#### Affected Files
1. `src/components/Login.test.js` - 5 instances
2. `src/integration.test.js` - 3 instances

#### Remediation Approach

**Step 1: Create Test Configuration**

Create `.env.test`:
```bash
# .env.test
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=secure-test-password-123
TEST_USER_EMAIL_2=test2@example.com
TEST_USER_PASSWORD_2=another-secure-password
```

Add to `.gitignore`:
```bash
echo ".env.test" >> .gitignore
```

**Step 2: Create Test Fixtures**

Create `src/fixtures/testUsers.js`:
```javascript
// src/fixtures/testUsers.js
export const testUsers = {
  validUser: {
    email: process.env.TEST_USER_EMAIL || 'test@example.com',
    password: process.env.TEST_USER_PASSWORD || 'testpass123'
  },
  adminUser: {
    email: process.env.TEST_ADMIN_EMAIL || 'admin@example.com',
    password: process.env.TEST_ADMIN_PASSWORD || 'adminpass123'
  }
};
```

**Step 3: Update Login.test.js**

Before:
```javascript
const credentials = {
  email: 'test@example.com',
  password: 'hardcodedpass123'  // ❌ Hardcoded
};
```

After:
```javascript
import { testUsers } from '../fixtures/testUsers';

const credentials = {
  email: testUsers.validUser.email,
  password: testUsers.validUser.password  // ✅ From config
};
```

**Step 4: Update integration.test.js**

Apply same pattern:
```javascript
import { testUsers } from './fixtures/testUsers';

describe('Authentication', () => {
  it('should login successfully', async () => {
    const response = await api.login(testUsers.validUser);
    // ... rest of test
  });
});
```

**Step 5: Add Pre-commit Hook**

Install git-secrets or similar:
```bash
npm install --save-dev husky
npx husky install

# Add pre-commit hook to detect secrets
npx husky add .husky/pre-commit "npm run check-secrets"
```

Create check script in package.json:
```json
{
  "scripts": {
    "check-secrets": "grep -r 'password.*:.*[\"\\'].*[\"\\']' src/ && exit 1 || exit 0"
  }
}
```

#### Files to Update
1. `src/components/Login.test.js`:
   - Line 80: Update password
   - Line 98: Update password
   - Line 112: Update password
   - Line 140: Update password
   - Line 157: Update password

2. `src/integration.test.js`:
   - Line 56: Update password
   - Line 73: Update password
   - Line 284: Update password

#### Testing After Changes
- ✅ All unit tests still pass
- ✅ Integration tests still pass
- ✅ Test coverage unchanged
- ✅ Tests run with environment variables
- ✅ Tests run without environment variables (use defaults)

#### Success Criteria
- ✅ No hardcoded passwords in source code
- ✅ Test configuration centralized
- ✅ Environment variables used
- ✅ Pre-commit hook prevents new hardcoded secrets
- ✅ Snyk Code scan shows 0 hardcoded password issues

**Estimated Time**: 3-4 hours  
**Deadline**: Next sprint  
**Owner**: QA/Test Engineer  
**Risk**: Very Low

---

## DEPENDENCY UPDATE STRATEGY

### Phase 1: Critical Updates (Week 1)
```bash
# Backend
cd golang-gin-realworld-example-app
go get -u github.com/golang-jwt/jwt/v4
go mod tidy

# Frontend
cd react-redux-realworld-example-app
npm install form-data@latest
npm audit
```

### Phase 2: Medium Priority Updates (Sprint 1)
```bash
# Frontend only
npm audit fix
npm update

# Test thoroughly
npm test
npm run build
```

### Phase 3: Low Priority & Code Quality (Sprint 2)
```bash
# Remove hardcoded passwords
# Update test files
# Add security tooling
```

### Phase 4: Maintenance (Ongoing)
```bash
# Weekly checks
npm audit
snyk test

# Monthly updates
npm outdated
npm update
```

---

## TESTING PLAN AFTER UPGRADES

### Backend Testing

**Unit Tests**
```bash
cd golang-gin-realworld-example-app
go test ./... -v
```

**Integration Tests**
- User registration
- User login
- Create article
- Update article
- Delete article
- Follow/unfollow user
- Favorite article

**Manual Testing**
- [ ] Register new user via Postman
- [ ] Login and verify JWT token
- [ ] Access protected endpoints
- [ ] CRUD operations on articles
- [ ] Token expiration handling

### Frontend Testing

**Unit Tests**
```bash
cd react-redux-realworld-example-app
npm test -- --coverage
```

**E2E Tests** (if available)
```bash
npm run test:e2e
```

**Manual Testing**
- [ ] User registration flow
- [ ] User login flow
- [ ] Create/edit/delete article
- [ ] Comment on article
- [ ] Follow user
- [ ] Favorite article
- [ ] Form submissions (file uploads if any)

### Integration Testing
- [ ] Frontend + Backend together
- [ ] Full user journey
- [ ] Authentication flows
- [ ] Data persistence
- [ ] Error handling

---

## RISK MITIGATION

### For Each Priority Level

**Critical Issues**
- **Risk**: High - Critical security vulnerability
- **Mitigation**: 
  - Deploy fix to staging first
  - Automated testing before production
  - Rollback plan ready
  - Monitor logs post-deployment

**High Issues**
- **Risk**: Medium - Authentication compromise
- **Mitigation**:
  - Backward compatibility testing
  - Session management verification
  - Load testing
  - Gradual rollout

**Medium Issues**
- **Risk**: Low-Medium - Potential breaking changes
- **Mitigation**:
  - Update one package at a time
  - Test between updates
  - Document each change
  - Keep git history clean for rollback

**Low Issues**
- **Risk**: Very Low - Code quality only
- **Mitigation**:
  - Code review
  - Test coverage maintained
  - No functional changes

---

## TIMELINE AND MILESTONES

### Week 1 (Current Sprint)
- **Day 1-2**: Fix Critical (form-data)
  - Update package
  - Run tests
  - Deploy to staging
  - Verify fix

- **Day 3-4**: Fix High (JWT library)
  - Migrate to new library
  - Update code
  - Integration testing
  - Deploy to staging

- **Day 5**: Verification
  - Full regression testing
  - Snyk re-scan
  - Production deployment

### Week 2-3 (Next Sprint)
- **Week 2**: Medium severity issues
  - Fix 2-3 vulnerabilities
  - Test and verify
  
- **Week 3**: Remaining medium issues + code quality
  - Fix remaining vulnerabilities
  - Remove hardcoded passwords
  - Final testing

### Week 4 (Final Sprint)
- **Verification**: Final Snyk scan
- **Documentation**: Update security docs
- **Monitoring**: Set up continuous monitoring

---

## SUCCESS METRICS

### Quantitative Metrics
- **Before Remediation**:
  - Critical: 1
  - High: 1
  - Medium: 5
  - Low: 8
  - **Total**: 15 issues

- **After Remediation Target**:
  - Critical: 0
  - High: 0
  - Medium: 0
  - Low: 0 (or documented/accepted)
  - **Total**: 0 critical security issues

### Qualitative Metrics
- ✅ All critical vulnerabilities resolved
- ✅ Authentication system secured
- ✅ Code quality improved
- ✅ Security best practices implemented
- ✅ Continuous monitoring established

---

## POST-REMEDIATION ACTIONS

### 1. Verify Fixes
```bash
# Backend
cd golang-gin-realworld-example-app
snyk test
go test ./...

# Frontend  
cd react-redux-realworld-example-app
npm audit
snyk test
snyk code test
npm test
```

### 2. Document Changes
- Update `CHANGELOG.md`
- Document breaking changes
- Update dependency documentation
- Create runbook for security updates

### 3. Continuous Monitoring
```bash
# Add to CI/CD pipeline
- snyk test --severity-threshold=high
- npm audit --audit-level=high
```

### 4. Team Training
- Share security findings
- Document lessons learned
- Update security guidelines
- Schedule regular security reviews

---

## RESOURCE REQUIREMENTS

### Personnel
- **Backend Developer**: 8-12 hours
- **Frontend Developer**: 12-16 hours
- **QA Engineer**: 6-8 hours
- **DevOps**: 2-4 hours (deployment)

### Tools
- ✅ Snyk CLI (already installed)
- ✅ npm audit (built-in)
- ✅ Git (version control)
- ⚠️ git-secrets (install for pre-commit hooks)

### Infrastructure
- Staging environment for testing
- CI/CD pipeline updates
- Monitoring/alerting setup

---

## APPENDIX: COMMANDS REFERENCE

### Snyk Commands
```bash
# Authenticate
snyk auth

# Test for vulnerabilities
snyk test

# Test and get JSON report
snyk test --json > report.json

# Code analysis
snyk code test

# Monitor project
snyk monitor

# Fix vulnerabilities
snyk fix
```

### npm Commands
```bash
# Check for vulnerabilities
npm audit

# Automated fix (safe)
npm audit fix

# Fix with breaking changes
npm audit fix --force

# List outdated packages
npm outdated

# Update all packages
npm update
```

### Go Commands
```bash
# Add dependency
go get package-name

# Update dependency
go get -u package-name

# Clean up
go mod tidy

# List dependencies
go list -m all
```

---

**Plan Created**: December 2024  
**Plan Owner**: SWE302 Security Team  
**Review Date**: Weekly during remediation  
**Completion Target**: End of Sprint 2
