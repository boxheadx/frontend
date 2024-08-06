import React from 'react'

const ShelfBookCard = ({shelf}) => {
  return (
    <div>
      <div className='shelf-card'>
          <div className='shelf-icon'>
              <img src={nopic} width={50} height={50}/>
          </div>
          <div className='shelf-stuffs'>
              <p className='shelf-name'>{shelf.title}</p>
          </div>
      
      </div>


    </div>
  )
}

export default ShelfBookCard