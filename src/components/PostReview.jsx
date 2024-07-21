import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import { postToAPI } from '../utils/API';

const PostReview = ({book_id, user, setPosted, setUpdated}) => {
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

   try{
    await postToAPI(`/book/review/${book_id}`, {
        title: reviewTitle,
        body: review,
        rating: rating.toString()
    });
    setPosted(true);
    setUpdated(true);
   } catch(err){
    if(err.msg) setError(err.msg);
    else setError('Failed');
   }

  };

  return (
    <>
    {error && <p>{error}</p>}
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      className="review-form" 
      sx={{ 
        backgroundColor: 'white', 
        padding: '20px'
      }}
    >
      <Typography variant="h5" component="h2" sx={{ marginBottom: '16px' }}>
        Post Your Review
      </Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Review Title"
        variant="outlined"
        fullWidth
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Your Review"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ 
          backgroundColor: 'black', 
          color: 'white', 
          '&:hover': {
            backgroundColor: 'darkgray',
          } 
        }}
      >
        Submit
      </Button>
    </Box>
    </>
  );
};

export default PostReview;
