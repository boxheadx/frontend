import React from 'react'

const BookCard = ({book, handleBookSelect}) => {
  console.log(book.book_id)
  return (
    <div className='book-card' onClick={()=>{handleBookSelect(book.book_id)}}>
        <img src={book.cover_image_url}/>
        <p className='book-title'>{book.title}</p>
        <p className='book-author'>{book.username}</p>
    </div>
  )
}

export default BookCard