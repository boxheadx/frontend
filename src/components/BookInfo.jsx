import React, { useEffect, useState } from 'react'
import {GenreCard} from './'
import { Rating, Backdrop, CircularProgress } from '@mui/material'
import { fetchFromAPI, postToAPI } from '../utils/API';

const BookInfo = ({bookDetails, genres, book_id}) => {

    const [error, setError] = useState(null);
    const [shelves, setShelves] = useState([]);
    const [success, setSuccess] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleButton = async(i)=>{
        setError(null);
        setSuccess(null);

        setClicked(true);

        if(shelves.length){        
            postToAPI(`/shelves/${shelves[i].shelf_id}/addbook`, { book_id: book_id}).then((res)=>{
            setSuccess(res);
            setClicked(false);
            }).catch((err)=>{
                setClicked(false)
                console.log(err);
                if(err.msg) {
                    setError(err.msg)
                } else{
                    setError('Error!');
                }
            });
        } else{

            setError('You must log in first!');
            setClicked(false);
        }

    }

    useEffect(()=>{
        fetchFromAPI('/shelves/shelfids').then((shelves)=>{
            setShelves(shelves);
            console.log(shelves);
        }).catch((err)=>{             
            if(err.msg) {
            setError(err.msg)
        } else{
            // setError('Error!');
        } 
    });
    }, []);
    
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
                    <div className='avg-rating'>{<Rating name='avg-rating' value={bookDetails[0].avg_rating} size='large' precision={0.5} readOnly/>}</div>
                    <p className='description' style={{textAlign: 'center', border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "15px"}}>{ bookDetails[0].description }</p>
                </div>
                <div className='book-options'>
                    <button className='option-btn' onClick={()=>{handleButton(0)}}> Want to read</button>
                    <button className='option-btn' onClick={()=>{handleButton(1)}}> Reading</button>
                    <button className='option-btn' onClick={()=>{handleButton(2)}}> Read </button>

                    {!error && !success && clicked && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}

                    {error && <div style={{ color: 'white', backgroundColor: 'red', padding: '20px', border: '1px solid red', borderRadius: '20px',marginTop: '70px', marginLeft: '40px', flex: 1, marginRight: '50px', height: '20px', textAlign: 'center', paddingBottom: '40px' }}><p>{error}</p></div>}
                    {success && <div style={{ color: 'white', backgroundColor: 'green', padding: '20px', border: '1px solid green', borderRadius: '20px', marginTop: '30px', marginLeft: '40px', marginRight: '50px', height: '20px', textAlign: 'center', paddingBottom: '40px'}}>{success}</div>}
                </div>
            </>
        )}
        
    </div>
  )
}

export default BookInfo