import React from 'react'
import {GenreCard} from './'

const BookInfo = ({bookDetails, genres}) => {
  return (
    <div className='book-info'>
        {bookDetails && genres && (
            <>
                <div className='cover-image'>
                    <img className='book-cover' src={bookDetails[0].cover_image_url}/>
                </div>
                <div className='info-box'>
                    <div className='book-title-box'><p>{bookDetails[0].title}</p></div>
                    <div className='author-name'><p>{bookDetails[0].username}</p></div>
                    <div className='publication-date'><p>{bookDetails[0].publication_date}</p></div>
                    <div className='genres-box'>
                        {genres.map((genre, i) =>{
                            return <GenreCard key={i} genre={genre}/>
                        })}
                    </div>
                </div>
            </>
        )}
        
    </div>
  )
}

export default BookInfo