import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Diary from './components/Diary';
import MyPage from './components/MyPage';
// import Statics from './components/Statics'; // 나중에 추가
// import Shop from './components/Shop';       // 나중에 추가
// import Create from './components/Create';   // 나중에 추가

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/diary' element={<Diary />} />
                <Route path='/mypage' element={<MyPage />} />
                {/* 나중에 추가
                <Route path='/statics' element={<Statics />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/create' element={<Create />} />
                */}
            </Routes>
        </Router>
    );
};

export default App;
