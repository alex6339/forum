import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            });
            
            // 存储token和用户ID
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            
            // 重定向到首页
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || '登录失败');
        }
    };

    return (
        <div className="login-container">
            <h2>登录投资论坛</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>电子邮箱</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>密码</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">登录</button>
            </form>
            <p className="mt-3">
                还没有账号？<a href="/register">立即注册</a>
            </p>
        </div>
    );
};

export default LoginForm;

// API 基础 URL
const API_BASE_URL = 'https://your-backend-url.com'; // 这里需要替换为实际的后端 URL

document.addEventListener('DOMContentLoaded', () => {
    // 标签切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新内容显示
            tabContents.forEach(content => {
                content.style.display = content.id === tabId ? 'block' : 'none';
            });
        });
    });

    // 登录表单提交
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('登录成功！');
                // 这里可以添加登录成功后的跳转逻辑
            } else {
                alert(data.message || '登录失败');
            }
        } catch (error) {
            alert('登录失败，请稍后重试');
        }
    });

    // 注册表单提交
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('注册成功！');
                // 这里可以添加注册成功后的跳转逻辑
            } else {
                alert(data.message || '注册失败');
            }
        } catch (error) {
            alert('注册失败，请稍后重试');
        }
    });
});