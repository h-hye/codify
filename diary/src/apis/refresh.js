import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getNewRefreshToken = async () => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    const result = await axios.post(
        `${BASE_URL}/api/members/refresh-token`,
        { refreshToken },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    // 새로운 토큰을 로컬 스토리지에 저장
    localStorage.setItem('access', result.data.accessToken);
    localStorage.setItem('refresh', result.data.refreshToken);
};

export default getNewRefreshToken;
