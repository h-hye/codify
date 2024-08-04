import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import '../styles/Diary.css';

const Diary = () => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setDate(today);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('title', title);
            formData.append('content', content);
            if (image) {
                formData.append('image', image);
            }

            const response = await axiosInstance.post('/api/diary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className='diary-container'>
            <button className='back-button' onClick={() => navigate('/main')}>
                {' '}
                뒤로가기
            </button>
            <h2>{date}</h2>
            <form onSubmit={handleSubmit} className='diary-form'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='일기 제목을 입력하세요...'
                    className='title-input'
                />
                <div className='diary-content-row'>
                    <div className='image-preview'>{image && <img src={URL.createObjectURL(image)} alt='Diary' />}</div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='오늘의 감정을 기록하세요...'
                        className='content-textarea'
                    />
                </div>
                <input type='file' accept='image/*' onChange={handleImageChange} className='image-input' />
                <button type='submit' className='submit-button'>
                    저장
                </button>
            </form>
        </div>
    );
};

export default Diary;
