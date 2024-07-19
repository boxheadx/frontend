import React from 'react'
import { BookCard } from './';

const Books = ({books}) => {
  return (
    <div className='latest-books'>
        {books.map((book) => {
            return <BookCard key={book.book_id} book={book} />
        })}
    </div>
  )
}

export default Books