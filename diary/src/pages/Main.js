import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Main.css';

const Main = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [diaryEntries, setDiaryEntries] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const token = localStorage.getItem('token'); //
        if (token) {
            setIsLoggedIn(true);
        } else {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDiaryEntries = async () => {
            try {
                const memberId = localStorage.getItem('memberId');
                const postIdPrefix = selectedDate.toISOString().slice(0, 7).replace('-', '');
                const response = await axiosInstance.post(
                    '/api/posts/month',
                    { postIdPrefix },
                    {
                        headers: { 'X-User-Id': memberId },
                    }
                );
                const entries = response.data.reduce((acc, entry) => {
                    const date = entry.postId.slice(0, 8);
                    acc[date] = entry;
                    return acc;
                }, {});
                setDiaryEntries(entries);
            } catch (error) {
                console.error('Error fetching diary entries:', error);
            }
        };

        fetchDiaryEntries();
    }, [selectedDate]);

    const handleDateClick = (value) => {
        const dateString = value.toLocaleDateString('en-CA').replace(/-/g, '');
        navigate(`/diary-details/${dateString}`);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
            if (diaryEntries[dateString]) {
                const { title, emoticonUrl } = diaryEntries[dateString];
                return (
                    <div className='diary-entry-title'>
                        {title}
                        {emoticonUrl && <img src={emoticonUrl} alt='emoticon' className='emotion-icon-small' />}
                    </div>
                );
            }
        }
        return null;
    };

    return (
        isLoggedIn && (
            <div className='main-container'>
                <div className='nav-links'>
                    <a href='/main' className='nav-link'>
                        Diary
                    </a>
                    <a href='/statistics' className='nav-link'>
                        Statistics
                    </a>
                    <a href='/shop' className='nav-link'>
                        Shop
                    </a>
                    <a href='/diary' className='nav-link'>
                        Create
                    </a>
                    <a href='/mypage' className='nav-link'>
                        MyPage
                    </a>
                </div>
                <Calendar
                    onClickDay={handleDateClick}
                    className='react-calendar'
                    tileContent={tileContent}
                    onActiveStartDateChange={({ activeStartDate }) => setSelectedDate(activeStartDate)}
                />
            </div>
        )
    );
};

export default Main;
