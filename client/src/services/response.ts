import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', 
    withCredentials: true, 
});


export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('/register', { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

export const fetchAffirmations = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/affirmation'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching affirmations from server:', error);
        throw error;
    }
};



// journal
export const fetchJournals = async () => {
    try {
        const response = await api.get('/api/journals');
        return response.data;
    } catch (error) {
        console.error('Error fetching journals:', error);
        throw error;
    }
};

export const createJournal = async (content: string) => {
    try {
        const response = await api.post('/api/journals', { content });
        return response.data;
    } catch (error) {
        console.error('Error creating journal:', error);
        throw error;
    }
};

export const deleteJournal = async (id: string) => {
    try {
        const response = await api.delete(`/api/journals/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting journal:', error);
        throw error;
    }
};
