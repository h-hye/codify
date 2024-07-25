import React from 'react';
import '../styles/Signup.css';

const Signup = () => {
    return (
        <div className='signup-container'>
            <h2>회원가입</h2>
            <form>
                <input type='text' placeholder='이메일' />
                <input type='password' placeholder='비밀번호' />
                <input type='password' placeholder='비밀번호 확인' />
                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
