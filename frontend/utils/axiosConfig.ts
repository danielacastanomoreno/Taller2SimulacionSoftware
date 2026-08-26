import axios from "axios";

export const ax = axios.create({
    baseURL: "http://192.168.131.64:3000",
    withCredentials: true, 
});

export default {ax};
