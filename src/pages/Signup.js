import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance'; // (1) axiosInstance를 가져오는 부분에서 Import명을 잘못 사용한 듯합니다.
import '../styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [emailError, setEmailError] = useState(''); // 이메일 오류 메시지 상태
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(''); // 비밀번호 확인 오류 메시지 상태
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(null); // 입력 중에는 유효성 검사 상태를 초기화
        setEmailError(''); // 입력 중에는 이메일 오류 메시지 초기화
    };

    const handleEmailBlur = () => {
        if (!validateEmail(email)) {
            setEmailValid(false);
            setEmailError('유효한 이메일 주소를 입력해주세요.');
        } else {
            setEmailValid(true);
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(''); // 입력 중에는 비밀번호 오류 초기화
        setConfirmPasswordError(''); // 비밀번호 변경 시 확인 오류 메시지 초기화
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(''); // 입력 중에는 비밀번호 확인 오류 메시지 초기화
    };

    useEffect(() => {
        if (confirmPassword.trim() === '' && password.trim() === '') {
            setConfirmPasswordValid(null);
        } else if (confirmPassword.trim() === '' || password.trim() === '') {
            setConfirmPasswordValid(false);
        } else {
            setConfirmPasswordValid(confirmPassword === password);
        }
    }, [password, confirmPassword]);

    const handleSignup = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!emailValid) {
            setEmailValid(false);
            setEmailError('유효한 이메일 주소를 입력해주세요.');
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            setConfirmPasswordError('');
            isValid = false;
        } else if (password !== confirmPassword) {
            setPasswordError('');
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            setConfirmPasswordValid(false);
            isValid = false;
        }

        if (isValid) {
            try {
                await axiosInstance.post('/api/members', {
                    name: '사용자1',
                    email: email,
                    password: password,
                });
                alert('회원가입에 성공했습니다.');
                navigate('/login');
            } catch (error) {
                console.error(error);
                alert('회원가입에 실패했습니다. 다시 시도해주세요');
            }
        }
    };

    return (
        <div className='signup-container'>
            <h2>회원가입</h2>
            <form onSubmit={handleSignup}>
                <div className='input-container'>
                    <input
                        type='text'
                        placeholder='이메일'
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        style={{
                            borderColor: emailValid === false ? 'red' : '',
                        }}
                    />
                    {emailError && <span className='error-message'>{emailError}</span>}
                </div>
                <div className='input-container'>
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ borderColor: passwordError ? 'red' : '' }}
                    />
                    {passwordError && <span className='error-message'>{passwordError}</span>}
                </div>
                <div className='input-container'>
                    <input
                        type='password'
                        placeholder='비밀번호 확인'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{ borderColor: confirmPasswordValid === false ? 'red' : '' }}
                    />
                    {confirmPasswordError && <span className='error-message'>{confirmPasswordError}</span>}
                    {confirmPasswordValid === true && <span className='checkmark'>✔</span>}
                </div>
                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
