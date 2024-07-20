import React, { useState, useRef, useEffect } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { postToAPI } from '../utils/API';
import getUser from '../utils/Auth';
import nopic from '../assets/no-picture.png';

const Profile = ({ user, setUser }) => {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [username, setUsername] = useState(user[0].username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user[0].email);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (error || success) {
          setShowMessage(true);
          const timer = setTimeout(() => {
            setShowMessage(false);
            setError('');
            setSuccess('');
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [error, success]);

    const fileInputRef = useRef(null);

    const handleImageUpdate = async(e) => {
        const file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append('image', file);

            try{
                const data = await postToAPI('/user/edit', formData);
                getUser(setUser);
                console.log(data)
                setSuccess(data);
            } catch(err){
                if(err.msg){
                    console.log(err.msg);
                    setError(err.msg);
                }
            }
        }
    }
   
    const triggerImage = () => {
        fileInputRef.current.click();
    }

    const handleSubmit = async () =>{
        try{
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            if(password){
                formData.append('password', password);
            }
            const data = await postToAPI('/user/edit', formData);
            console.log('data: ', data)
            setSuccess(data);
            getUser(setUser);
        } catch(err){
            if(err.msg){
                console.log(err.msg);
                setError(err.msg);
            }
        }
    }

    return (
        <div className='profile'>
            {showMessage && error && <div style={{ color: 'white', backgroundColor: 'red', padding: '10px', border: '1px solid red', borderRadius: '20px' }}>{error}</div>}
            {showMessage && success && <div style={{ color: 'white', backgroundColor: 'green', padding: '10px', border: '1px solid green', borderRadius: '20px' }}>{success}</div>}
            <br/>
            <div className='profile-picture'>
                <img src={user[0].profile_picture_url || nopic} alt='Profile' />
                <button className='edit-btn' onClick={triggerImage}>
                    <FaEdit />
                </button>
                <input
                    type='file'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageUpdate}
                />
            </div>

            <div className='profile-info'>
                <div className='profile-field'>
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>

                <div className='profile-field'>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>

                <div className='profile-field'>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                
                <button className='update-btn' onClick={handleSubmit}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default Profile;
