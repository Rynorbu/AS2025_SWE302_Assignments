package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"realworld-backend/articles"
	"realworld-backend/common"
	"realworld-backend/users"

	"github.com/jinzhu/gorm"
)

func Migrate(db *gorm.DB) {
	users.AutoMigrate()
	db.AutoMigrate(&articles.ArticleModel{})
	db.AutoMigrate(&articles.TagModel{})
	db.AutoMigrate(&articles.FavoriteModel{})
	db.AutoMigrate(&articles.ArticleUserModel{})
	db.AutoMigrate(&articles.CommentModel{})

	// Create performance indexes
	createPerformanceIndexes(db)
}

// createPerformanceIndexes creates database indexes for better query performance
func createPerformanceIndexes(db *gorm.DB) {
	indexes := []string{
		"CREATE INDEX IF NOT EXISTS idx_articles_created_at ON article_models(created_at DESC)",
		"CREATE INDEX IF NOT EXISTS idx_articles_slug ON article_models(slug)",
		"CREATE INDEX IF NOT EXISTS idx_articles_author_id ON article_models(author_id)",
		"CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comment_models(article_id)",
		"CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comment_models(author_id)",
		"CREATE INDEX IF NOT EXISTS idx_favorites_article_id ON favorite_models(favorite_id)",
		"CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorite_models(favorite_by_id)",
		"CREATE INDEX IF NOT EXISTS idx_favorites_composite ON favorite_models(favorite_id, favorite_by_id)",
		"CREATE INDEX IF NOT EXISTS idx_tags_tag ON tag_models(tag)",
		"CREATE INDEX IF NOT EXISTS idx_users_email ON user_models(email)",
		"CREATE INDEX IF NOT EXISTS idx_users_username ON user_models(username)",
	}

	for _, sql := range indexes {
		db.Exec(sql)
	}

	fmt.Println("✅ Performance indexes created")
}

func main() {

	db := common.Init()
	Migrate(db)
	defer db.Close()

	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4100"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	v1 := r.Group("/api")
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))
	articles.ArticlesAnonymousRegister(v1.Group("/articles"))
	articles.TagsAnonymousRegister(v1.Group("/tags"))

	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))
	users.ProfileRegister(v1.Group("/profiles"))

	articles.ArticlesRegister(v1.Group("/articles"))

	testAuth := r.Group("/api/ping")

	testAuth.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// test 1 to 1
	tx1 := db.Begin()
	userA := users.UserModel{
		Username: "AAAAAAAAAAAAAAAA",
		Email:    "aaaa@g.cn",
		Bio:      "hehddeda",
		Image:    nil,
	}
	tx1.Save(&userA)
	tx1.Commit()
	fmt.Println(userA)

	//db.Save(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//})
	//var userAA ArticleUserModel
	//db.Where(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//}).First(&userAA)
	//fmt.Println(userAA)

	r.Run(":8081") // listen and serve on 0.0.0.0:8081
}
