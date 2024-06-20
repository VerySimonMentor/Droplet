package logs

import (
	"fmt"     // 用于格式化输出
	"io"      // 提供基本的I/O接口
	"os"      // 用于处理操作系统功能，如文件操作
	"sync"    // 提供同步原语，如互斥锁
	"time"    // 提供时间操作

	"github.com/sirupsen/logrus" // 引入logrus库，用于日志记录
)


// 全局变量
var (
	loggerInstance *Log  // 单例模式，全局唯一的日志实例
	mutex          sync.Mutex  // 互斥锁，用于控制并发访问全局日志实例

	rootPath string  // 日志文件的根路径
)


type Log struct {
	Logger *logrus.Logger  // logrus的Logger对象

	logFile     *os.File   // 日志文件的文件句柄
	logFileName string     // 日志文件的名称
}


func (l *Log) initLog() {
	l.Logger = logrus.New()  // 创建一个新的logrus Logger
	l.Logger.SetLevel(logrus.DebugLevel)  // 设置日志级别为Debug
	l.Logger.SetFormatter(&logrus.TextFormatter{  // 设置日志的格式
		FullTimestamp: true,
	})
	l.Logger.SetReportCaller(true)  // 设置为true，logrus将包括调用函数信息，便于追踪
	now := time.Now()  // 获取当前时间
	l.logFileName = fmt.Sprintf(rootPath+"/logs/log-%d-%d-%d.txt", now.Year(), now.Month(), now.Day())  // 格式化日志文件名
	logFileTemp, err := os.OpenFile(l.logFileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)  // 打开或创建日志文件
	if err != nil {
		l.Logger.Fatal(err)  // 如果打开文件失败，记录致命错误并退出
	}
	l.logFile = logFileTemp

	l.Logger.SetOutput(io.MultiWriter(os.Stdout, l.logFile))  // 设置日志的输出，同时写入标准输出和文件
}


func GetInstance() *Log {
	if loggerInstance == nil {  // 检查实例是否已创建
		mutex.Lock()  // 加锁
		defer mutex.Unlock()  // 解锁

		if loggerInstance == nil {  // 双重检查锁定
			loggerInstance = &Log{}  // 创建日志实例
			loggerInstance.initLog()  // 初始化日志
		}
	}

	return loggerInstance  // 返回日志实例
}


func (l *Log) CloseLogFile() {
	l.logFile.Close()  // 关闭日志文件的文件句柄
}


func SetRootPath(path string) {
	rootPath = path  // 设置日志文件的根路径
}

