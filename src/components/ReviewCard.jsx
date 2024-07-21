import { Rating } from '@mui/material'
import React from 'react'
import nopic from '../assets/no-picture.png';

const ReviewCard = ({review}) => {
  return (
    <div className='review-card'>
        <div className='reviewer'>
            <img src={review.profile_picture_url || nopic} width={50} height={50}/>
            <p className='review-username'>{review.username}</p>
        </div>
        <div className='review-stuffs'>
            <Rating className='review-rating' size='medium' value={review.rating} readOnly/>
            <p className='review-title'>{review.title}</p>
            <p className='review-body'>{review.body}</p>
        </div>
    
    </div>
  )
}

export default ReviewCard