# Meditation App

A web application for guided meditation with Spotify and YouTube integrations. Built with React, Node.js, Express, and MongoDB Atlas.

## Features
- User authentication (login/logout)
- Personalized morning/evening meditation playlists
- Integration with Spotify and YouTube
- Journal for tracking daily meditation practices
- content that changes based on if the user is logged in during morning/evening

## Technologies Used
- Frontend: React, React Router, SCSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas


## Prerequisites
- Node.js (v16 or above)
- MongoDB Atlas account and connection string
- Spotify Developer Account (optional, for API keys)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/meditation-app.git
   cd meditation-app
   npm install

## in .env make sure to add mongodb setup

MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your-secret-key

Link to setup: [mongoDB atlas setup](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)

For server side: npm start
Client: npm run dev





