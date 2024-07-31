import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from '../pages/Shop';
import ThemeDetails from '../pages/ThemeDetails';

const ShopPage = ({ themes }) => {
    return (
        <Routes>
            <Route path='/' element={<Shop themes={themes} />} />
            <Route path='/:themeId' element={<ThemeDetails themes={themes} />} />
        </Routes>
    );
};

export default ShopPage;
