import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
})

function getAuthToken (): string | null {
    let token =  localStorage.getItem('access_token')
    if (token) {
        token = 'Bearer ' + token
    }
    return token
}

http.interceptors.request.use(config => {
    config.headers['Authorization'] = getAuthToken()
    return config
})

export default http;
