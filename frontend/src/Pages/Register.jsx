import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });


    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('/api/auth/register', form, {
                withCredentials: true
            });   
            navigate('/login');


        } catch (error) {
            setError('Registration failed, please check your credentials', error);
            console.error('Registration failed', error);
        }
    }    


  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form className='space-y-4'>
            <div>
                <label className='block mb-2 font-medium' htmlFor="email">Username:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' 
                type="text" id='username' 
                value={form.username}
                onChange={(e)=> setForm({...form, username: e.target.value
                })}

                required />
            </div>
            <div>
                <label className='block mb-2 font-medium' htmlFor="email">Email:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' 
                type="email" id='email' 
                value={form.email}
                onChange={(e)=> setForm({...form, email: e.target.value
                })}

                required />
            </div>
            <div>
                <label className='block mb-2 font-medium' htmlFor="password">Password:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' 
                type="password" id='password'   
                value={form.password}
                onChange={(e)=> setForm({...form, password: e.target.value
                })}
                required />
            </div>
            <div>
                <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' 
                onClick={handleRegister}
                type='submit'>register</button>
            </div>
        </form>
    </div>
  )
}

export default register

