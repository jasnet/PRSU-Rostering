import API from "./axios";

export const getDoctors = () => API.get("/doctors");