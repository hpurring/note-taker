const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./Develop/db/db.json');


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
// GET * html route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// GET /api/notes API route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length;
    // come up with random generator for above, otherwise deleting will mess this up
    const note = createNewNote(req.body, notes);
    res.json(note);
    // if (!validateNote(req.body)) {
    //     res.status(400).send('The note is not properly formatted');
    // } else {
        
    // }
});

app.listen(3001, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
};