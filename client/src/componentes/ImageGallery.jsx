// ImageGallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton'; // Import DeleteButton component

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('/api/image/show')
            .then((response) => {
                setImages(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching images:', error.response.data.message);
            });
    }, []);

    const handleDelete = (imageId) => {
        setImages(images.filter((image) => image._id !== imageId));
    };

    return (
        <div className="container mx-auto bg-red-100  pt-6 ">
            <h1 className="text-3xl font-bold text-center mb-4">Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images?.map((image) => (
                    <div key={image._id} className="border rounded-lg overflow-hidden">
                        <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-4 bg-slate-200">
                            <DeleteButton imageId={image._id} onDelete={handleDelete} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
