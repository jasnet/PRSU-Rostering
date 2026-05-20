import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const generateRoster = (doctorId) =>
    API.get(`/rosters/generate/${doctorId}`);