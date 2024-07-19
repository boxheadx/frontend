import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/v1'

const fetchFromAPI = async(endpoint, options={})=>{
    try{
        const { data } = await axios.get(`${BASE_URL}${endpoint}`, options);
        return data;
    } catch(err){
        throw err;
    }
}

export default fetchFromAPI;