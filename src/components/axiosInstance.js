// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // URL 추가해야합니당
});

instance.interceptors.request.use(
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

instance.interceptors.response.use(
    (response) => {
        // 응답 데이터 반환 처리 (반환 처리 전 데이터를 추가/변경/삭제 가능)
        return response;
    },
    (error) => {
        // 응답 에러 처리
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default instance;
