
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const app = express();
const cookieParser = require('cookie-parser')
const axios = require('axios');


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('database connected'))
.catch((err) => console.log('database not connected', err))


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use('/api/journals', require('./routes/journalRoutes'));




app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

app.get('/api/affirmation', async (req, res) => {
    try {
        const response = await axios.get('https://www.affirmations.dev/');
        res.status(200).json(response.data); 
    } catch (error) {
        console.error('Error fetching affirmation:', error);
        res.status(500).json({ error: 'Failed to fetch affirmation' });
    }
});

const port = 8000;
app.listen(port, () => console.log(`server is running on port${port}`))