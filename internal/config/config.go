package config

import (
	"Institution/logs" // 引入日志包，用于记录日志
	"os"               // 引入操作系统包，用于文件操作

	"gopkg.in/yaml.v3" // 引入yaml包，用于解析YAML格式的配置文件
)


// Config结构体定义了整个应用的配置
type Config struct {
	Redis  RedisConfig  `yaml:"redis"`   // Redis配置
	MySQL  MySQLConfig  `yaml:"mysql"`   // MySQL配置
	Server ServerConfig `yaml:"server"`  // 服务器配置
	Admin  AdminConfig  `yaml:"admin"`   // 管理员配置
}

// Redis配置结构体
type RedisConfig struct {
	Addr     string `yaml:"addr"`
	Password string `yaml:"password"`
	DB       int    `yaml:"db"`
}

// MySQL配置结构体
type MySQLConfig struct {
	Name     string `yaml:"name"`
	PassWord string `yaml:"password"`
	Addr     string `yaml:"addr"`
	DB       string `yaml:"db"`
}

// 服务器配置结构体
type ServerConfig struct {
	Port int `yaml:"port"`
}

// 管理员配置结构体
type AdminConfig struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}


// 初始化配置
func InitServerConfig(fileName string) {
	// 读取配置文件
	configFile, err := os.ReadFile(fileName)
	if err != nil {
		// 如果读取文件失败，记录错误日志
		logs.GetInstance().Logger.Errorf("server config %s not found %s", fileName, err)
		return
	}
	// 解析YAML格式的配置文件
	err = yaml.Unmarshal(configFile, config)
	if err != nil {
		// 如果解析失败，记录错误日志
		logs.GetInstance().Logger.Errorf("config yaml unmarshal error %s", err)
	}
}


var config = &Config{} // 全局配置实例

// 返回配置对象
func GetServerConfig() *Config {
	return config // 返回全局配置实例
}

