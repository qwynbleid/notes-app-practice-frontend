import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {actionsPosts} from "../redux/slices/Post";

const CreateNoteModal = ({ isCreate = true,isOpen, onClose, updateNoteId = null }) => {

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '500px',
            backgroundColor: '#cf98ff',
            borderRadius: '10px',
            fontSize: '18px',
            color: '#fff',
        },
    };



    const userDataFromLocalStorage = localStorage.getItem('userId')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch()
    const nav = useNavigate();

    function splitString(inputString) {
        const resultArray = inputString.split(',');
        return resultArray;
    }

    const handleSubmit = async () => {

        if (!title || !content || !tags || !category) {
            alert('Please fill out all required fields');
            return;
        }

        if (!isCreate) {

            const splitTags = splitString(tags)

            const updatedData = {
                _id: updateNoteId,
                userId : userDataFromLocalStorage,
                title,
                content,
                tags : splitTags,
                category
            }

            try {
                const response = await axios.post('http://localhost:8765/notes-service/api/notes/update-note', updatedData)

                const {data} = response

                dispatch(actionsPosts.updatePost(data))

                if (response.status) {
                } else {
                    console.error('Registration failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        } else {
            const splitTags = splitString(tags)

            const updatedData = {
                userId : userDataFromLocalStorage,
                title,
                content,
                tags : splitTags,
                category
            }

            try {
                const response = await axios.post('http://localhost:8765/notes-service/api/notes/add-note', updatedData)

                const {data} = response

                dispatch(actionsPosts.addNewPost(data))

            } catch (error) {
                console.error('Error during registration:', error);
            }
        }


        setTitle('')
        setTags('')
        setCategory('')
        setContent('')
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
            <h2 style={{textAlign: 'center'}}>
                {updateNoteId ? 'Update Note' : 'Create Note'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        className="form-control"
                        id="content"
                        rows="5"
                        placeholder="Enter Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tags"
                        placeholder="Enter Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </Modal>
    );
};

export default CreateNoteModal;