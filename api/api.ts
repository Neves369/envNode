import axios from "axios";
import config from "./config";

const apiURL = `http://${config.IP_PRODUCAO}/sepe/pt001/v1`;

const api = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    "Cache-Control": "no-cache",
    'Pragma': 'no-cache',
    'Expires': '0',
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: config.AUTH      
  },
});

export default api;
