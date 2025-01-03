
const Journal = require('../models/journal');
const jwt = require('jsonwebtoken');

const getJournals = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'error' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Search for journal where userID matches logged in users id
        const journals = await Journal.find({ userId: decoded.id });
        
        res.status(200).json(journals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch journals' });
    }
};

const addJournal = async (req, res) => {
    try {
        //token from users cookie identifies currently logged in user
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'error' });
        
        //decode token jwt.verify, extracts user id. 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        const { content } = req.body;

        //creating newjournal, userid field is set to logged in user (decoded.id)
        const newJournal = new Journal({
            userId: decoded.id,
            content,
        });
   
        

        await newJournal.save();



        res.status(201).json(newJournal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add journal entry' });
    }
};

const deleteJournal = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'error' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const journal = await Journal.findById(req.params.id);

        if (!journal || journal.userId.toString() !== decoded.id) {
            return res.status(403).json({ error: 'Cannot delete this entry' });
        }

        await Journal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Journal entry deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete journal entry' });
    }
};

module.exports = {
    getJournals,
    addJournal,
    deleteJournal,
};
