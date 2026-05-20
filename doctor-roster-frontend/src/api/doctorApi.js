import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const createDoctor = (data) => API.post(`/doctors`, data);
export const getDoctors = () => API.get(`/doctors`);
export const getDoctor = (doctorId) => API.get(`/doctors/${doctorId}`);
