import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Diary from './pages/Diary';
import DiaryDetails from './pages/DiaryDetails';
import Statistics from './pages/Statistics';

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
                <Route path='/diary' element={<Diary />} />
                <Route path='/diary-details/:id' element={<DiaryDetails />} />
                <Route path='/statistics' element={<Statistics />} />
            </Routes>
        </Router>
    );
};

export default App;
