import React from 'react'
import { BookCard } from './';

const Books = ({books, handleBookSelect}) => {
  return (
    <div className='latest-books'>
        {books.map((book) => {
            return <BookCard key={book.book_id} book={book} handleBookSelect={handleBookSelect} />
        })}
    </div>
  )
}

export default Books