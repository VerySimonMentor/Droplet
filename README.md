# Droplet

# 项目文件结构

```plaintext
droplet/
├── cmd/                     # 包含应用程序的入口文件
│   ├── app/                 # 主应用程序目录
│   │   └── main.go          # Web后端应用程序入口
├── internal/                # 存放应用程序的核心代码
│   ├── config/              # 配置相关代码和文件
│   ├── handlers/            # 处理HTTP请求的代码
│   ├── middleware/          # 中间件代码，如认证、日志记录等
│   ├── models/              # 数据模型的定义
│   ├── mysql/               # 与MySQL数据库交互的代码
│   ├── routes/              # 路由定义的代码
│   ├── services/            # 业务逻辑代码
│   └── utils/               # 工具函数和通用功能代码
├── scripts/                 # 存放SQL脚本和其他辅助脚本
│   ├── init_db.sql          # 初始化数据库的SQL脚本
│   ├── migrate.sh           # 数据库迁移脚本
│   └── other_script.sh      # 其他辅助脚本
├── web/                     # 前端代码目录
│   ├── public/              # 公共静态资源目录，包含HTML文件和其他静态资源
│   │   ├── index.html       # 前端入口HTML文件
│   │   └── assets/          # 静态资源，如图片、字体等
│   │       ├── images/      # 图片资源
│   │       ├── fonts/       # 字体资源
│   │       └── css/         # 全局CSS文件
│   └── src/                 # 前端源代码目录
│       ├── assets/          # JS中的静态资源
│       │   ├── images/      # JS中引用的图片资源
│       │   ├── fonts/       # JS中引用的字体资源
│       │   └── css/         # JS中引用的CSS文件
│       ├── components/      # 通用组件
│       │   ├── Button.js    # 按钮组件
│       │   ├── Header.js    # 页头组件
│       │   └── Footer.js    # 页脚组件
│       ├── pages/           # 页面组件
│       │   ├── HomePage.js  # 主页组件
│       │   ├── AboutPage.js # 关于页面组件
│       │   └── ContactPage.js # 联系页面组件
│       ├── services/        # 与后端交互的服务
│       │   ├── api.js       # 核心API服务
│       │   └── authService.js # 认证服务
│       │   └── userService.js # 用户服务
│       ├── hooks/           # 自定义Hooks
│       │   └── useAuth.js   # 认证相关的自定义Hook
│       ├── context/         # React上下文，管理全局状态
│       │   └── AuthContext.js # 认证上下文
│       ├── utils/           # 工具函数
│       │   └── helpers.js   # 辅助工具函数
│       ├── App.js           # 主应用文件
│       └── index.js         # 入口JS文件
├── .env                     # 环境变量文件
├── .gitignore               # Git忽略文件
├── go.mod                   # Go模块文件，定义项目的模块依赖
├── go.sum                   # 依赖管理文件
├── Dockerfile               # Docker文件，用于创建Docker镜像
└── README.md                # 项目说明文档
```