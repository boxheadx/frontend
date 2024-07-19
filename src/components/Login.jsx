import React, { useState } from 'react';
import { postToAPI } from '../utils/API';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


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

    return (
        <div className='login'>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <div className='form'>
                <p> Login </p>
                <input placeholder='Email'onChange={handleChange(setEmail)} value={email}/>
                <input type='password' placeholder='Password'onChange={handleChange(setPassword)} value={password}/>
                <button onClick={handleSubmit}> Log In </button>
            </div>

        </div>
    );
}

export default Login;