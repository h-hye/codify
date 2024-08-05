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
    const [emailError, setEmailError] = useState(''); // 이메일 오류 메시지 상태
    const [nicknameError, setNicknameError] = useState('');
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
            if (email === '') {
                setEmailError('이메일을 입력해주세요.');
            } else {
                setEmailError('유효한 이메일 주소를 입력해주세요. 예: example@domain.com');
            }
        } else {
            setEmailValid(true);
            setEmailError('');
        }
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setNicknameError(''); // 닉네임 오류 메시지 초기화
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
                setAlertMessage(['회원가입에 성공했습니다.', '잠시 후 로그인 창으로 이동합니다.']); // 변경된 부분
                setTimeout(() => navigate('/login'), 2000); // 2초 후 로그인 페이지로 이동
            } catch (error) {
                console.error(error);
                if (error.response) {
                    if (error.response.status === 400) {
                        setAlertMessage(['잘못된 요청입니다. 입력한 내용을 확인해주세요.']); // 변경된 부분
                    } else if (error.response.status === 409) {
                        setAlertMessage(['이미 등록된 이메일입니다.']); // 변경된 부분
                    } else {
                        setAlertMessage(['회원가입에 실패했습니다. 다시 시도해주세요.']); // 변경된 부분
                    }
                } else if (error.request) {
                    setAlertMessage(['서버와의 통신에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.']); // 변경된 부분
                } else {
                    setAlertMessage(['예기치 못한 오류가 발생했습니다. 다시 시도해주세요.']); // 변경된 부분
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
                        type='text'
                        placeholder='닉네임'
                        value={nickname}
                        onChange={handleNicknameChange}
                        style={{
                            borderColor: nicknameError ? 'red' : '',
                        }}
                    />
                    {nicknameError && <span className='error-message'>{nicknameError}</span>}
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
                        {alertMessage.map(
                            (
                                msg,
                                index // 변경된 부분
                            ) => (
                                <p key={index}>{msg}</p>
                            )
                        )}
                        <button onClick={() => setAlertMessage('')}>닫기</button> {/* 변경된 부분 */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
