const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./Develop/db/db.json');
const { v4: uuidv4 } = require('uuid');
console.log(notes);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop/public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})
// GET /notes html route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// GET /api/notes API route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// GET * html route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    deleteNote(id, notes);
    res.json(req.body);
});


app.listen(`${PORT}`, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notes)
    );
    return note;
};

function deleteNote(id, notes) {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
        }
    };
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notes)
    );
};
