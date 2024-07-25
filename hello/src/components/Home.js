import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <header>
                <h1>Emotion-Diary</h1>
                <nav>
                    <Link to='/login' className='login-button'>
                        로그인
                    </Link>
                </nav>
            </header>
            <main>
                <h2>감정일기!</h2>
                <p>감정일기를 남기면 AI가 일기를 읽고 답장을 남겨드립니다! 지금 바로 시작해보세요 </p>
            </main>
        </div>
    );
};

export default Home;
