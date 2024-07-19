import React from 'react'

const BookCard = ({book}) => {
  return (
    <div className='book-card'>
        <img src={book.cover_image_url}/>
        <p className='book-title'>{book.title}</p>
        <p className='book-author'>{book.username}</p>
    </div>
  )
}

export default BookCard