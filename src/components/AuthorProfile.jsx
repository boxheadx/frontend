import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { fetchFromAPI } from '../utils/API';

const AuthorProfile = () => {

    const {id} = useParams();
    const [authorInfo, setAuthorInfo] = useState(null);

    const getProfile = async()=>{
        try{
            const user_id = id.split('x')[0];
            const authorInfo = await fetchFromAPI(`/user/profile/${user_id}`);
            setAuthorInfo(authorInfo[0]);
        } catch(err){
            if(err.msg){
                console.log(err.msg);
            }
        }
    }

    useEffect(()=>{
        getProfile();
    }, [id])

    return (
        <div>
            {authorInfo && authorInfo.username}
        </div>
    )
}

export default AuthorProfile