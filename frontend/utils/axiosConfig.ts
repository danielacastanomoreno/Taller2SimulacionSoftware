import axios from "axios";

export const ax = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default {ax};
