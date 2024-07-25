import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPage.css';

const MyPage = () => {
    const [profile, setProfile] = useState({});
    const [days, setDays] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // 예시 API 호출, 실제로는 자신의 API를 호출해야 합니다.
                const response = await axios.get('/api/profile');
                setProfile(response.data);
                const joinDate = new Date(response.data.joinDate);
                const currentDate = new Date();
                const differenceInTime = currentDate.getTime() - joinDate.getTime();
                const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
                setDays(differenceInDays);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

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
        </div>
    );
};

export default MyPage;
