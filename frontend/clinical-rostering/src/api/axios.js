import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"  // backend1
});

export default API;