import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditableMedia from '../../components/editableimage/EditableImage';
import { API_BASE_URL } from '../../api';
import './admin.css';

const Admin = () => {
    const [currentSection, setCurrentSection] = useState('statistics');
    const [currentItem, setCurrentItem] = useState(null);
    const [modalType, setModalType] = useState('');
    const [homeMenuOpen, setHomeMenuOpen] = useState(false);
    const [mediaUrl, setMediaUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', detail: '', type: currentSection });
    const [newImage, setNewImage] = useState({ imageUrl: '', file: null });
    const [rooms, setRooms] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (currentSection === 'room-management') {
            fetchRooms();
        }
    }, [currentSection]);

    useEffect(() => {
        const loadItems = async () => {
            if (currentSection === 'award' || currentSection === 'news') {
                const fetchedItems = await fetchItems(currentSection);
                setItems(fetchedItems);
            }
        };

        loadItems();
    }, [currentSection]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/reservations/`);
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error.response?.data || error);
            alert('Failed to fetch room reservations.');
        }
    };

    const fetchItems = async (type) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/items/`);
            const filteredItems = response.data.filter(item => item.type === type);
            return filteredItems;
        } catch (error) {
            console.error('Error fetching items:', error.response?.data || error);
            alert('Failed to fetch items.');
        }
    }

    const handleSectionSwitch = (targetId) => {
        setCurrentSection(targetId);
    };


    const openRemoveModal = (itemId) => {
        setCurrentItem(itemId);
        setModalType("remove");
    };

    const closeModal = () => {
        setModalType(null);
        setCurrentItem(null);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
        setNewItem({ title: '', detail: '', type: currentSection });
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewItem({ title: '', detail: '', type: '' });
    };

    const openEditModal = (item) => {
        setCurrentItem(item);
        setModalType("edit");
    };


    const toggleHomeMenu = () => {
        setHomeMenuOpen((prev) => !prev);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        alert(`Saved: ${currentItem}`);
        closeModal();
    };

    const removeRoom = async (roomId) => {
        try {
            await axios.delete(`${API_BASE_URL}/reservations/${roomId}`);
            setRooms((prevRooms) => prevRooms.filter(room => room.id !== roomId));  // Remove room from state
            alert('Room reservation removed successfully!');
        } catch (error) {
            console.error('Error removing room:', error.response?.data || error);
            alert('Failed to remove room reservation.');
        }
    };

    const removeItem = async (itemId) => {
        try {
            await axios.delete(`${API_BASE_URL}/items/${itemId}`);
            setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
            alert('Room reservation removed successfully!');
        } catch (error) {
            console.error('Error removing item:', error.response?.data || error);
            alert('Failed to remove item.');
        }
        closeModal();
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/items/`, newItem);
            setItems((prevItems) => [...prevItems, response.data]);
            alert('Item added successfully!');

            // Upload the image using the item's title as the tag
            await handleImageSubmit(newItem.title);

            closeAddModal();
        } catch (error) {
            console.error('Error adding item:', error.response?.data || error);
            alert('Failed to add item.');
        }
    };

    const handleImageSubmit = async (tag) => {
        const formData = new FormData();
        formData.append('tag', tag);

        if (newImage.imageUrl) {
            formData.append('image_url', newImage.imageUrl);
        } else if (newImage.file) {
            formData.append('file', newImage.file);
        } else {
            return; // No image to upload
        }

        try {
            await axios.post(`${API_BASE_URL}/update-image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error.response?.data || error);
            alert('Failed to upload image.');
        }
    };

    const handleEditItem = async (e) => {
        e.preventDefault();
        try {
            const updatedItem = { title: currentItem.title, detail: currentItem.detail, type: currentSection };
            await axios.put(`${API_BASE_URL}/items/${currentItem.id}/`, updatedItem);
    
            await handleImageSubmit(currentItem.title);
    
            setItems((prevItems) =>
                prevItems.map((item) => (item.id === currentItem.id ? { ...item, ...updatedItem } : item))
            );
            alert('Item updated successfully!');
            closeModal();
        } catch (error) {
            console.error('Error updating item:', error.response?.data || error);
            alert('Failed to update item.');
        }
    };
    


    const handleMediaSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tag', 'mainpage');

        if (mediaUrl) {
            formData.append('image_url', mediaUrl);
        } else if (selectedFile) {
            formData.append('file', selectedFile);
        } else {
            alert('Please provide a URL or select a file.');
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/update-image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Media updated successfully!');
            setMediaUrl('');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error updating media:', error.response?.data || error);
            alert('Failed to update media.');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
            <div className="admin-wrapper">
                <div className="sidebar">
                    <h2>Admin Panel</h2>
                    <div className="menu-item">
                        <a href="#!" onClick={() => handleSectionSwitch("statistics")}>
                            <i className="far fa-chart-bar"></i> Satistics
                        </a>
                    </div>

                    <div className={`menu-item has-submenu ${homeMenuOpen ? "open" : ""}`}>
                        <a href="#!" onClick={toggleHomeMenu}>
                            <i className="fas fa-home"></i> Home Page
                        </a>
                        <div className={`submenu ${homeMenuOpen ? "open" : ""}`}>
                            <a href="#!" onClick={() => handleSectionSwitch("welcome-footage")}>
                                Welcome Footage
                            </a>
                            <a href="#!" onClick={() => handleSectionSwitch("award")}>Award</a>
                            <a href="#!" onClick={() => handleSectionSwitch("news")}>News</a>
                        </div>
                    </div>

                    <div className="menu-item">
                        <a href="#!" onClick={() => handleSectionSwitch("about-page")}>
                            <i className="fas fa-info-circle"></i> About Page
                        </a>
                    </div>
                    <div className="menu-item">
                        <a href="#!" onClick={() => handleSectionSwitch("room-management")}>
                            <i className="fas fa-cogs"></i> Room Management
                        </a>
                    </div>
                </div>

                <div className="main-content">

                    {currentSection === 'statistics' && (
                        <div className="content-section">
                            <h1>Statistics</h1>

                        </div>
                    )}

                    {currentSection === 'welcome-footage' && (
                        <div id="welcome-footage" className="content-section">
                            <h1>Welcome Footage</h1>
                            <EditableMedia mediaTag="mainpage" mediaStyle={{ width: '50%' }} />
                            <form onSubmit={handleMediaSubmit} style={{ marginTop: '20px' }}>
                                <label>
                                    Media URL:
                                    <input
                                        type="text"
                                        value={mediaUrl}
                                        onChange={(e) => setMediaUrl(e.target.value)}
                                        placeholder="Enter media URL"
                                        style={{ marginLeft: '10px', marginRight: '10px' }}
                                    />
                                </label>
                                <label>
                                    Or Upload File:
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </label>
                                <button type="submit" style={{ marginLeft: '10px' }}>
                                    Update Media
                                </button>
                            </form>
                        </div>
                    )}

                    {currentSection === "award" && (
                        <div id="award" className="content-section">
                            <h1>Award</h1>
                            <ul>
                                {items.length > 0 ? (
                                    items.map(award => {
                                        return (
                                            <li key={award.id}>
                                                <span>{award.title}</span>
                                                <div className="button-group">
                                                    <button onClick={() => openEditModal(award)}>
                                                        <i className="fas fa-pen"></i>
                                                    </button>
                                                    <button onClick={() => openRemoveModal(award.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li>No awards.</li>
                                )}
                            </ul>

                            <button onClick={openAddModal}>Add New Award</button>
                        </div>
                    )}

                    {currentSection === "news" && (
                        <div id="news" className="content-section">
                            <h1>News</h1>
                            <ul>
                                {items.length > 0 ? (
                                    items.map(news => {
                                        return (
                                            <li key={news.id}>
                                                <span>{news.title}</span>
                                                <div className="button-group">
                                                    <button onClick={() => openEditModal(news)}>
                                                        <i className="fas fa-pen"></i>
                                                    </button>
                                                    <button onClick={() => openRemoveModal(news.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li>No news.</li>
                                )}
                            </ul>
                            <button onClick={openAddModal}>Add New News</button>
                        </div>
                    )}

                    {currentSection === "about-page" && (
                        <div id="about-page" className="content-section">
                            <h1>About Page</h1>
                            <ul>
                                <li>
                                    <span>Employee 1</span>
                                    <div className="button-group">
                                        <button onClick={() => openEditModal("Employee 1")}>
                                            <i className="fas fa-pen"></i>
                                        </button>
                                        <button onClick={() => openRemoveModal("Employee 1")}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}

                    {currentSection === "room-management" && (
                        <div id="room-management" className="content-section">
                            <h1>Room Management</h1>
                            <ul>
                                {rooms.length > 0 ? (
                                    rooms.map(room => {
                                        const timeReserved = room.time.map(hour => `${hour}:00`).join(", ");
                                        return (
                                            <li key={room.id}>
                                                <span>{`Room ${room.room_number} reserved on ${room.day} at ${timeReserved}`}</span>
                                                <button onClick={() => removeRoom(room.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li>No rooms reserved.</li>
                                )}
                            </ul>
                        </div>
                    )}


                    {isAddModalOpen && (
                        <div className="modal open">
                            <div className="modal-content">
                                <h2>Add New Item</h2>
                                <form onSubmit={handleAddItem}>
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            value={newItem.title}
                                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Detail:</label>
                                        <textarea
                                            rows="4"
                                            value={newItem.detail}
                                            onChange={(e) => setNewItem({ ...newItem, detail: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL:</label>
                                        <input
                                            type="text"
                                            value={newImage.imageUrl}
                                            onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value, file: null })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Upload Image:</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setNewImage({ ...newImage, file: e.target.files[0], imageUrl: '' })}
                                        />
                                    </div>

                                    <div className="button-group">
                                        <button type="submit">Add</button>
                                        <button type="button" onClick={closeAddModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {modalType === "edit" && currentItem && (
                        <div className="modal open">
                            <div className="modal-content">
                                <h2>Edit {currentItem.title}</h2>
                                <form onSubmit={handleEditItem}>
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            value={currentItem.title}
                                            onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Detail:</label>
                                        <textarea
                                            rows="4"
                                            value={currentItem.detail}
                                            onChange={(e) => setCurrentItem({ ...currentItem, detail: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL:</label>
                                        <input
                                            type="text"
                                            value={newImage.imageUrl}
                                            onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value, file: null })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Upload Image:</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setNewImage({ ...newImage, file: e.target.files[0], imageUrl: '' })}
                                        />
                                    </div>

                                    <div className="button-group">
                                        <button type="submit">Save</button>
                                        <button type="button" onClick={closeModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {modalType === "remove" && (
                        <div className="modal open">
                            <div className="modal-content">
                                <h2>Remove {currentItem}?</h2>
                                <div class="button-group" style={{ justifyContent: 'center' }}>
                                    <button onClick={() => removeItem(currentItem)}>Yes</button>
                                    <button onClick={closeModal}>No</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
