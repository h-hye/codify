import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

    // useCallback을 사용하여 handleGoogleLogin을 메모이제이션
    const handleGoogleLogin = useCallback(
        (response) => {
            console.log(response);
            navigate('/diary');
        },
        [navigate]
    );

    useEffect(() => {
        // Kakao SDK 초기화
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY); // 환경 변수에서 키를 가져옵니다
        }

        // 구글 SDK 초기화
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // 환경 변수에서 클라이언트 ID를 가져옵니다
            callback: handleGoogleLogin,
        });
    }, [handleGoogleLogin]);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: (authObj) => {
                console.log(authObj);
                navigate('/diary');
            },
            fail: (error) => {
                console.error(error);
            },
        });
    };

    const handleGoogleLoginClick = () => {
        window.google.accounts.id.prompt();
    };

    return (
        <div className='login-container'>
            <h2>감정일기</h2>
            <form>
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
                계정이 없으신가요? <a href='/signup'>회원가입</a>
            </p>
        </div>
    );
};

export default Login;
