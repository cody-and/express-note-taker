const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNotesFromFile = () => {
  const data = fs.readFileSync('./db.json', 'utf8');
  return JSON.parse(data);
};

const writeNotesToFile = (notes) => {
  fs.writeFileSync('./db.json', JSON.stringify(notes), 'utf8');
};

const getNotes = (req, res) => {
  const notes = readNotesFromFile();
  res.json(notes);
};

const saveNote = (req, res) => {
  try {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    
    const notes = readNotesFromFile();
    notes.push(newNote);
    
    writeNotesToFile(notes);
    
    res.json(newNote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Failed to save note.' });
  }
};

const deleteNote = (req, res) => {
  const noteId = req.params.id;
  let notes = readNotesFromFile();
  notes = notes.filter((note) => note.id !== noteId);
  writeNotesToFile(notes);
  res.json({ message: 'Note deleted successfully!' });
};

module.exports = { getNotes, saveNote, deleteNote };