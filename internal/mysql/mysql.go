package mysql

import (
	"Institution/config" // 引入配置包，用于读取MySQL配置
	"Institution/logs"   // 引入日志包，用于记录日志
	"fmt"                // 引入基础格式化输出包

	"gorm.io/driver/mysql" // 引入GORM的MySQL驱动
	"gorm.io/gorm"         // 引入GORM包，用于ORM操作
)


var db *gorm.DB // 全局数据库实例

// 初始化gorm
func MysqlInit(config config.MySQLConfig) {
	// 构建数据源名称（DSN）
	dataSourceName := fmt.Sprintf("%s:%s@tcp(%s)/%s", config.Name, config.PassWord, config.Addr, config.DB)
	// 使用GORM打开一个MySQL数据库连接
	DB, err := gorm.Open(mysql.Open(dataSourceName))
	if err != nil {
		// 如果连接失败，记录错误日志
		logs.GetInstance().Logger.Errorf("init mysql error %s", err)
	}
	// 将数据库实例赋值给全局变量
	db = DB
}


// 返回gorm对象
func GetClient() *gorm.DB {
	return db // 返回全局数据库实例
}

