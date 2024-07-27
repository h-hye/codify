import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
            return;
        }

        // 실제 회원가입 로직 대신에 성공했다고 가정하고 로그인 페이지로 이동
        alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
        navigate('/login'); // 사용자가 폼 제출 수행 후 바로 이동 필요하니 navigate 수행
    };

    return (
        <div className='signup-container'>
            <h2>회원가입</h2>
            <form onSubmit={handleSignup}>
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
                <input
                    type='password'
                    placeholder='비밀번호 확인'
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorMessage(''); // 사용자가 입력할 때마다 에러 메시지 초기화
                    }}
                    required
                    style={{ borderColor: password !== confirmPassword ? 'red' : '' }} // 일치하지 않을 경우 빨간 테두리
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
