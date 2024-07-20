import React, { useEffect, useState } from 'react';
import { postToAPI } from '../utils/API';
import { Link, useNavigate } from 'react-router-dom';
import getUser from '../utils/Auth';
import bg from '../assets/bg.png';

const Login = ({user, setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleChange = (setter) => (e) =>{
        setter(e.target.value);
        setError(null);
    }

    const handleSubmit = async () => {

        setError(null);
        setSuccess(null);

        try{
            const data = {
                email: email,
                password: password
            };
            const response = await postToAPI('/auth/login', data);
            console.log(response);
            setSuccess(response);
            getUser(setUser);
            navigate('/');
        } catch(error){
            if(error.status && error.msg){
                setError(error.msg);
                setEmail('');
                setPassword('');
                console.log(error.msg);
            }
            else{
                setError(`Unknown error: ${error}`);
                setEmail('');
                setPassword('');
            }
        }
    }

    // useEffect((), [])

    return (
        <div className='login'>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <div className='form'>
                <p> Login </p>
                <input className='search-input' placeholder='Email'onChange={handleChange(setEmail)} value={email}/>
                <input className='search-input' type='password' placeholder='Password'onChange={handleChange(setPassword)} value={password}/>
                <button className='button' onClick={handleSubmit}> Log In </button>
                <p>Don't have an account yet? <Link to='/register'>Sign Up</Link></p>

            </div>

            <p className='slogan'> Read. Share. Connect. </p>

            <div className='bg'>
                <img src={bg}/>
            </div>

            
        </div>
    );
}

export default Login;