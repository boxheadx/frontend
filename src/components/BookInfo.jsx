import React from 'react'
import {GenreCard} from './'
import { Rating } from '@mui/material'

const BookInfo = ({bookDetails, genres, avg_rating}) => {
  return (
    <div className='book-info'>
        {bookDetails && genres && (
            <>
                <div className='cover-image'>
                    <img className='book-cover' src={bookDetails[0].cover_image_url}/>
                </div>
                <div className='info-box'>
                    <div className='book-title-box'><p>{bookDetails[0].title}</p></div>
                    <div className='author-name'><p>Author: {bookDetails[0].username}</p></div>
                    <div className='publication-date'><p>{bookDetails[0].publication_date}</p></div>
                    <div className='genres-box'>
                        {genres.map((genre, i) =>{
                            return <GenreCard key={i} genre={genre}/>
                        })}
                    </div>
                    <div className='avg-rating'>{<Rating name='avg-rating' value={avg_rating} size='large' precision={0.5} readOnly/>}</div>
                </div>
                <div className='book-options'>
                    <button className='option-btn'> Want to read</button>
                    <button className='option-btn'> Reading</button>
                    <button className='option-btn'> Read </button>
                </div>
            </>
        )}
        
    </div>
  )
}

export default BookInfo