// axiosInstance.js
import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRrefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
};

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const { data } = await axios.post('http://localhost:8080/api/refresh', { refreshToken });

                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);

                    isRefreshing = false;
                    onRrefreshed(data.accessToken);
                    refreshSubscribers = [];
                } catch (err) {
                    console.error('Refresh token expired or invalid');
                    return Promise.reject(error);
                }
            }

            const retryOriginalRequest = new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    resolve(instance(originalRequest));
                });
            });

            return retryOriginalRequest;
        }

        return Promise.reject(error);
    }
);

export default instance;
