-- Performance Optimization: Database Indexes
-- Date: December 4, 2025
-- Purpose: Add indexes to improve query performance for the RealWorld API

-- ============================================
-- Articles Table Indexes
-- ============================================

-- Index for sorting articles by creation date (DESC for recent first)
-- Used in: GET /api/articles (default sorting)
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON article_models(created_at DESC);

-- Index for article lookups by slug
-- Used in: GET /api/articles/:slug
CREATE INDEX IF NOT EXISTS idx_articles_slug ON article_models(slug);

-- Index for filtering articles by author
-- Used in: GET /api/articles?author=username
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON article_models(author_id);

-- ============================================
-- Comments Table Indexes
-- ============================================

-- Index for fetching comments for a specific article
-- Used in: GET /api/articles/:slug/comments
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comment_models(article_id);

-- Index for fetching comments by author
-- Used in: User comment history queries
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comment_models(author_id);

-- ============================================
-- Favorites Table Indexes
-- ============================================

-- Index for checking if an article is favorited
-- Used in: Favorites count, favorite status checks
CREATE INDEX IF NOT EXISTS idx_favorites_article_id ON favorite_models(favorite_id);

-- Index for getting a user's favorites
-- Used in: GET /api/articles?favorited=username
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorite_models(favorite_by_id);

-- Composite index for favorite status checks (most efficient for this query)
-- Used in: POST/DELETE /api/articles/:slug/favorite
CREATE INDEX IF NOT EXISTS idx_favorites_composite ON favorite_models(favorite_id, favorite_by_id);

-- ============================================
-- Tags Table Index
-- ============================================

-- Index for tag lookups and filtering
-- Used in: GET /api/tags, GET /api/articles?tag=tagname
CREATE INDEX IF NOT EXISTS idx_tags_tag ON tag_models(tag);

-- ============================================
-- Users Table Indexes
-- ============================================

-- Index for email-based login/lookup
-- Used in: POST /api/users/login
CREATE INDEX IF NOT EXISTS idx_users_email ON user_models(email);

-- Index for username lookups
-- Used in: GET /api/profiles/:username
CREATE INDEX IF NOT EXISTS idx_users_username ON user_models(username);

-- ============================================
-- Verification Query
-- ============================================

-- Run this to verify all indexes were created:
-- SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%' ORDER BY name;
