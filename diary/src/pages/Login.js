import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleGoogleLogin = useCallback(
        (response) => {
            console.log(response);
            localStorage.setItem('token', response.token); // 토큰 저장
            navigate('/main');
        },
        [navigate]
    );

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
        }

        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin,
            });
        } else {
            console.error('Google API client library not loaded.');
        }
    }, [handleGoogleLogin]);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: (authObj) => {
                console.log(authObj);
                localStorage.setItem('token', authObj.access_token); // 토큰 저장
                navigate('/main');
            },
            fail: (error) => {
                console.error(error);
            },
        });
    };

    const handleGoogleLoginClick = () => {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.prompt();
        } else {
            console.error('Google API client library not loaded.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/members/join', {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // 토큰 저장
            navigate('/main');
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인 실패');
        }
    };

    return (
        <div className='login-container'>
            <h2>감정일기</h2>
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='이메일'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='비밀번호'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit' className='login'>
                    로그인
                </button>
            </form>
            <button className='kakao' onClick={handleKakaoLogin}>
                카카오 로그인
            </button>
            <button className='google' onClick={handleGoogleLoginClick}>
                구글 로그인
            </button>
            <p>
                계정이 없으신가요? <a href='/signup'>회원가입</a>
            </p>
            <p>
                <a href='/find-name'>이름 찾기</a> | <a href='/find-password'>비밀번호 찾기</a>
            </p>
        </div>
    );
};

export default Login;
