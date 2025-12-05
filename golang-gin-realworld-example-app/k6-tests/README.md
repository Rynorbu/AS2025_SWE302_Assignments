# k6 Performance Testing

## Test Configuration

All tests have been configured for realistic load levels based on the backend's capacity.

### Test Files

1. **load-test.js** - Basic load testing (7 minutes)
   - 5 VUs for 3 minutes
   - 10 VUs for 3 minutes
   - Tests normal operation under expected load

2. **stress-test.js** - Finding breaking points (11 minutes)
   - Gradually increases from 10 → 20 → 30 VUs
   - Identifies system limits and degradation points

3. **spike-test.js** - Sudden traffic spikes (6.5 minutes)
   - Simulates sudden traffic increase (5 → 50 VUs)
   - Tests system recovery

4. **soak-test.js** - Long-duration stability (12 minutes)
   - 10 VUs for 10 minutes
   - Tests for memory leaks and performance degradation over time

## Running Tests

Make sure the backend server is running on http://localhost:8081

```bash
# Run load test
k6 run --out json=load-test-results.json load-test.js

# Run stress test
k6 run --out json=stress-test-results.json stress-test.js

# Run spike test
k6 run --out json=spike-test-results.json spike-test.js

# Run soak test
k6 run --out json=soak-test-results.json soak-test.js
```

## Expected Outcomes

Based on initial testing, the backend shows:
- Timeouts starting at 50+ concurrent users
- Performance degradation under sustained load
- Need for database optimization and connection pooling

These findings will be documented in the analysis reports.
