const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');

const PORT = process.env.PORt || 3001;
const app = express();


// GET /api/notes API route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// GET /notes html route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// GET * html route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/assets/index.html'));
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
    req.body.ide = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});

