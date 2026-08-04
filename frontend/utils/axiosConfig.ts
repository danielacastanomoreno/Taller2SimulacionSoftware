import axios from "axios";

export const ax = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, 
});

export default {ax};