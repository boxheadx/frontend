import axios from "axios";
import Error from "../Error";

const BASE_URL = process.env.REACT_APP_API_URL;

const postToAPI = async(endpoint, postData)=>{
    try{
        const { data } = await axios.post(`${BASE_URL}${endpoint}`, postData, {withCredentials: true});
        return data;
    } catch(error){
        throw new Error(error.response.status, error.response.data);
    }
}

export default postToAPI;