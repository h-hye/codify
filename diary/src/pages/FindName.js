import React, { useState } from 'react';
import axiosInstance from '../components/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/Find.css';

const FindName = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleFindName = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/api/members/find-name?email=${email}`);
            setName(response.data.name);
        } catch (error) {
            console.error('Name find failed:', error);
            alert('이름 찾기 실패');
        }
    };

    return (
        <div className='find-container'>
            <h2>이름 찾기</h2>
            <form onSubmit={handleFindName}>
                <input
                    type='email'
                    placeholder='이메일'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit'>이름 찾기</button>
            </form>
            {name && <p>이름: {name}</p>}
            <p>
                <a href='/login'>로그인 페이지로 돌아가기</a>
            </p>
        </div>
    );
};

export default FindName;
