import React, { useState } from 'react'
import logo from '../assets/Saphoomhicha.png';
import { Link, useNavigate } from 'react-router-dom';
import { fetchFromAPI } from '../utils/API';
import nopic from '../assets/no-picture.png';

const Navbar = ({user, setUser}) => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownSelected, setDropdownSelected] = useState(false);

    const handleSearchSubmit = async(e) => {
        e.preventDefault();
        setSearchTerm('');
        navigate(`/search/${searchTerm}`);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const toggleDropdown = () => {
        setDropdownSelected(!dropdownSelected);
    }

    const handleLogout = async () => {
        setDropdownSelected(false);
        await fetchFromAPI('/auth/logout');
        setUser(null);
        navigate('/');
    }

    console.log(user);

    return (
        <div className='nav-bar'>
            <div className='logo'>
                <img src={logo}/>
            </div>
            <div className='nav-menu'>
                <Link className='nav-item' to='/'>Home</Link>
                <Link className='nav-item' to='/authors'>Authors</Link>
                <Link className='nav-item' to='/people'>Genres</Link>
                {user && <Link className='nav-item' to='/shelves'>Shelves</Link>}
                <form onSubmit={handleSearchSubmit} className='search-form'>
                    <div className='search-container'>
                        <input
                            type='text'
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className='search-input'
                        />
                        <button type='submit' className='search-button'><i className='fas fa-search'></i></button>
                    </div>
                </form>
                {!user && <Link className='nav-item' to='/login'>Login</Link>}
                {user && (
                    <div className='profile-menu'>
                        <img className='profile-image-nav' src={user[0].profile_picture_url || nopic} height={50} width={50} onClick={toggleDropdown}/>
                        {dropdownSelected && (
                            <div className='dropdown'>
                                 <Link to='/profile' className='dropdown-item' onClick={toggleDropdown}>Profile</Link>
                                 {user[0].role == 1 && (<Link to='/author/post' className='dropdown-item' onClick={toggleDropdown}>Post a book</Link>)}
                                 <button onClick={handleLogout} className='dropdown-item'>Log Out</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar