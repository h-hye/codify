import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authInstance from '../apis/authInstance';
import '../styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(null);
        setEmailError('');
    };

    const handleEmailBlur = () => {
        if (!validateEmail(email)) {
            setEmailValid(false);
            if (email === '') {
                setEmailError('이메일을 입력해주세요.');
            } else {
                setEmailError('유효한 이메일 주소를 입력해주세요.');
            }
        } else {
            setEmailValid(true);
            setEmailError('');
        }
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setNicknameError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setConfirmPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError('');
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

        if (nickname.trim() === '') {
            setNicknameError('닉네임을 입력해주세요.');
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
                await authInstance.post('/api/members/join', {
                    nickname: nickname,
                    email: email,
                    password: password,
                });
                setAlertMessage(['회원가입에 성공했습니다.', '잠시 후 로그인 창으로 이동합니다.']);
                setTimeout(() => navigate('/login'), 2000);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    if (error.response.status === 400) {
                        setAlertMessage(['잘못된 요청입니다. 입력한 내용을 확인해주세요.']);
                    } else if (error.response.status === 409) {
                        setAlertMessage(['이미 등록된 이메일입니다.']);
                    } else {
                        setAlertMessage(['회원가입에 실패했습니다. 다시 시도해주세요.']);
                    }
                } else if (error.request) {
                    setAlertMessage(['서버와의 통신에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.']);
                } else {
                    setAlertMessage(['예기치 못한 오류가 발생했습니다. 다시 시도해주세요.']);
                }
            }
        }
    };

    const handleBackClick = () => {
        navigate('/login');
    };

    return (
        <div className='signup-outer-container'>
            <div className='signup-container'>
                <div className='signup-header'>
                    <button className='signup-back-button' onClick={handleBackClick}>
                        &lt;
                    </button>
                    <h2>회원가입</h2>
                </div>
                <form onSubmit={handleSignup}>
                    <div className='signup-input-container'>
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
                        <span
                            className='signup-error-message'
                            style={{ visibility: emailError ? 'visible' : 'hidden' }}
                        >
                            {emailError}
                        </span>
                    </div>
                    <div className='signup-input-container'>
                        <input
                            type='text'
                            placeholder='닉네임'
                            value={nickname}
                            onChange={handleNicknameChange}
                            style={{
                                borderColor: nicknameError ? 'red' : '',
                            }}
                        />
                        <span
                            className='signup-error-message'
                            style={{ visibility: nicknameError ? 'visible' : 'hidden' }}
                        >
                            {nicknameError}
                        </span>
                    </div>
                    <div className='signup-input-container'>
                        <input
                            type='password'
                            placeholder='비밀번호'
                            value={password}
                            onChange={handlePasswordChange}
                            style={{ borderColor: passwordError ? 'red' : '' }}
                        />
                        <span
                            className='signup-error-message'
                            style={{ visibility: passwordError ? 'visible' : 'hidden' }}
                        >
                            {passwordError}
                        </span>
                    </div>
                    <div className='signup-input-container'>
                        <input
                            type='password'
                            placeholder='비밀번호 확인'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            style={{ borderColor: confirmPasswordValid === false ? 'red' : '' }}
                        />
                        <span
                            className='signup-error-message'
                            style={{ visibility: confirmPasswordError ? 'visible' : 'hidden' }}
                        >
                            {confirmPasswordError}
                        </span>
                    </div>
                    <button type='submit' className='signup'>
                        회원가입
                    </button>
                </form>
                {alertMessage && (
                    <div className='signup-modal-background'>
                        <div className='signup-custom-alert'>
                            {alertMessage.map((msg, index) => (
                                <p key={index}>{msg}</p>
                            ))}
                            <button className='signup-custom-alert-button' onClick={() => setAlertMessage('')}>
                                닫기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
