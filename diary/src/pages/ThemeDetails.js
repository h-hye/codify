import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ThemeDetails.css';

const ThemeDetails = ({ themes }) => {
    const { themeId } = useParams();
    const theme = themes[themeId];

    if (!theme) return <div>테마를 찾을 수 없습니다.</div>;

    return (
        <div className='theme-details-container'>
            <h2>{theme.name}</h2>
            <img src={URL.createObjectURL(theme.image)} alt={theme.name} className='theme-image' />
            <p>{theme.description}</p>
        </div>
    );
};

export default ThemeDetails;
