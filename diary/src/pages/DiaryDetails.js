import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import '../styles/DiaryDetails.css';

const DiaryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [diary, setDiary] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const response = await axiosInstance.get('/api/posts/', {
                    postId: id,
                });

                setDiary(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setDiary(['안녕하세요', '내용입니다']);
                setTitle('안녕하세요');
                setContent('내용입니다.');
            } catch (error) {
                console.error('Error fetching diary:', error);
            }
        };
        fetchDiary();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/api/posts/`, {
                postId: id,
                title: title,
                content: content,
            });
            alert('일기가 수정되었습니다.');
        } catch (error) {
            console.error('Error updating diary:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/posts/`, {
                postId: id,
            });
            alert('일기가 삭제되었습니다.');
            navigate('/diary-list'); // 일기 목록 페이지로 이동
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };

    if (!diary) {
        return <p>Loading...</p>;
    }

    return (
        <div className='diary-details-container'>
            <button className='back-button' onClick={() => navigate('/diary-list')}>
                뒤로가기
            </button>
            <h2>일기 상세</h2>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default DiaryDetails;
