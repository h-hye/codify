import React, { useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import '../styles/ChangeName.css';

const ChangeName = ({ closeModal }) => {
    const [oldName, setOldName] = useState('');
    const [newName, setNewName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangeName = async () => {
        try {
            await axiosInstance.patch('/api/members/change-name', {
                oldName,
                newName,
            });
            alert('이름이 변경되었습니다.');
            closeModal();
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
            <div className='button-container'>
                <button onClick={handleChangeName}>이름 변경</button>
                <button onClick={closeModal} className='cancel-button'>
                    취소
                </button>
            </div>
        </div>
    );
};

export default ChangeName;
