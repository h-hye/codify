import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ChangePassword.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            await axios.patch('/api/members/change-password', {
                oldPassword,
                newPassword,
            });
            alert('비밀번호가 변경되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage('비밀번호 변경 실패');
        }
    };

    return (
        <div className='change-password-container'>
            <h2>비밀번호 변경</h2>
            <input
                type='password'
                placeholder='현재 비밀번호'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type='password'
                placeholder='새 비밀번호'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleChangePassword}>비밀번호 변경</button>
        </div>
    );
};

export default ChangePassword;
