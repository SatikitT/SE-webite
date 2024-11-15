import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const EditableImage = ({ imageTag, imgStyle }) => {
    const [imageSrc, setImageSrc] = useState('');
    const [hovered, setHovered] = useState(false);
    
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/get-image?tag=${imageTag}`);
                console.log(response);
                if (response.data.image_url) {
                    setImageSrc(response.data.image_url);
                } else if (response.data.image_data) {
                    const byteCharacters = atob(response.data.image_data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'image/png' }); 
                    const imageUrl = URL.createObjectURL(blob);
                    setImageSrc(imageUrl);
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };
    
        fetchImage();
    }, [imageTag]);

    const handleImageChange = async () => {
        const newUrl = prompt('Enter the new image URL or leave empty to upload a file:');
        let formData = new FormData();
    
        console.log(newUrl);
        formData.append('tag', imageTag);
    
        if (newUrl) {
            
            formData.append('image_url', newUrl);
            try {
                
                const response = await axios.post(`${API_BASE_URL}/update-image`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log("Image updated response:", response.data);
                setImageSrc(newUrl);  
            } catch (error) {
                console.error("Error updating image:", error.response?.data || error);
            }
        } else if (newUrl == "") {
            
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*'; 
            fileInput.onchange = async () => {
                const file = fileInput.files[0]; 
                if (file) {
                    formData.append('file', file); 
                    try {
                        const response = await axios.post(`${API_BASE_URL}/update-image`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        });
                        console.log("Image updated response:", response.data);
                        setImageSrc(URL.createObjectURL(file));
                    } catch (error) {
                        console.error("Error updating image:", error.response?.data || error);
                    }
                }
            };
            fileInput.click(); 
        }
    };

    const defaultImgStyle = {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'block',
    };
    
    const combinedStyles = { ...defaultImgStyle, ...imgStyle }; 

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: 'relative' }}
        >
            <img src={imageSrc} alt="Editable" style={combinedStyles} />
            {hovered && (
                <button
                    onClick={handleImageChange}
                    style={{
                        position: 'absolute',
                        top: '80px',
                        right: '10px',
                        padding: '6px',
                        backgroundColor: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Change Image
                </button>
            )}
        </div>
    );
};

export default EditableImage;
