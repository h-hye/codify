import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

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
                <button onClick={() => navigate('/signup')}>try for free</button>
            </main>
            <div className='image-gallery'>
                <img src='image1.jpg' alt='Gallery Image 1' />
                <img src='image2.jpg' alt='Gallery Image 2' />
                <img src='image3.jpg' alt='Gallery Image 3' />
            </div>
        </div>
    );
};

export default Home;
