import axios from "axios";

export const ax = axios.create({
    baseURL: "http://192.168.131.65:3000", // Lo puse aqui porque no lee el .env. URL del Backend. OJO
    withCredentials: true, 
});


export default {ax};