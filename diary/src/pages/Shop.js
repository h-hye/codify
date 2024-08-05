import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';

const Shop = ({ themes }) => {
    const navigate = useNavigate();

    return (
        <div className='shop-container'>
            <h1>테마 상점</h1>
            {themes.length === 0 ? (
                <div className='no-themes'>
                    <p>현재 테마가 없습니다.</p>
                    <button onClick={() => navigate('/create')}>테마 만들기</button>
                </div>
            ) : (
                <div className='theme-list'>
                    {themes.map((theme, index) => (
                        <div key={index} className='theme-item' onClick={() => navigate(`/shop/${index}`)}>
                            <div className='theme-info'>
                                <img src={URL.createObjectURL(theme.image)} alt={theme.name} className='theme-image' />
                                <h3>{theme.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
