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
                if (response.data.joinDate) {
                    const joinDate = new Date(response.data.joinDate);
                    const currentDate = new Date();
                    const differenceInTime = currentDate.getTime() - joinDate.getTime();
                    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
                    setDays(differenceInDays);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        // mypage 페이지 로드 시 MyPage 버튼에 active 클래스 추가
        const mypageLink = document.querySelector('.main-nav-link[href="/mypage"]');
        if (mypageLink) {
            mypageLink.classList.add('active');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access'); // 토큰 삭제
        localStorage.removeItem('refresh');
        navigate('/');
    };

    return (
        <div className='mypage-container'>
            <div className='main-nav'>
                <span className='main-nav-brand'>Codify</span>
                <div className='main-nav-links'>
                    <a href='/diary' className='main-nav-link'>
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
            <div className='mypage-content'>
                <h2>My Page</h2>
                <div className='mypage-profile-info'>
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
                </div>
                <button onClick={() => navigate('/change-name')}>이름 변경</button>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default MyPage;
