import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UploadImageForm = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        // Log the formData to see if the data is correctly appended
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        axios.post('/api/image/upload', formData)
            .then((response) => {
                console.log('Image uploaded successfully:', response.data);
                // Redirect to the home page
                navigate('/gallery')
            })
            .catch((error) => {
                console.error('Image upload failed:', error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8" encType="multipart/form-data">
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border rounded-lg p-2"
                required
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg p-2 mt-2"
                required
            />
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Upload
            </button>
        </form>
    );
};

export default UploadImageForm;
