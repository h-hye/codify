import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Main.css';

const Main = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 상태 확인 (예: 토큰 존재 여부)
        const token = localStorage.getItem('token'); // 예시: 로컬 스토리지에 저장된 토큰 확인
        if (true) {
            setIsLoggedIn(true);
        } else {
            navigate('/'); // 로그인되지 않은 경우 홈 페이지로 이동
        }
    }, [navigate]);

    const handleDateClick = (value) => {
        navigate(`/diary-details/${value.toISOString().split('T')[0]}`);
    };

    return (
        isLoggedIn && (
            <div className='main-container'>
                <div className='main-nav'>
                    <span className='main-nav-brand'>Codify</span>
                    <div className='main-nav-links'>
                        <a href='/diary' className='main-nav-link'>
                            Create
                        </a>
                        <a href='/statistics' className='main-nav-link'>
                            Statistics
                        </a>
                        <a href='/shop' className='main-nav-link'>
                            Shop
                        </a>
                    </div>
                    <a href='/mypage' className='main-nav-link main-nav-link-mypage'>
                        MyPage
                    </a>
                </div>
                <div className='calendar-container-wrapper'>
                    <div className='calendar-container'>
                        <Calendar onClickDay={handleDateClick} className='react-calendar' />
                    </div>
                </div>
            </div>
        )
    );
};

export default Main;
