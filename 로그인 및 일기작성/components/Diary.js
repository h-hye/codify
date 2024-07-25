import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Diary.css';

const Diary = () => {
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setDate(today);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/diary', { date, content });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='diary-container'>
            <h2>{date}</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='오늘의 감정을 기록하세요...'
                />
                <button type='submit'>저장</button>
            </form>
            <div className='button-group'>
                <button onClick={() => navigate('/diary')}>Diary</button>
                <button>Statics</button>
                <button>Shop</button>
                <button>Create</button>
                <button onClick={() => navigate('/mypage')}>My Page</button>
            </div>
        </div>
    );
};

export default Diary;
