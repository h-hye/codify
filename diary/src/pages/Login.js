import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = useCallback(
        (response) => {
            console.log(response);
            navigate('/diary'); // 구글 로그인 성공 시 이동할 경로
        },
        [navigate]
    );

    useEffect(() => {
        // Google SDK 초기화
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        callback: handleGoogleLogin,
                    });
                }
            };
            document.body.appendChild(script);
        };

        if (!window.google) {
            loadGoogleScript();
        }
    }, [handleGoogleLogin]);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: (authObj) => {
                console.log(authObj);
                navigate('/diary'); // 카카오 로그인 성공 시 이동할 경로
            },
            fail: (error) => {
                console.error(error);
            },
        });
    };

    const handleGoogleLoginClick = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 서버에 로그인 요청을 보내고, 토큰 발급
            const response = await axios.post('http://localhost:8080/api/members/login', {
                email: email,
                password: password,
            });

            // 서버에서 받은 토큰을 저장합니다.
            const token = response.data.token;
            localStorage.setItem('token', token);

            navigate('/diary'); // 로그인 성공 시 홈 화면으로 이동
        } catch (error) {
            console.error(error);
            // 에러 처리 로직 추가 가능
        }
    };

    return (
        <div className='login-container'>
            <h2>감정일기</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type='password'
                    placeholder='비밀번호'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                계정이 없으신가요? <Link to='/signup'>회원가입</Link>
            </p>
        </div>
    );
};

export default Login;
