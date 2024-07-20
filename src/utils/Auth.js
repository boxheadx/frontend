import {fetchFromAPI} from '../utils/API';

const getUser = async(setUser) => {
    try {
        const userData = await fetchFromAPI('/user/me');
        setUser(userData);
    } catch (error) {
        setUser(null);
    }
}

export default getUser;