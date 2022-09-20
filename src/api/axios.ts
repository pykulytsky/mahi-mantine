import axios, { AxiosInstance } from "axios"

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

function getAuthToken(): string | boolean {
  let token = localStorage.getItem("access_token")
  if (token) {
    token = "Bearer " + token
  } else return false
  return token
}

http.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers["Authorization"] = getAuthToken()
    return config
  }
})

export default http
