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

var insert = () =>{
  try {
    var notesString = `{"Instruments": ${fs.readFileSync('notes-data.json')},
    "Instructions":
  [
    {
      "filename": "StartScreen",
      "audiocontent": "Welcome to A R Craft Academy!"
    },
    {
      "filename": "AnchorWindow",
      "audiocontent": "Find some open space. A R Craft Academy uses reference points on the ground to determine your position relative to the cockpit. Environments with high amounts of contrast or visual texture tend to perform better. After pressing the start button, you can begin to scan the floor in front of you."
    },
    {
      "filename": "PostAnchorWindow",
      "audiocontent": "Use motions like those indicated in the visual. When all three anchors light up, tap the screen to proceed. "
    },
    {
      "filename": "RebuildTutoial",
      "audiocontent": "Now that you have found all your anchors, you can press the build button to place the cockpit. You can press this button again at any time to move the cockpit to your current position."
    },
    {
      "filename": "SelectScreen",
      "audiocontent": "Select your plane and press the button when you are ready to proceed."
    },
    {
      "filename": "SelectionTutorial",
      "audiocontent": "First, tap the highlighted instrument to select it. This will summon the information tray with an overview of the part as well as a narration providing additional detail. Press the play button to begin the narration or tap read more to gain additional information about this instrument."
    },
    {
      "filename": "PostSelectionIntructions",
      "audiocontent": "You can select any instrument in the cockpit to re-summon the tray with new information about that instrument. When you're ready, you can step into a guided lesson where you can learn a simplified version of the engine startup procedures. "
    },
    {
      "filename": "LearningInstruction",
      "audiocontent": "Press the button in the bottom right to begin the lesson. As the lesson proceeds, you will be told to check different instruments. Tap the highlighted instrument to do so. Press the main button to restart the lesson at any time."
    },
    {
      "filename": "Learn1",
      "audiocontent": "First, you'll need to move the P C L into the Start position. You'll observe that the Start Ready indicator on the Central Warning System will light up."
    },
    {
      "filename": "Learn2",
      "audiocontent": "Next, press the starter switch on the propulsion console. The Boost Pump and Ignition indicators on the Central Warning System will also light up."
    },
    {
      "filename": "Learn3",
      "audiocontent": "After pressing the starter switch, observe the Engine Systems N A C W S Display, or E N S D, for changes in the battery voltage and amperage. Additionally, you should observe increases in oil and hydraulic pressure."
    },
    {
      "filename": "Learn4",
      "audiocontent": "Check the Alternate Engine Data Display, or A E D D, to ensure fuel flow."
    },
    {
      "filename": "Learn5",
      "audiocontent": "Now, observe the Primary Engine Data Display to ensure that the Internal Turbine Temperature does not exceed the maximum operating threshold."
    },
    {
      "filename": "Learn6",
      "audiocontent": "Having completed these checks, you can now move the P C L into the idle position and complete the engine startup sequence."
    },
    {
      "filename": "PostLearning",
      "audiocontent": "Congratulations on completing your first engine startup. Now that you have learned the engine startup sequence, it's time to put your knowledge to the test. Press the main button when you're ready."
    },
    {
      "filename": "TestingInstruction",
      "audiocontent": "Tap the instruments in the same order as you did in the previous lesson. There won't be any guidance, but if you get stuck, you can always use the main button to restart the test. As a reminder, the order for the engine startup sequence is P C L, starter switch, E N S D, A E D D, P E D D, and finally the P C L again. When you’re ready, press the button in the bottom right to begin. Good luck!"
    },
    {
      "filename": "PostTest",
      "audiocontent": "Congratulations on completing the startup sequence. You should see your score above. Use the main button to return to Explore Mode. You can continue to learn about additional instruments, or repeat the lesson and test sequence again if desired."
    }
  ]
}`;
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
  insert,
  update
};
