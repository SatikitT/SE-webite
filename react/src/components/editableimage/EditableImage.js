import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const EditableMedia = ({ mediaTag, mediaStyle}) => {
    const [mediaSrc, setMediaSrc] = useState('');
    const [mediaType, setMediaType] = useState('image');

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const encodedTag = encodeURIComponent(mediaTag);
                const response = await axios.get(`${API_BASE_URL}/get-image?tag=${encodedTag}`);
                if (response.data.image_url) {
                    const url = response.data.image_url;
                    setMediaSrc(url);
                    setMediaType(url.endsWith('.mp4') || url.endsWith('.webm') ? 'video' : 'image');
                } else if (response.data.image_data) {
                    const byteCharacters = atob(response.data.image_data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
                    const mediaUrl = URL.createObjectURL(blob);

                    setMediaSrc(mediaUrl);
                    setMediaType(response.data.image_data.startsWith('AAAAIGZ0') ? 'video' : 'image');
                }
            } catch (error) {
                console.error("Error fetching media:", error);
            }
        };

        fetchMedia();
    }, [mediaTag]);

    const defaultMediaStyle = {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'block',
    };

    const combinedStyles = { ...defaultMediaStyle, ...mediaStyle };

    return (
        <div>
            {mediaType === 'video' ? (
                <video src={mediaSrc} style={combinedStyles} autoPlay loop muted />
            ) : (
                <img alt="" src={mediaSrc} style={combinedStyles} />
            )}
        </div>
    );
};

export default EditableMedia;
