const express = require('express');
const router = express.Router();
const { getJournals, addJournal, deleteJournal } = require('../controllers/journalController');

router.get('/', getJournals);

router.post('/', addJournal);


router.delete('/:id', deleteJournal);

module.exports = router;
