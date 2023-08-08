let notes = [
  { id: 1, title: 'Note 1', text: 'This is note 1.' },
  { id: 2, title: 'Note 2', text: 'This is note 2.' },
];

const getNotes = (req, res) => {
  res.json(notes);
};

let nextNoteId = 1;

const saveNote = (req, res) => {
  const newNote = {
    id: nextNoteId++,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  res.json(newNote);
};

const deleteNote = (req, res) => {
  const noteId = req.params.id;
  // Delete note logic here
  res.json({ message: 'Note deleted successfully!' });
};

module.exports = { getNotes, saveNote, deleteNote };