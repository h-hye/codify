import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
            return;
        }

        try {
            await axios.post('/api/members', {
                name,
                email,
                password,
            });
            alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('회원가입 실패');
        }
    };

    return (
        <div className='signup-container'>
            <h2>회원가입</h2>
            <form onSubmit={handleSignup}>
                <input type='text' placeholder='이름' value={name} onChange={(e) => setName(e.target.value)} required />
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
                        setErrorMessage('');
                    }}
                    required
                    style={{ borderColor: password !== confirmPassword ? 'red' : '' }}
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
