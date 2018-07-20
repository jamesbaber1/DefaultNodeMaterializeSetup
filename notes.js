const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (filename, title, textshort, textdetail) => {
  var notes = fetchNotes();
  var audiocontent = textshort;
  var note = {
    filename,
    audiocontent,
    title,
    textshort,
    textdetail
  };
  var duplicateNotes = notes.filter((note) => note.filename === filename);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (filename) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.filename === filename);
  return filteredNotes[0];
};

var removeNote = (filename) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.filename !== filename);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.textshort}`);
};

var update = (filename, title, textshort, textdetail)=>{
  removeNote(filename);
  addNote(filename, title, textshort, textdetail);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
  update
};
