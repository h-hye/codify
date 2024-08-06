import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: BASE_URL, // 실제 백엔드 URL로 변경 필요
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request config:', config);
        const memberId = localStorage.getItem('memberId'); // 대소문자 수정
        if (memberId) {
            // params가 이미 있을 경우 기존 params에 memberId 추가
            config.params = {
                ...config.params,
                memberId: memberId,
            };
        }
        return config; // 수정된 config 객체 반환
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error); // 에러 발생 시 에러 반환
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response data:', response.data);
        return response.data;
    },
    async (error) => {
        if (error.response) {
            const { status } = error.response;
            console.error(`Response error (${status}):`, error.response.data);
            switch (status) {
                case 400:
                    console.error('400: 잘못된 요청입니다.');
                    break;
                case 401:
                    // 토큰이 만료된 경우임
                    console.error('401: 인증이 필요합니다. 로그인 해주세요.');
                    break;
                case 403:
                    console.error('403: 권한이 없습니다.');
                    break;
                case 404:
                    console.error('404: 요청한 자원을 찾을 수 없습니다.');
                    break;
                case 409:
                    console.error('409: 데이터 충돌이 발생했습니다. 이미 존재하는 데이터일 수 있습니다.');
                    break;
                case 500:
                    console.error('500: 서버 오류가 발생했습니다. 관리자에게 문의하세요.');
                    break;
                default:
                    console.error(`오류 발생: ${status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            console.error('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인하거나 나중에 다시 시도해주세요.');
        } else {
            console.error('요청 설정 중 오류가 발생했습니다:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
