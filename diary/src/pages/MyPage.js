import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance';
import '../styles/MyPage.css';

const MyPage = () => {
    const [profile, setProfile] = useState({});
    const [days, setDays] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/api/profile');
                setProfile(response.data);
                const joinDate = new Date(response.data.joinDate);
                const currentDate = new Date();
                const differenceInTime = currentDate.getTime() - joinDate.getTime();
                const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
                setDays(differenceInDays);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        try {
            const memberId = localStorage.getItem('memberId'); // memberId를 로컬 스토리지에서 가져옴
            await axiosInstance.delete(`/api/members/delete/${memberId}`); // 수정된 부분
            localStorage.removeItem('token'); // 토큰 삭제
            localStorage.removeItem('memberId'); // memberId 삭제
            alert('계정이 삭제되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('계정 삭제 실패');
        }
    };

    return (
        <div className='mypage-container'>
            <h2>My Page</h2>
            <p>
                <strong>이름:</strong> {profile.name}
            </p>
            <p>
                <strong>이메일:</strong> {profile.email}
            </p>
            <p>
                <strong>가입일:</strong> {profile.joinDate}
            </p>
            <p>
                <strong>가입일수:</strong> {days}일
            </p>
            <button onClick={() => navigate('/change-name')}>이름 변경</button>
            <button onClick={() => navigate('/change-password')}>비밀번호 변경</button>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={handleDeleteAccount} className='delete-button'>
                회원 탈퇴
            </button>
        </div>
    );
};

export default MyPage;
