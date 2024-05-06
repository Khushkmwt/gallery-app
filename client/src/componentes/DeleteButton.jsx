// DeleteButton.js
import React from 'react';
import axios from 'axios';

const DeleteButton = ({ imageId, onDelete }) => {
    const handleDelete = () => {
        axios.post(`/api/image/delete/${imageId}`)
            .then(() => {
                console.log('Deleted');
                onDelete(imageId);
            })
            .catch((error) => {
                console.error('Delete failed:', error.response.data.message);
            });
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Delete
        </button>
    );
};

export default DeleteButton;
