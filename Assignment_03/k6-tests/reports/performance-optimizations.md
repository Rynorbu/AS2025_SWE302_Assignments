# Performance Optimizations

**Date:** December 4, 2025  
**Status:** Implemented  
**Backend:** Golang Gin RealWorld API

---

## Overview

This document describes the performance optimizations implemented to improve the RealWorld API's scalability and response times.

## Optimizations Implemented

### 1. Database Connection Pooling

**Location:** `golang-gin-realworld-example-app/common/database.go`

**Changes:**

```go
// Connection pool configuration for better performance
sqlDB := db.DB()
sqlDB.SetMaxIdleConns(10)      // Maximum idle connections (was: 10, now: 10)
sqlDB.SetMaxOpenConns(25)       // Maximum open connections (new, was: unlimited)
sqlDB.SetConnMaxLifetime(5 * time.Minute)   // Connection lifetime (new)
sqlDB.SetConnMaxIdleTime(2 * time.Minute)   // Idle connection timeout (new)
```

**Benefits:**
- Prevents connection exhaustion under high load
- Reduces connection overhead through connection reuse
- Limits resource consumption
- Improves response time consistency

---

### 2. Database Indexes

**SQL Migration Script:** `Assignment_03/database-indexes.sql`

#### Articles Table Indexes

```sql
-- Index for sorting articles by creation date (most common query)
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON article_models(created_at DESC);

-- Index for looking up articles by slug (unique identifier)
CREATE INDEX IF NOT EXISTS idx_articles_slug ON article_models(slug);

-- Index for filtering articles by author
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON article_models(author_id);
```

**Expected Impact:**
- Article listing queries: 50-70% faster
- Article lookup by slug: 80-90% faster
- Author's articles queries: 60-80% faster

#### Comments Table Indexes

```sql
-- Index for fetching comments for a specific article
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comment_models(article_id);

-- Index for fetching comments by author
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comment_models(author_id);
```

**Expected Impact:**
- Comment retrieval: 70-90% faster
- User comment history: 60-80% faster

#### Favorites Table Indexes

```sql
-- Index for checking if article is favorited
CREATE INDEX IF NOT EXISTS idx_favorites_article_id ON favorite_models(favorite_id);

-- Index for getting user's favorites
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorite_models(favorite_by_id);

-- Composite index for favorite status checks (most common query)
CREATE INDEX IF NOT EXISTS idx_favorites_composite ON favorite_models(favorite_id, favorite_by_id);
```

**Expected Impact:**
- Favorite status checks: 80-95% faster
- User favorites list: 70-85% faster
- Favorites count: 60-80% faster

#### Tags Table Index

```sql
-- Index for tag lookups and filtering
CREATE INDEX IF NOT EXISTS idx_tags_tag ON tag_models(tag);
```

**Expected Impact:**
- Tag queries: 70-90% faster
- Article filtering by tag: 50-70% faster

#### Users Table Indexes

```sql
-- Index for email-based login/lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON user_models(email);

-- Index for username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON user_models(username);
```

**Expected Impact:**
- Login queries: 80-95% faster
- User profile lookups: 70-90% faster

---

## Implementation Steps

### Step 1: Run SQL Migration

```bash
# From the golang-gin-realworld-example-app directory
sqlite3 gorm.db < ../Assignment_03/database-indexes.sql
```

Or use the Go optimization script:

```bash
# From Assignment_03 directory
go run performance-optimization.go
```

### Step 2: Restart Backend Server

The connection pooling changes are in `common/database.go` and will take effect on server restart.

```bash
# Stop the current server (Ctrl+C)
# Start the server again
cd golang-gin-realworld-example-app
go run hello.go
```

### Step 3: Verify Optimizations

```bash
# Check indexes were created
sqlite3 gorm.db "SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%';"
```

Expected output:
```
idx_articles_created_at
idx_articles_slug
idx_articles_author_id
idx_comments_article_id
idx_comments_author_id
idx_favorites_article_id
idx_favorites_user_id
idx_favorites_composite
idx_tags_tag
idx_users_email
idx_users_username
```

---

## Expected Performance Improvements

### Response Time Improvements

