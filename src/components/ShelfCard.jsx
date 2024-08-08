import React from 'react'
import wantToReadPic from '../assets/want_to_read.png'
import readingPic from '../assets/readingpic.jpg'
import finishedPic from '../assets/finished.png'
import shelfpic from '../assets/shelf.png';

const ShelfCard = ({shelf}) => {

  const shelfImg = (shelf)=>{
    if(shelf.name == 'Want to Read') return wantToReadPic;
    if(shelf.name == 'Reading') return readingPic;
    if(shelf.name == 'Finished Reading') return finishedPic;
    return shelfpic
  }
  return (
    <div className='shelf-card'>
      <img src={shelfImg(shelf)} width={70} height={70}/>
      <p>{shelf.name}</p>
    </div>
  )
}

export default ShelfCard