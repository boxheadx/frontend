import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const fetchFromAPI = async(endpoint)=>{
    try{
        const { data } = await axios.get(`${BASE_URL}${endpoint}`, {withCredentials: true});
        return data;
    } catch(err){
        throw err;
    }
}

export default fetchFromAPI;