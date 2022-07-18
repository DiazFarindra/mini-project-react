import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://mini-project-unggulsolusi-api.localhost/api'
})

export default axiosInstance