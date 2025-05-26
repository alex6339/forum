# 论坛系统

这是一个基于 Node.js 和 MongoDB 的论坛系统。

## 功能特性

- 用户注册和登录
- JWT 认证
- 响应式设计

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
创建 `.env` 文件并添加以下内容：
```
MONGODB_URI=mongodb://localhost:27017/forum
JWT_SECRET=your-secret-key
PORT=3000
```

3. 启动服务器：
```bash
node server.js
```

## 部署

### 前端部署（GitHub Pages）

1. Fork 这个仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为源
4. 更新 `js/script.js` 中的 `API_BASE_URL` 为你的后端 API 地址

### 后端部署

推荐使用以下平台之一部署后端：

- Heroku
- Vercel
- Railway
- MongoDB Atlas（数据库）

## 技术栈

- 前端：HTML, CSS, JavaScript
- 后端：Node.js, Express
- 数据库：MongoDB
- 认证：JWT 