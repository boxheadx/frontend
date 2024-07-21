import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/API';
import {ReviewCard, PostReview} from './';

const Reviews = ({book_id, user, setUpdated}) => {

    const [reviews, setReviews] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(null);
    
    const checkUserReview = (reviews)=>{
        if(reviews && user){
            console.log('checking user review')
            const user_review =reviews.find(review=>review.username == user[0].username);
            setUserReview(user_review);
        }
    }

    const fetchReviews = async()=>{
        try{
            const bookReviews = await fetchFromAPI(`/book/review/${book_id}`);
            checkUserReview(bookReviews);
            setReviews(bookReviews);
            console.log('hello')
        } catch(err){
            console.log(err);
            if(err.msg) setError(err.msg);
            else setError(err);
        }
    }

    useEffect(()=>{
        console.log('did it')
        fetchReviews();
    }, [book_id, user, posted])


    return (
        <div className='reviews'>
            <p className='reviews-title'> Ratings & Reviews </p>
            {user && userReview && (
                <div className='user-review'>
                    <p className='own-review'>Your review</p>
                    <ReviewCard review={userReview} />
                </div>
            ) || (
                user && (<div className='user-review'>
                    <PostReview book_id={book_id} user={user} setPosted={setPosted} setUpdated={setUpdated}/>
                </div>) || (
                    <div className='user-review'>
                        <p className='own-review'>Login in to post a review</p>
                    </div>
                )
            )}
            {reviews && (
                reviews.map((review) => {
                    {return (!userReview || review.username != userReview.username) && <ReviewCard review={review} />}
                })
            )} 
            {reviews && !reviews.length && <p className='no-reviews'> No reviews yet!</p>}   
        </div>
    )
}

export default Reviews