import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    const [alertMessage, setAlertMessage] = useState(''); // 커스텀 알림 메시지 상태
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
                await axios.post('http://localhost:8080/api/members', {
                    name: '사용자1',
                    email: email,
                    password: password,
                });
                setAlertMessage('회원가입에 성공했습니다. 잠시 후 로그인 창으로 이동합니다.');
                setTimeout(() => navigate('/login'), 2000); // 2초 후 로그인 페이지로 이동
            } catch (error) {
                console.error(error);
                // 서버에서 반환한 응답을 이용해 사용자에게 알맞은 오류 메시지를 보여줍니다.
                if (error.response) {
                    // 서버 응답이 있는 경우
                    if (error.response.status === 400) {
                        setAlertMessage('잘못된 요청입니다. 입력한 내용을 확인해주세요.');
                    } else if (error.response.status === 409) {
                        setAlertMessage('이미 등록된 이메일입니다.');
                    } else {
                        setAlertMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
                    }
                } else if (error.request) {
                    // 요청이 전송되었지만 응답이 없는 경우
                    setAlertMessage('서버와의 통신에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
                } else {
                    // 그 외의 오류
                    setAlertMessage('예기치 못한 오류가 발생했습니다. 다시 시도해주세요.');
                }
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
            {alertMessage && (
                <div className='modal-background'>
                    <div className='custom-alert'>
                        {alertMessage}
                        <button onClick={() => setAlertMessage('')}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
