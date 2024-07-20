import React from 'react'

const GenreCard = ({genre}) => {
  return (
    <div className='genre-card'>{genre.name}</div>
  )
}

export default GenreCard