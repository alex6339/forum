const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('.')); // 提供静态文件服务

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/forum')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 用户模型
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  registration_date: Date,
  last_login: Date
});

const User = mongoose.model('User', userSchema);

// 用户注册
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 检查用户是否已存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "用户已存在" });
        }
        
        // 哈希密码
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // 创建新用户
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            registration_date: new Date()
        });
        
        await newUser.save();
        
        // 创建JWT令牌
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "注册失败" });
    }
});

// 用户登录
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 查找用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "认证失败" });
        }
        
        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "认证失败" });
        }
        
        // 创建JWT令牌
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        // 更新最后登录时间
        user.last_login = new Date();
        await user.save();
        
        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "登录失败" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 