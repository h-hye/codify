import React, { useState } from 'react';
import axiosInstance from '../components/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/ChangeName.css';

const ChangeName = ({ id }) => {
    const [oldName, setOldName] = useState('');
    const [newName, setNewName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChangeName = async () => {
        try {
            await axiosInstance.patch(`/api/members/change-name/${id}`, {
                oldName,
                newName,
            });
            alert('이름이 변경되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Error changing name:', error);
            setErrorMessage('이름 변경 실패');
        }
    };

    return (
        <div className='change-name-container'>
            <h2>이름 변경</h2>
            <input type='text' placeholder='현재 이름' value={oldName} onChange={(e) => setOldName(e.target.value)} />
            <input type='text' placeholder='새 이름' value={newName} onChange={(e) => setNewName(e.target.value)} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleChangeName}>이름 변경</button>
        </div>
    );
};

export default ChangeName;
