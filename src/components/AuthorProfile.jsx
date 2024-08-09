import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { fetchFromAPI } from '../utils/API';
import './author.css';

const AuthorProfile = () => {

    const {id} = useParams();
    const [authorInfo, setAuthorInfo] = useState(null);
    const [profile, setProfile] = useState(null);
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    const getProfile = async()=>{
        try{
            const user_id = id.split('x')[0];
            const profile = await fetchFromAPI(`/user/profile/${user_id}`);
            setProfile(profile[0]);
        } catch(err){
            if(err.msg){
                console.log(err.msg);
            }
        }
    }

    const getBooks = async()=>{
        try{
            const author_id = id.split('x')[1];
            const books = await fetchFromAPI(`/author/${author_id}/books`);
            setBooks(books);
        } catch(err){
            console.log(err);
        }
    }

    const handleClick = (book_id)=>{
        navigate(`/book/${book_id}`);
    }

    const RenderProfile = () => {
        
        const authorProfile = (
            <div className="author-profile1">
                <div className="author-header1">
                    <img src={authorInfo.profileImage} alt={authorInfo.username} className="author-image1" />
                    <div className="author-details1">
                        <h1>{authorInfo.username}</h1>
                        {/* <p>{authorInfo.bio}</p> */}
                    </div>
                </div>
                <div className="author-books1">
                    <h2>Books by {authorInfo.username}</h2>
                    <ul className="books-list1">
                        {authorInfo.books.map((book) => 
                            <li key={book.book_id} className="book-item1" onClick={()=>{handleClick(book.book_id)}}>
                                <img src={book.cover_image_url} className="book-cover1" />
                                <div className="book-info1">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
        return authorProfile;
    };

    useEffect(()=>{
        if(!profile || !books.length){
            getProfile();
            getBooks();
        }
        if(profile && books.length){
            console.log('yes')
            setAuthorInfo({
                username: profile.username,
                profileImage: profile.profile_picture_url,
                books: books
            });
        }
    }, [profile, books])

    return (
        <div>
             {authorInfo && <RenderProfile/>}
        </div>
    )
}

export default AuthorProfile