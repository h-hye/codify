import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance';
import '../styles/DiaryDetails.css';

const DiaryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [diary, setDiary] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [emoticonId, setEmoticonId] = useState(null);

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const memberId = localStorage.getItem('memberId');
                const response = await axiosInstance.post(
                    `/api/posts/post/${id}`,
                    {},
                    {
                        headers: { 'X-User-Id': memberId },
                    }
                );
                if (response.data) {
                    setDiary(response.data);
                    setTitle(response.data.title);
                    setContent(response.data.content);
                    setAiResponse(response.data.aiResponse);
                    setEmoticonId(response.data.emoticonId);
                } else {
                    setDiary(null);
                }
            } catch (error) {
                console.error('Error fetching diary:', error);
                setDiary(null); // Handle case where fetch fails
            }
        };
        fetchDiary();
    }, [id]);

    const fetchAiResponse = useCallback(async () => {
        try {
            const response = await axiosInstance.post(`/api/posts/${id}/ai-response`, {
                content,
            });
            setAiResponse(response.data.aiResponse);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }
    }, [id, content]);

    useEffect(() => {
        if (content) {
            fetchAiResponse();
        }
    }, [content, fetchAiResponse]);

    const handleUpdate = async () => {
        try {
            const memberId = localStorage.getItem('memberId');
            await axiosInstance.put(
                `/api/posts/${id}`,
                {
                    title,
                    content,
                    memberId,
                    aiResponse,
                    emoticonId,
                },
                {
                    headers: { 'X-User-Id': memberId },
                }
            );
            alert('일기가 수정되었습니다.');
        } catch (error) {
            console.error('Error updating diary:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const memberId = localStorage.getItem('memberId');
            await axiosInstance.delete(`/api/posts/${id}`, {
                headers: { 'X-User-Id': memberId },
            });
            alert('일기가 삭제되었습니다.');
            navigate('/main');
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };

    if (diary === null) {
        return <p>일기가 없습니다.</p>;
    }

    if (!diary) {
        return <p>Loading...</p>;
    }

    return (
        <div className='diary-details-container'>
            <button className='back-button' onClick={() => navigate('/main')}>
                뒤로가기
            </button>
            <h2>일기 상세</h2>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <div className='ai-response'>
                <h3>AI 응답</h3>
                <p>{aiResponse}</p>
            </div>
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default DiaryDetails;
