import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
export const uploadExcel = (data) => API.post("/upload", data);
export const generateLinks = (data) => API.post("/generate", data);
