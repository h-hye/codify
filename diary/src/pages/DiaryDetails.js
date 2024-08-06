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
                // const response = await axiosInstance.get(`/api/posts/${id}`);
                // setDiary(response.data);
                // setTitle(response.data.title);
                // setContent(response.data.content);
                setDiary('hello');
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
            await axiosInstance.put(`/api/posts/${id}`, {
                title,
                content,
            });
            alert('일기가 수정되었습니다.');
        } catch (error) {
            console.error('Error updating diary:', error);
        }
    };

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
            <button className='diary-details-back-button' onClick={() => navigate('/main')}>
                뒤로가기
            </button>
            <div className='diary-details-header'>
                <h2>{id} 일기</h2>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='제목을 입력하세요'
                />
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='내용을 입력하세요'
            ></textarea>
            <div className='diary-details-buttons'>
                <button onClick={handleUpdate}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default DiaryDetails;
