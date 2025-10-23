import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const login = () => {
    const {setAuth} = useAuth(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });


    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('/api/auth/login', form, {
                withCredentials: true
            });
    
            setAuth({accessToken: res.data.accessToken, role: res.data.user.role, user: res.data.user});
            console.log('Login successful', res.data);
            navigate('/');
            

        } catch (error) {
            setError('Login failed, please check your credentials', error);
            console.error('Login failed', error);
        }
    }    


  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form className='space-y-4'>
            <div>
                <label className='block mb-2 font-medium' htmlFor="email">Email:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' 
                type="email" id='email' 
                value={form.email}
                onChange={(e)=> setForm({...form, email: e.target.value
                })}

                 />
            </div>
            <div>
                <label className='block mb-2 font-medium' htmlFor="password">Password:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' 
                type="password" id='password'   
                value={form.password}
                onChange={(e)=> setForm({...form, password: e.target.value
                })}
                 />
            </div>
            <div>
                <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' 
                onClick={handleLogin}
                type='submit'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default login
