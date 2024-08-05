import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <header>
                <h1>Codify</h1>
                <nav>
                    <Link to='/login' className='login-button'>
                        로그인
                    </Link>
                </nav>
            </header>
            <main>
                <h2>나만의 AI다이어리</h2>
                <p>일상에 맞춤형 공감을 더하다</p>
            </main>
        </div>
    );
};

export default Home;
