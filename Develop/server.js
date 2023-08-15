const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const { getNotes, saveNote, deleteNote } = require('./public/assets/js/apiRoutes');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', getNotes);
app.post('/api/notes', saveNote);
app.delete('/api/notes/:id', deleteNote);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});