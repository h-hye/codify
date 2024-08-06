import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../apis/axiosInstance';
import '../styles/Diary.css';

const Diary = () => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [emotion, setEmotion] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('postId', date.toISOString().split('T')[0].replace(/-/g, ''));
            formData.append('title', title);
            formData.append('content', content);

            const response = await axiosInstance.post('/posts/create', formData);
            console.log('Response:', response.data);
            alert('일기가 저장되었습니다.');
            navigate('/main');
        } catch (error) {
            console.error('Error saving diary:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleEmotionChange = (e) => {
        setEmotion(e.target.value);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <div className='diary-container'>
            <div className='main-nav'>
                <span className='main-nav-brand' onClick={() => navigate('/main')}>
                    Codify
                </span>
                <div className='main-nav-links'>
                    <a href='/diary' className='main-nav-link active'>
                        Create
                    </a>
                    <a href='/main' className='main-nav-link'>
                        Diary
                    </a>
                    <a href='/statistics' className='main-nav-link'>
                        Statistics
                    </a>
                </div>
                <a href='/mypage' className='main-nav-link main-nav-link-mypage'>
                    MyPage
                </a>
            </div>
            <div className='diary-header'>
                <h2 className='diary-date'>{date.toISOString().split('T')[0]}</h2>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='일기 제목을 입력하세요...'
                    className='diary-title-input'
                />
            </div>
            {showCalendar && <DatePicker selected={date} onChange={handleDateChange} dateFormat='yyyy-MM-dd' inline />}
            <form onSubmit={handleSubmit} className='diary-form'>
                <input
                    type='date'
                    value={date.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    className='diary-date-input'
                />

                {/* <input
                    type='text'
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder='사용자 ID'
                    className='diary-memberId-input'
                /> */}
                <div className='emotion-selector'>
                    <label className='emotion-item'>
                        <input
                            type='radio'
                            name='emotion'
                            value='good'
                            checked={emotion === 'good'}
                            onChange={handleEmotionChange}
                        />
                        good
                    </label>
                    <label className='emotion-item'>
                        <input
                            type='radio'
                            name='emotion'
                            value='soso'
                            checked={emotion === 'soso'}
                            onChange={handleEmotionChange}
                        />
                        soso
                    </label>
                    <label className='emotion-item'>
                        <input
                            type='radio'
                            name='emotion'
                            value='bad'
                            checked={emotion === 'bad'}
                            onChange={handleEmotionChange}
                        />
                        bad
                    </label>
                    <label className='emotion-item'>
                        <input
                            type='radio'
                            name='emotion'
                            value='sad'
                            checked={emotion === 'sad'}
                            onChange={handleEmotionChange}
                        />
                        sad
                    </label>
                    <label className='emotion-item'>
                        <input
                            type='radio'
                            name='emotion'
                            value='angry'
                            checked={emotion === 'angry'}
                            onChange={handleEmotionChange}
                        />
                        angry
                    </label>
                </div>
                <div className='diary-content-row'>
                    {image && (
                        <div className='diary-image-preview'>
                            <img src={URL.createObjectURL(image)} alt='이미지' />
                        </div>
                    )}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='오늘의 감정을 기록하세요...'
                        className='diary-content-textarea'
                    />
                </div>
                <input type='file' accept='image/*' onChange={handleImageChange} className='diary-image-input' />
                <div className='diary-button-row'>
                    <button className='diary-back-button' onClick={() => navigate('/main')} type='button'>
                        뒤로가기
                    </button>
                    <button type='submit' className='diary-submit-button'>
                        저장하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Diary;
