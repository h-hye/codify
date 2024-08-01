import React, { useState } from 'react';
import '../styles/CreateTheme.css';

const CreateTheme = ({ addTheme }) => {
    const [themeName, setThemeName] = useState('');
    const [themeDescription, setThemeDescription] = useState('');
    const [themeImage, setThemeImage] = useState(null);

    const handleImageChange = (e) => {
        setThemeImage(e.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTheme = {
            name: themeName,
            description: themeDescription,
            image: themeImage,
        };
        addTheme(newTheme);
        setThemeName('');
        setThemeDescription('');
        setThemeImage(null);
    };

    return (
        <div className='create-theme-container'>
            <h2>테마 만들기</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                    placeholder='테마 이름'
                />
                <textarea
                    value={themeDescription}
                    onChange={(e) => setThemeDescription(e.target.value)}
                    placeholder='테마 설명'
                />
                <input type='file' onChange={handleImageChange} />
                <button type='submit'>업로드</button>
            </form>
        </div>
    );
};

export default CreateTheme;
