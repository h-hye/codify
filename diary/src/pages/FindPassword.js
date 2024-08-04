import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Find.css';

const FindPassword = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFindPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/members/find-password', {
                params: {
                    name,
                    email,
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Password find failed:', error);
            alert('비밀번호 찾기 실패');
        }
    };

    return (
        <div className='find-container'>
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handleFindPassword}>
                <input type='text' placeholder='이름' value={name} onChange={(e) => setName(e.target.value)} required />
                <input
                    type='email'
                    placeholder='이메일'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit'>비밀번호 찾기</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                <a href='/login'>로그인 페이지로 돌아가기</a>
            </p>
        </div>
    );
};

export default FindPassword;