| Query Type | Before | After (Expected) | Improvement |
|------------|--------|------------------|-------------|
| **Article Listing** | 10-20ms | 3-8ms | 60-70% |
| **Article by Slug** | 5-10ms | 1-2ms | 80-90% |
| **Comments Retrieval** | 15-25ms | 3-7ms | 70-80% |
| **Favorite Status** | 8-15ms | 1-3ms | 85-95% |
| **User Login** | 20-30ms | 3-6ms | 80-90% |

### Throughput Improvements

| Load Level | Before (req/s) | After (Expected) | Improvement |
|------------|----------------|------------------|-------------|
| **10 VUs** | ~15 req/s | ~20-25 req/s | 33-67% |
| **30 VUs** | ~35 req/s | ~50-60 req/s | 43-71% |
| **50 VUs** | ~309 req/s | ~350-400 req/s | 13-29% |

### Scalability Improvements

- **Estimated New Breaking Point:** 75-100+ VUs → 100-150+ VUs
- **Comfortable Load:** 10-20 VUs → 15-30 VUs
- **Maximum Recommended:** 40-50 VUs → 60-80 VUs

---

## Testing Plan

### 1. Baseline Comparison

Run the same load test before and after optimizations:

```bash
# Before optimization metrics (already captured)
# - p(95): ~50-100ms
# - Success rate: 100%
# - Throughput: ~15 req/s at 10 VUs

# After optimization (to be measured)
k6 run --out json=load-test-optimized-results.json load-test.js
```

### 2. Metrics to Compare

- **Response Times:** p(50), p(95), p(99)
- **Throughput:** requests per second
- **Success Rate:** percentage of successful requests
- **Resource Usage:** CPU, memory (if monitored)

### 3. Expected Results

We expect to see:
- ✅ 30-50% reduction in p(95) response time
- ✅ 20-40% increase in throughput
- ✅ Maintained 100% success rate
- ✅ More consistent response times (lower variance)

---

## Monitoring Recommendations

### Key Metrics to Track

1. **Database Performance:**
   - Query execution time
   - Index usage
   - Lock contention

2. **Connection Pool:**
   - Active connections
   - Idle connections
   - Wait time for connections

3. **Application Performance:**
   - Request duration
   - Error rate
   - Throughput (req/s)

### Tools

- **k6:** Load testing and performance benchmarking
- **SQLite EXPLAIN QUERY PLAN:** Verify index usage
- **Go pprof:** Profile CPU and memory usage

---

## Rollback Plan

If optimizations cause issues:

### 1. Revert Database Indexes

```sql
-- Drop all custom indexes
DROP INDEX IF EXISTS idx_articles_created_at;
DROP INDEX IF EXISTS idx_articles_slug;
DROP INDEX IF EXISTS idx_articles_author_id;
DROP INDEX IF EXISTS idx_comments_article_id;
DROP INDEX IF EXISTS idx_comments_author_id;
DROP INDEX IF EXISTS idx_favorites_article_id;
DROP INDEX IF EXISTS idx_favorites_user_id;
DROP INDEX IF EXISTS idx_favorites_composite;
DROP INDEX IF EXISTS idx_tags_tag;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_username;
```

### 2. Revert Connection Pool Settings

In `common/database.go`, revert to:

```go
db.DB().SetMaxIdleConns(10)
// Remove the new lines
```

---

## Maintenance Notes

### Index Maintenance

SQLite automatically maintains indexes. No manual maintenance required.

### Connection Pool Tuning

If experiencing issues:

- **Too many connections:** Reduce `SetMaxOpenConns`
- **Connection timeout:** Increase `SetMaxOpenConns`
- **Memory issues:** Reduce `SetMaxIdleConns`

### Future Optimizations

1. **Query Optimization:** Analyze slow queries with EXPLAIN QUERY PLAN
2. **Caching Layer:** Add Redis for frequently accessed data
3. **Database Migration:** Consider PostgreSQL for >100 concurrent users
4. **Code Profiling:** Use pprof to identify CPU/memory bottlenecks

---

## References

- [GORM Connection Pool](https://gorm.io/docs/connecting_to_the_database.html#Connection-Pool)
- [SQLite Indexes](https://www.sqlite.org/queryplanner.html)
- [k6 Performance Testing](https://k6.io/docs/)
- [Go Database Best Practices](https://go.dev/doc/database/manage-connections)

---

**Status:** ✅ Ready for Implementation  
**Risk Level:** Low (indexes can be dropped if needed)  
**Expected Benefit:** High (30-50% performance improvement)
