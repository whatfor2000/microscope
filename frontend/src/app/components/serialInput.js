'use client'

import { useState } from 'react';

const serialInput = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputValue }),
        });
        const result = await response.json();
        console.log(result);
    };

    return (
            <form onSubmit={handleSubmit} className='flex mx-4 my-4 gap-4'>
                <label htmlFor="price" className="block text-sm/6 font-medium text-white">Serial Number</label> 
                <input
                    className='outline-1 outline-amber-50 rounded-2xl px-2'
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className='outline-1 outline-amber-50 px-2 rounded-2xl cursor-pointer hover:bg-gray-500'>Submit</button>
            </form>
    );
};

export default serialInput;