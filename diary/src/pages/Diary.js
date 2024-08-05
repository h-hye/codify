import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import '../styles/Diary.css';

const Diary = () => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [emotion, setEmotion] = useState('');
    const [memberId, setMemberId] = useState('');
    const [emoticonId, setEmoticonId] = useState(null);
    const [emoticons, setEmoticons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD 형식
        setDate(today);

        // const fetchEmoticons = async () => {
        //     try {
        //         const response = await axiosInstance.get('/api/emoticons');
        //         setEmoticons(response.data);
        //     } catch (error) {
        //         console.error('Error fetching emoticons:', error);
        //     }
        // };

        // fetchEmoticons();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('postId', date);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('memberId', memberId);
            formData.append('emoticonId', emoticonId);
            if (image) {
                formData.append('image', image);
            }

            const response = await axiosInstance.post('/api/posts', formData, {
                headers: {
                    'X-User-Id': memberId,
                    'Content-Type': 'multipart/form-data', //
                },
            });
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

    const handleEmotionClick = (emotionType, id) => {
        setEmotion(emotionType);
        setEmoticonId(id);
    };

    return (
        <div className='diary-container'>
            <button className='back-button' onClick={() => navigate('/main')}>
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
                <input
                    type='text'
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder='사용자 ID'
                    className='memberId-input'
                />
                <div className='emotion-selector'>
                    {emoticons.map((emoticon) => (
                        <div
                            key={emoticon.id}
                            className='emotion-item'
                            onClick={() => handleEmotionClick(emoticon.name, emoticon.id)}
                        >
                            <img
                                src={emoticon.url}
                                alt={emoticon.name}
                                className={`emotion-icon ${emotion === emoticon.name ? 'selected' : ''}`}
                            />
                            <span>{emoticon.name}</span>
                        </div>
                    ))}
                </div>
                <div className='diary-content-row'>
                    {image && (
                        <div className='image-preview'>
                            <img src={URL.createObjectURL(image)} alt='이미지' />
                        </div>
                    )}
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
