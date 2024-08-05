// 로그인과 회원가입을 처리할 때 사용할 api 접근
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const authInstance = axios.create({
    baseURL: BASE_URL,
});

authInstance.interceptors.request.use(
    (config) => {
        console.log('인증 요청 시작');
        return config;
    },
    (error) => {
        console.error('인증 요청 오류:', error);
        return Promise.reject(error);
    }
);

authInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 400:
                    console.error('잘못된 요청입니다. 입력한 내용을 확인해주세요.');
                    break;
                case 401:
                    console.error('이메일 또는 비밀번호가 일치하지 않습니다.');
                    break;
                case 403:
                    console.error('권한이 없습니다.');
                    break;
                case 404:
                    console.error('요청한 자원을 찾을 수 없습니다.');
                    break;
                case 409:
                    console.error('데이터 충돌이 발생했습니다. 이미 존재하는 데이터일 수 있습니다.');
                    break;
                case 500:
                    console.error('서버 오류가 발생했습니다. 관리자에게 문의하세요.');
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

export default authInstance;
