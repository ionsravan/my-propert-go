import axios from "axios";
import { useCookies } from "react-cookie";

export const useAxios = () => {
  const [cookies, setCookes] = useCookies(["jwtToken"]);
  const instance = axios.create({
    baseURL: "https://my-property-go-backend.onrender.com/api",
    // baseURL: "https://mypropertygo-production-3457.up.railway.app/api",
    // baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${cookies.jwtToken}`,
    },
  });
  return instance;
};
