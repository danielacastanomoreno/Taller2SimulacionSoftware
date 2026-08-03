import axios from "axios";


export const ax = axios.create({
    baseURL: process.env.BACKEND_URL,
});


export default {ax};