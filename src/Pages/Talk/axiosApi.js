import axios from 'axios';

const axiosApi = axios.create({
    //baseURL: 'http://localhost:8081',  // 서버 주소에 맞게 수정
    baseURL: "https://api.icebuckwheat.kro.kr",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosApi;
