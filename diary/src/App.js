import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import FindName from './pages/FindName';
import FindPassword from './pages/FindPassword';
import ChangeName from './pages/ChangeName';
import ChangePassword from './pages/ChangePassword';
import Diary from './pages/Diary';
import DiaryDetails from './pages/DiaryDetails';
import Statistics from './pages/Statistics';
import CreateTheme from './pages/CreateTheme';
import ShopPage from './pages/ShopPage';

const App = () => {
    const [themes, setThemes] = useState([]);

    const addTheme = (newTheme) => {
        setThemes([...themes, newTheme]);
    };

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/main' element={<Main />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/find-name' element={<FindName />} />
                <Route path='/find-password' element={<FindPassword />} />
                <Route path='/change-name' element={<ChangeName />} />
                <Route path='/change-password' element={<ChangePassword />} />
                <Route path='/diary' element={<Diary />} />
                <Route path='/diary-details/:id' element={<DiaryDetails />} />
                <Route path='/statistics' element={<Statistics />} />
                <Route path='/create' element={<CreateTheme addTheme={addTheme} />} />
                <Route path='/shop/*' element={<ShopPage themes={themes} />} />
            </Routes>
        </Router>
    );
};

export default App;
