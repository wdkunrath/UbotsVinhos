import axios from "axios";

const Axios = axios.create({
  baseURL: `http://www.mocky.io/v2/`,
  headers: { 
    Accept: "application/json"
  },
});

export  { Axios };
