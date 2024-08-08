import React, { useEffect, useState } from 'react'
import { fetchFromAPI, postToAPI } from '../utils/API';

const ShelfBookCard = ({book, shelf_id, handleRemove}) => {

  const [dropdownSelected, setDropdownSelected] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [status, setStatus] = useState(null);

  const getShelves = async()=>{
    fetchFromAPI('/shelves').then((shelves)=>{
        setShelves(shelves);
    }).catch((err)=>{
        console.log(err);
    })
  }

  const addToShelf = async(shelf_id)=>{
    setStatus(null);
    postToAPI(`/shelves/${shelf_id}/addbook`, {book_id: book.book_id}).then(()=>{
      setStatus('Added to shelf!');
    }).catch((err)=>{
      if(err.msg){
        setStatus(err.msg);
      } else{
        setStatus(err);
      }
    })
  }

  const removeFromShelf = async()=>{
    setStatus(null);
    postToAPI(`/shelves/${shelf_id}/removebook`, {book_id: book.book_id}).then(()=>{
      setStatus('Removed book!');
      handleRemove(status);
    }).catch((err)=>{
      if(err.msg){
        setStatus(err.msg);
      } else{
        setStatus(err);
      }
    })
  }

  const toggleDropdown = () => {
    setDropdownSelected(!dropdownSelected);
  }

  useEffect(()=>{
    getShelves();
  }, [dropdownSelected])

  return (
    <div>
      <div className='shelf-book-card'>
          <div className='shelb-book-cover-image'>
              <img src={book.cover_image_url} width={80} height={120}/>
          </div>
          <div className='book-stuffs'>
              <p className='book-name'>{book.title}</p>
              <p className='book-author'>{book.author}</p>
          </div>
          <div className='shelf-options'>
            <button className='remove-button' onClick={toggleDropdown}><i class="fa-solid fa-square-plus"></i></button>
            {dropdownSelected && (
                            <div className='dropdown'>
                                {status && <p className='dropdown-item'> {status}</p>}
                                 {shelves.map((shelf)=>{ return <button className='dropdown-item' onClick={()=>{ addToShelf(shelf.shelf_id) }}>{shelf.name}</button> })}
                            </div>
                        )}
            <button className='remove-button' onClick={removeFromShelf}><i class="fa-solid fa-trash"></i></button>
          </div>
      
      </div>


    </div>
  )
}

export default ShelfBookCard