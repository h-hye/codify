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
                const response = await axiosInstance.get(`/api/posts/${id}`);
                setDiary(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching diary:', error);
            }
        };
        fetchDiary();
    }, [id]);
    //수정
    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/api/posts/${id}`, {
                title,
                content,
            });
            alert('일기가 수정되었습니다.');
        } catch (error) {
            console.error('Error updating diary:', error);
        }
    };
    //삭제
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/posts/${id}`);
            alert('일기가 삭제되었습니다.');
            navigate('/main');
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };

    if (!diary) {
        return <p>일기가 존재하지 않습니다.</p>;
    }

    return (
        <div className='diary-details-container'>
            <button className='back-button' onClick={() => navigate('/main')}>
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
