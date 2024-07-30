import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직을 여기에서 처리
        // 예를 들어, 사용자가 입력한 이메일과 비밀번호를 서버로 전송하여 인증
        // 로그인 성공 시 홈 화면으로 이동
        navigate('/'); // 홈 화면으로 이동
    };

    return (
        <div className='login-container'>
            <h2>감정일기</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='이메일' />
                <input type='password' placeholder='비밀번호' />
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
