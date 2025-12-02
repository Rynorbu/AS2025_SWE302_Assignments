# ZAP Testing - Quick Command Reference

**For Assignment 2 - OWASP ZAP Testing**

---

## Setup Commands

### 1. Start Backend
```powershell
cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\golang-gin-realworld-example-app
go run hello.go
```
📸 Screenshot this when running successfully

### 2. Start Frontend
```powershell
cd c:\Users\HP\Downloads\swe302_assignments-master\swe302_assignments-master\react-redux-realworld-example-app
npm start
```
📸 Screenshot this when compiled successfully

### 3. Verify Apps Running
```powershell
# Test backend
curl http://localhost:8080/api/tags

# Test frontend (open in browser)
start http://localhost:4100
```

---

## Manual API Testing Commands

### Authentication Testing

**1. Register Test User:**
```powershell
curl -X POST http://localhost:8080/api/users `
  -H "Content-Type: application/json" `
  -d '{\"user\":{\"username\":\"zaptest\",\"email\":\"zaptest@security.test\",\"password\":\"ZapTest123!@#\"}}'
```
📸 Screenshot the response

**2. Login:**
```powershell
curl -X POST http://localhost:8080/api/users/login `
  -H "Content-Type: application/json" `
  -d '{\"user\":{\"email\":\"zaptest@security.test\",\"password\":\"ZapTest123!@#\"}}'
```
📸 Screenshot and save the token from response

**3. Test Auth Bypass (should fail):**
```powershell
curl http://localhost:8080/api/user
```
📸 Screenshot the 401 error

**4. Test Invalid Token (should fail):**
```powershell
curl http://localhost:8080/api/user `
  -H "Authorization: Token invalidtoken123"
```
📸 Screenshot the error

---

### SQL Injection Testing

**Replace YOUR_TOKEN with actual token**

**Test 1: SQL Injection in tag filter:**
```powershell
curl "http://localhost:8080/api/articles?tag=test' OR '1'='1"
```
📸 Screenshot the response (error or empty result)

**Test 2: SQL Injection with UNION:**
```powershell
curl "http://localhost:8080/api/articles?tag=test' UNION SELECT * FROM users--"
```
📸 Screenshot the response

---

### XSS Testing

**Test 1: Create article with XSS payload:**
```powershell
$token = "YOUR_TOKEN_HERE"
curl -X POST http://localhost:8080/api/articles `
  -H "Authorization: Token $token" `
  -H "Content-Type: application/json" `
  -d '{\"article\":{\"title\":\"XSS Test\",\"description\":\"Test\",\"body\":\"<script>alert('"'"'XSS'"'"')</script>\",\"tagList\":[\"test\"]}}'
```
📸 Screenshot the creation response
📸 Then view article in browser and screenshot if XSS executes

**Test 2: XSS in comment:**
```powershell
curl -X POST http://localhost:8080/api/articles/test-article/comments `
  -H "Authorization: Token $token" `
  -H "Content-Type: application/json" `
  -d '{\"comment\":{\"body\":\"<img src=x onerror=alert('"'"'XSS'"'"')>\"}}'
```
📸 Screenshot result

---

### IDOR Testing

**Setup: Create second test user first**

**1. Login as User A, create article:**
```powershell
$tokenA = "USER_A_TOKEN"
curl -X POST http://localhost:8080/api/articles `
  -H "Authorization: Token $tokenA" `
  -H "Content-Type: application/json" `
  -d '{\"article\":{\"title\":\"User A Secret\",\"description\":\"Secret\",\"body\":\"Secret article\",\"tagList\":[\"test\"]}}'
```

**2. Try to delete as User B (should fail):**
```powershell
$tokenB = "USER_B_TOKEN"
curl -X DELETE http://localhost:8080/api/articles/user-a-secret `
  -H "Authorization: Token $tokenB"
