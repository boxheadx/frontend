import React, { useState } from 'react'
import { postToAPI } from '../utils/API';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.png';
import { Backdrop, CircularProgress } from '@mui/material';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('0');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [clicked, setClicked] = useState(false);


    const handleChange = (setter) => (e) =>{
        setter(e.target.value);
        setError(null);
    }

    const handleSubmit = async () => {

        setClicked(true);

        setError(null);
        setSuccess(null);

        try{
            const data = {
                username: username,
                email: email,
                role: role,
                password: password
            };
            const response = await postToAPI('/auth/register', data);
            console.log(response);
            setSuccess(response);
            setClicked(false);
            setUsername('');
            setEmail('');
            setPassword('')
        } catch(error){
            if(error.status && error.msg){
                setError(error.msg);
                setUsername('');
                setEmail('');
                setPassword('');
                console.log(error.msg);
            }
            else{
                setError(`Unknown error: ${error}`);
                setUsername('');
                setEmail('');
                setPassword('');
            }
            setClicked(false);
        }
    }

    return (
        <div className='register'>

            <div className='form'>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {!error && !success && clicked && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}
                <p> Register </p>
                <input className='search-input' placeholder='Username' onChange={handleChange(setUsername)} value={username}/>
                <input className='search-input' placeholder='Email'onChange={handleChange(setEmail)} value={email}/>
                <div className='select-container'>
                    <select id='role' value={role} onChange={handleChange(setRole)} className='select-dropdown'>
                        <option value='0'>Reader</option>
                        <option value='1'>Author</option>
                    </select>
                </div>
                <input className='search-input' type='password' placeholder='Password'onChange={handleChange(setPassword)} value={password}/>
                <button className='button' onClick={handleSubmit}> Sign Up </button>
                <p>Already have an account? <Link to='/login'> Log In </Link></p>
            </div>

            <p className='slogan'> Read. Share. Connect. </p>

            <div className='bg'>
                <img src={bg}/>
            </div>

        </div>
    );
}

export default Register