import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MyPage.css';

const MyPage = () => {
    const [profile, setProfile] = useState({});
    const [days, setDays] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile');
                setProfile(response.data);

                // 가입일을 기준
                if (response.data.joinDate) {
                    setProfile(response.data);
                    const joinDate = new Date(response.data.joinDate);
                    const currentDate = new Date();
                    const differenceInTime = currentDate.getTime() - joinDate.getTime();
                    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
                    setDays(differenceInDays);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                // 에러 발생 시 사용자에게 피드백
                alert('프로필 정보를 가져오는 중 문제가 발생했습니다.');
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        navigate('/');
    };

    return (
        <div className='mypage-container'>
            <h2>My Page</h2>
            <p>
                <strong>이름:</strong> {profile.name || '정보 없음'}
            </p>
            <p>
                <strong>이메일:</strong> {profile.email || '정보 없음'}
            </p>
            <p>
                <strong>가입일:</strong> {profile.joinDate || '정보 없음'}
            </p>
            <p>
                <strong>가입일수:</strong> {days}일
            </p>
            <button onClick={() => navigate('/change-name')}>이름 변경</button>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;
