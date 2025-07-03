import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:5000/`
})
console.log(axiosInstance.defaults.baseURL);

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;