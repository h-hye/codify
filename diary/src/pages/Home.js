import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
//이미지 슬라이더
const ImageSlider = () => {
    const images = ['/1.png', '/2.png', '/3.png'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='image-gallery'>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </div>
    );
};

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
                <p>일상에 맞춤형 공감을 더하다</p>
                <h2>나만의 AI다이어리</h2>
                <h1>Codify</h1>
                <button onClick={() => navigate('/login')}>지금 바로 시작해보세요!</button>
                <ImageSlider />
            </main>
        </div>
    );
};

export default Home;
