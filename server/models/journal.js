
const mongoose = require('mongoose');
const { Schema } = mongoose;

const journalSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const JournalModel = mongoose.model('Journal', journalSchema);

module.exports = JournalModel;