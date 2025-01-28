import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Function to upload image
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImages([...images, response.data.file]);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Function to set title
    const updateTitle = (newTitle) => {
        setTitle(newTitle);
    };

    // Function to set description
    const updateDescription = (newDescription) => {
        setDescription(newDescription);
    };

    return (
        <ImageContext.Provider value={{ images, title, description, uploadImage, updateTitle, updateDescription }}>
            {children}
        </ImageContext.Provider>
    );
};