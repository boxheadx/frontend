import axios from "axios";
import Error from "../Error";

const BASE_URL = 'http://localhost:5000/api/v1'

const postToAPI = async(endpoint, postData)=>{
    try{
        const { data } = await axios.post(`${BASE_URL}${endpoint}`, postData);
        return data;
    } catch(error){
        throw new Error(error.response.status, error.response.data);
    }
}

export default postToAPI;