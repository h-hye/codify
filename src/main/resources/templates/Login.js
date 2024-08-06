import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authInstance from '../apis/authInstance';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(''); // 커스텀 알림 메시지 상태

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 서버에 로그인 요청을 보내고, 토큰 발급
            const response = await authInstance.post('/api/members/login', {
                email: email,
                password: password,
            });
            console.log(response);
            const { accessToken, refreshToken } = response.token;
            localStorage.setItem('access', accessToken);
            localStorage.setItem('refresh', refreshToken);
            navigate('/main'); // 로그인 성공 시 홈 화면으로 이동
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 400) {
                    setAlertMessage(['잘못된 요청입니다. 입력한 내용을 확인해주세요.']);
                } else if (error.response.status === 401) {
                    setAlertMessage(['이메일 또는 비밀번호가 일치하지 않습니다.']);
                } else {
                    setAlertMessage(['로그인에 실패했습니다. 다시 시도해주세요.']);
                }
            } else if (error.request) {
                setAlertMessage(['서버와의 통신에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.']);
            } else {
                setAlertMessage(['예기치 못한 오류가 발생했습니다. 다시 시도해주세요.']);
            }
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
            <p>
                계정이 없으신가요? <Link to='/signup'>회원가입</Link>
            </p>
            {alertMessage && (
                <div className='modal-background'>
                    <div className='custom-alert'>
                        {alertMessage.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                        <button onClick={() => setAlertMessage('')}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;