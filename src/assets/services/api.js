import axios from "axios";

const token = " "; //colocar token temporalmente

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    //"Content-Type": "application/json",//desactivada para subir las imágenes
    "Authorization": `Bearer ${token}`,
  }
});

export default api;
