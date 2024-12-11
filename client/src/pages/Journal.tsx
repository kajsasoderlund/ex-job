
import React, { useEffect, useState } from 'react';
import { fetchJournals, createJournal, deleteJournal } from '../services/response';
import { Journal } from '../interfaces/User';
import '../styles/journal.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const JournalPage: React.FC = () => {
    const [journals, setJournals] = useState<Journal[]>([]);
    const [newEntries, setNewEntries] = useState<string[]>(['', '', '', '', '']);
    const [modalContent, setModalContent] = useState<{ content: string; index: number } | null>(null);
    const { user, logout } = useUserContext();
    const navigate = useNavigate();

    const prompts = [
        "What's on your mind today?",
        "What do you want to achieve today?",
        "What are four things you feel lucky for?",
        "What do you wanna do today to be the best version of yourself?",
    ];

    const loadJournals = async () => {
        try {
            const data = await fetchJournals();
            setJournals(data);
        } catch (err) {
            console.error('Failed to load journal entries');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleAddJournal = async (index: number) => {
        const content = newEntries[index]?.trim() || modalContent?.content.trim();
        if (!content) {
            return;
        }
        try {
            const journal = await createJournal(content);
            setJournals([...journals, journal]);
            const updatedEntries = [...newEntries];
            if (index < prompts.length) {
                updatedEntries[index] = '';
            }
            setNewEntries(updatedEntries);
        } catch (err) {
            console.error('Failed to create journal entry');
        }
        setModalContent(null); 
    };

    const handleDeleteJournal = async (id: string) => {
        try {
            await deleteJournal(id);
            setJournals(journals.filter((journal) => journal._id !== id));
        } catch (err) {
            console.error('Failed to delete journal entry');
        }
        setModalContent(null); 
    };

    const openModal = (content: string, index: number) => {
        setModalContent({ content, index });
    };

    const closeModal = () => {
        setModalContent(null);
    };

    useEffect(() => {
        loadJournals();
    }, []);

    return (
        <>
            <nav className="dashboard-top-nav">
                <Link to="/Meditation" className="nav-link">Meditation</Link>
                <Link to="/Dashboard" className="nav-link">Dashboard</Link>
                <button onClick={handleLogout} className="nav-button">Logout</button>
            </nav>

            <h1 className="h1-journal">How do you feel today?</h1>

            <div className="journal-container">
              
                {prompts.map((prompt, index) => (
                    <div key={index} className="journal-entry">
                        <div className="journal-title" onClick={() => openModal(newEntries[index], index)}>
                            <span>{prompt}</span>
                            <button className="write-icon">✏️</button>
                        </div>
                    </div>
                ))}

           
                <h1 className="h1-journal">Previous journal notes</h1>
                <div className="journal-entries">
                    {journals.map((journal, index) => (
                        <div
                            key={journal._id}
                            className="journal-entry-minimized"
                            onClick={() => openModal(journal.content, prompts.length + index)}
                        >
                            <p>{journal.content.slice(0, 20)}...</p>
                            <small>{new Date(journal.createdAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            </div>

            {modalContent && (
                <div className="modal">
                    <div className="modal-content">
                        <textarea
                            className="text-area-journal"
                            value={modalContent.content}
                            onChange={(e) => setModalContent({ ...modalContent, content: e.target.value })}
                            placeholder={
                                modalContent.index < prompts.length
                                    ? prompts[modalContent.index]
                                    : "Edit your journal entry"
                            }
                        />
                        <button onClick={closeModal}>Close</button>
                        <button onClick={() => handleAddJournal(modalContent.index)}>Save</button>

                        {modalContent.index >= prompts.length && (
                            <button
                                onClick={() => handleDeleteJournal(journals[modalContent.index - prompts.length]._id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default JournalPage;
