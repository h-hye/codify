// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // URL 추가해야합니당
});

axiosInstance.interceptors.request.use(
    (config) => {
        // 요청이 시작되기 전에 로딩 상태를 설정
        console.log('Loading started');
        // 모든 요청에 대한 API 키 추가를 하나의 코드로 설정
        config.params = {
            ...config.params,
        };
        return config;
    },
    (error) => {
        // 요청 에러 처리
        console.error('Request error:', error);

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // 응답 데이터 반환 처리 (반환 처리 전 데이터를 추가/변경/삭제 가능)
        return response;
    },
    (error) => {
        // 응답 에러 처리
        if (error.response) {
            // 서버 응답이 있는 경우
            const { status } = error.response;
            switch (status) {
                case 400:
                    console.error('400: 잘못된 요청입니다.');
                    break;
                case 401:
                    console.error('401: 인증이 필요합니다. 로그인 해주세요.');
                    // 로그인 페이지로 리디렉션하거나 토큰 갱신을 요청할 수 있습니다.
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
            // 요청이 전송되었지만 응답이 없는 경우
            console.error('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인하거나 나중에 다시 시도해주세요.');
        } else {
            // 요청을 설정하는 중에 오류가 발생한 경우
            console.error('요청 설정 중 오류가 발생했습니다:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
