package main

import (
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// Performance Optimization Script
// This script adds database indexes and connection pooling to improve performance

func main() {
	fmt.Println("🚀 Starting Performance Optimization...")
	fmt.Println(strings.Repeat("=", 60))

	// Open database connection
	db, err := gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Get SQL DB instance for advanced configuration
	sqlDB := db.DB()

	fmt.Println("\n📊 Step 1: Configuring Connection Pool...")

	// Connection Pool Configuration
	// These settings optimize database connections for better performance
	sqlDB.SetMaxOpenConns(25)                 // Maximum number of open connections
	sqlDB.SetMaxIdleConns(10)                 // Maximum number of idle connections
	sqlDB.SetConnMaxLifetime(5 * time.Minute) // Maximum lifetime of a connection
	sqlDB.SetConnMaxIdleTime(2 * time.Minute) // Maximum idle time of a connection

	fmt.Println("   ✅ SetMaxOpenConns: 25")
	fmt.Println("   ✅ SetMaxIdleConns: 10")
	fmt.Println("   ✅ SetConnMaxLifetime: 5 minutes")
	fmt.Println("   ✅ SetConnMaxIdleTime: 2 minutes")

	fmt.Println("\n🔍 Step 2: Creating Database Indexes...")

	// Create indexes for better query performance
	indexes := []struct {
		Table string
		Index string
		SQL   string
	}{
		{
			Table: "article_models",
			Index: "idx_articles_created_at",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_articles_created_at ON article_models(created_at DESC)",
		},
		{
			Table: "article_models",
			Index: "idx_articles_slug",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_articles_slug ON article_models(slug)",
		},
		{
			Table: "article_models",
			Index: "idx_articles_author_id",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_articles_author_id ON article_models(author_id)",
		},
		{
			Table: "comment_models",
			Index: "idx_comments_article_id",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comment_models(article_id)",
		},
		{
			Table: "comment_models",
			Index: "idx_comments_author_id",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comment_models(author_id)",
		},
		{
			Table: "favorite_models",
			Index: "idx_favorites_article_id",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_favorites_article_id ON favorite_models(favorite_id)",
		},
		{
			Table: "favorite_models",
			Index: "idx_favorites_user_id",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorite_models(favorite_by_id)",
		},
		{
			Table: "favorite_models",
			Index: "idx_favorites_composite",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_favorites_composite ON favorite_models(favorite_id, favorite_by_id)",
		},
		{
			Table: "tag_models",
			Index: "idx_tags_tag",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_tags_tag ON tag_models(tag)",
		},
		{
			Table: "user_models",
			Index: "idx_users_email",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_users_email ON user_models(email)",
		},
		{
			Table: "user_models",
			Index: "idx_users_username",
			SQL:   "CREATE INDEX IF NOT EXISTS idx_users_username ON user_models(username)",
		},
	}

	successCount := 0
	errorCount := 0

	for _, idx := range indexes {
		err := db.Exec(idx.SQL).Error
		if err != nil {
			fmt.Printf("   ❌ Failed to create %s: %v\n", idx.Index, err)
			errorCount++
		} else {
			fmt.Printf("   ✅ Created index: %s on %s\n", idx.Index, idx.Table)
			successCount++
		}
	}

	fmt.Println("\n📈 Step 3: Optimization Summary")
	fmt.Printf("   ✅ Successfully created: %d indexes\n", successCount)
	if errorCount > 0 {
		fmt.Printf("   ⚠️  Failed: %d indexes\n", errorCount)
	}

	fmt.Println("\n🔧 Step 4: Verifying Indexes...")

	// Verify indexes were created
	var indexList []string
	rows, err := sqlDB.Query("SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%'")
	if err != nil {
		log.Printf("Warning: Could not verify indexes: %v", err)
	} else {
		defer rows.Close()
		for rows.Next() {
			var indexName string
			rows.Scan(&indexName)
			indexList = append(indexList, indexName)
		}
		fmt.Printf("   📊 Total custom indexes found: %d\n", len(indexList))
		for _, idx := range indexList {
			fmt.Printf("      - %s\n", idx)
		}
	}

	fmt.Println("\n" + strings.Repeat("=", 60))
	fmt.Println("✨ Performance Optimization Complete!")
	fmt.Println("\n📝 Next Steps:")
	fmt.Println("   1. Restart the backend server")
	fmt.Println("   2. Run k6 load tests again to measure improvement")
	fmt.Println("   3. Compare before/after metrics")
	fmt.Println(strings.Repeat("=", 60))
}
