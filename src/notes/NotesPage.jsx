import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {actionsPosts} from "../redux/slices/Post";
import Modal from "../modal/Modal";
import async from "async";

const NotesPage = ({visibleHandler}) => {

    const userDataFromLocalStorage = localStorage.getItem('userId')
    const postsData = useSelector(state => state.posts.posts.items)
    const data = useSelector(state => state.auth.data)
    const dispatch = useDispatch()
    const [isCreate, setIsCreate] = useState(false)


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsCreate(true)
        setIsModalOpen(true);
    };
    const modalIsUpdate = ()=>{
        setIsCreate(false)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`http://localhost:8765/notes-service/api/notes/get-notes/${userDataFromLocalStorage}`);

                if (response.status === 200) {
                    const {data} = response
                    dispatch(actionsPosts.getAllPosts(data))
                } else {
                    console.error('Failed to fetch notes:', response.statusText);
                }
            } catch (error) {
                console.error('Error during note fetch:', error);
            }
        };

        fetchNotes();
    }, []);


    const deleteNote = async (noteId) => {
        const response = await axios.delete(`http://localhost:8765/notes-service/api/notes/delete-note/${noteId}`);
        dispatch(actionsPosts.deletePost(noteId))
    }


    return (
        <div style={{padding: '10px 30px'}}>
            <div style={{padding: '10px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <h1>My Notes</h1>
                </div>
                <div style={{padding: '10px 30px'}}>
                    <button className="btn btn-success" onClick={openModal}>Create Note</button>
                    {isModalOpen && isCreate && <Modal isOpen={isModalOpen} onClose={closeModal} />}

                </div>
            </div>
            <ul>
                {postsData && postsData.map((note) => (
                    <li key={note.id}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{flex: '1'}}>
                                <strong>Title:</strong> {note.title}<br/>
                                <strong>Content:</strong> {note.content}<br/>
                                <strong>Tags:</strong> {note.tags.join(', ')}<br/>
                                <strong>Category:</strong> {note.category}<br/>
                            </div>
                            <div style={{display: 'flex', gap: '10px', padding: '35px'}}>
                                <div>
                                    <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>Delete</button>
                                </div>
                                <div>
                                    <button style={{padding: '5px 10px'}} className="btn btn-warning" onClick={modalIsUpdate}>Update</button>
                                    {isModalOpen && !isCreate && <Modal isCreate = {isCreate} isOpen={isModalOpen} onClose={closeModal} updateNoteId={note._id}/>}

                                </div>
                            </div>
                        </div>
                        <hr/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesPage;