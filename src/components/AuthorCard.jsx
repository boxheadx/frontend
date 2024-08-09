import React, { useState } from 'react'
import { fetchFromAPI } from '../utils/API';
import nopic from '../assets/no-picture.png';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthorCard = ({author_name, user_id, author_id, rating}) => {


    const navigate = useNavigate();

    const [authorInfo, setAuthorInfo] = useState(null);

    const getProfile = async()=>{
        try{
            const authorInfo = await fetchFromAPI(`/user/profile/${user_id}`);
            setAuthorInfo(authorInfo[0]);
        } catch(err){
            if(err.msg){
                console.log(err.msg);
            }
        }
    }


    const handleClick = ()=>{
        navigate(`/authors/${user_id}x${author_id}`);
    }

    useState(()=>{
        getProfile();
    }, [user_id, author_id]);

    return (
        <div className='review-card' style={{display: "flex", cursor: "pointer"}} onClick={handleClick}>
                {authorInfo && (<><img src={authorInfo.profile_picture_url || nopic} width={50} height={50} style={{ borderRadius: "50%", border: "2px solid #fff",cursor: "pointer"}}/>
                <p className='review-title' style={{margin: "20px", flex: 1, textAlign: "center"}}>{author_name}</p>
                <Rating className='review-rating' size='medium' value={rating} style={{margin: "20px"}} readOnly/>
                </>)}
        </div>
  )
}

export default AuthorCard