```
📸 Screenshot - should show 403 Forbidden if secure, or success if vulnerable

---

### Rate Limiting Testing

**Test login rate limit:**
```powershell
# Send 10 requests rapidly
for ($i=1; $i -le 10; $i++) {
  Write-Host "Request $i"
  curl -X POST http://localhost:8080/api/users/login `
    -H "Content-Type: application/json" `
    -d '{\"user\":{\"email\":\"test@test.com\",\"password\":\"wrong\"}}'
}
```
📸 Screenshot showing rate limit kicked in (429 error) or all succeeded (vulnerable)

---

### Security Headers Testing

**Check security headers:**
```powershell
curl -I http://localhost:8080/api/articles
```
📸 Screenshot showing headers (before fixes: missing, after fixes: present)

**Look for these headers:**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: ...
- Strict-Transport-Security: ...

---

## ZAP GUI Actions

### Passive Scan
1. ZAP → Quick Start → Automated Scan
2. URL: `http://localhost:4100`
3. Use traditional spider: YES
4. Click "Attack"
5. 📸 Screenshot: Configuration
6. Wait for completion
7. 📸 Screenshot: Alerts tab showing findings
8. Report → Generate HTML Report
9. 📸 Screenshot: Generated report

### Active Scan
1. Right-click `http://localhost:4100` in Sites tree
2. Include in Context → New Context → Name: "Conduit Authenticated"
3. 📸 Screenshot: Context creation
4. Session Properties → Authentication
5. Method: JSON-based authentication
6. Login URL: `http://localhost:8080/api/users/login`
7. POST Data: `{"user":{"email":"zaptest@security.test","password":"ZapTest123!@#"}}`
8. 📸 Screenshot: Auth configuration
9. Add User → Username: zaptest
10. 📸 Screenshot: User configuration
11. Right-click site → Attack → Spider as User
12. 📸 Screenshot: Spider configuration
13. Wait for spider completion
14. 📸 Screenshot: Spider results
15. Right-click site → Attack → Active Scan
16. Select context and user
17. 📸 Screenshot: Active scan starting
18. Wait for completion (30-60 min)
19. 📸 Screenshot: Active scan complete
20. Review alerts
21. 📸 Screenshot: Each type of vulnerability found
22. Export reports (HTML, XML, JSON)
23. 📸 Screenshot: Reports exported

---

## After Implementing Fixes

### Verify Security Headers
```powershell
curl -I http://localhost:8080/api/articles
```
📸 Screenshot showing ALL security headers present

### Re-test SQL Injection (should be blocked)
```powershell
curl "http://localhost:8080/api/articles?tag=test' OR '1'='1"
```
📸 Screenshot showing safe handling

### Re-test XSS (should be sanitized)
```powershell
$token = "YOUR_TOKEN"
curl -X POST http://localhost:8080/api/articles `
  -H "Authorization: Token $token" `
  -H "Content-Type: application/json" `
  -d '{\"article\":{\"title\":\"Test\",\"description\":\"Test\",\"body\":\"<script>alert('"'"'XSS'"'"')</script>\"}}'
```
📸 Screenshot showing sanitized content in response

### Re-test IDOR (should get 403)
```powershell
$tokenB = "USER_B_TOKEN"
curl -X DELETE http://localhost:8080/api/articles/user-a-article `
  -H "Authorization: Token $tokenB" -v
```
📸 Screenshot showing 403 Forbidden

### Re-test Rate Limiting (should get 429)
```powershell
for ($i=1; $i -le 10; $i++) {
  curl -X POST http://localhost:8080/api/users/login `
    -H "Content-Type: application/json" `
    -d '{\"user\":{\"email\":\"test@test.com\",\"password\":\"wrong\"}}'
}
```
📸 Screenshot showing 429 Too Many Requests

---

## Final Verification

### Run Complete ZAP Scan Again
1. File → New Session (clear previous)
2. Run full passive + active scan
3. 📸 Screenshot: Before fix - vulnerability count
4. 📸 Screenshot: After fix - vulnerability count  
5. 📸 Screenshot: Improvement metrics

### Compare Vulnerability Counts
Document in table format:

| Severity | Before | After | Improvement |
|----------|--------|-------|-------------|
| Critical | X | 0 | 100% |
| High | Y | Z | %% |
| Medium | A | B | %% |

---

## Screenshot Checklist

### Setup (6 screenshots)
- [ ] ZAP welcome screen
- [ ] Backend running
- [ ] Frontend running
- [ ] Conduit homepage
- [ ] Test user registered
- [ ] Test articles created

### Passive Scan (8 screenshots)
- [ ] Quick start config
- [ ] Spider progress
- [ ] Alerts overview
- [ ] High severity finding
- [ ] CSP missing
- [ ] CSRF issues
- [ ] Cookie security
- [ ] HTML report

### Active Scan (15+ screenshots)
- [ ] Context creation
- [ ] Context URLs
- [ ] Auth configuration
- [ ] Login indicators
- [ ] Login test response
- [ ] User configuration
- [ ] Scan policy
- [ ] Spider as user
- [ ] Spider complete
- [ ] Active scan start
- [ ] Active scan progress
- [ ] Active scan complete
- [ ] SQL injection finding (if any)
- [ ] XSS finding (if any)
- [ ] IDOR finding (if any)
- [ ] Reports exported

### API Testing (9 screenshots)
- [ ] Auth bypass test
- [ ] Invalid token test
- [ ] Authorization test
- [ ] SQL injection test
- [ ] XSS test creation
- [ ] XSS execution (if applicable)
- [ ] Rate limit fuzzer config
- [ ] Rate limit results
- [ ] Verbose error

### Final (5 screenshots)
- [ ] Security headers in code
- [ ] Headers in HTTP response
- [ ] Before vulnerability count
- [ ] After vulnerability count
- [ ] Final report summary

**Total: ~48 screenshots minimum**

---

## Tips

1. **Save token in variable for reuse:**
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5..."
curl http://localhost:8080/api/user -H "Authorization: Token $token"
```

2. **Pretty print JSON responses:**
```powershell
curl http://localhost:8080/api/articles | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

3. **Save response to file:**
```powershell
curl http://localhost:8080/api/articles > response.json
```

4. **Check if services are running:**
```powershell
# Check backend
Test-NetConnection -ComputerName localhost -Port 8080

# Check frontend
Test-NetConnection -ComputerName localhost -Port 4100
```

---

## Troubleshooting

**Backend won't start:**
```powershell
# Check if port is in use
Get-NetTCPConnection -LocalPort 8080

# Kill process using port
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force
```

**Frontend won't start:**
```powershell
# Same for port 4100
Get-NetTCPConnection -LocalPort 4100
Stop-Process -Id (Get-NetTCPConnection -LocalPort 4100).OwningProcess -Force
```

**CORS errors in browser:**
- This is expected for security testing
- Document as a finding
- Can be configured in backend for specific origins

---

**Good luck with your ZAP testing!**

Remember: Screenshot everything as you go - it's easier than trying to recreate later!
