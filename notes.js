const fs = require("fs");

const getNotes = () => {
	let notes = [];
	if (fs.existsSync("notes.json")) {
		const dataBuffer = fs.readFileSync("notes.json");
		const notesJSON = dataBuffer.toString();

		notes = Boolean(notesJSON) ? JSON.parse(notesJSON) : notes;
	}
	return notes;
};

const addNote = (title, body) => {
	const notes = getNotes();
	notes.push({ title, body });
	const newNotesJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", newNotesJSON);
};

const removeNote = title => {
	const notes = getNotes();
	const newNotes = notes.filter(n => n.title !== title);
	if (notes.length === newNotes.length) {
		console.warn(
			"No message with that title was found so no notes were removed from notes.json"
		);
	}

	const newNotesJSON = newNotes.length === 0 ? "" : JSON.stringify(newNotes);
	fs.writeFileSync("notes.json", newNotesJSON);
};

const updateNote = (title, payload) => {
	const notes = getNotes();
	const noteToChangeIndex = notes.findIndex(n => n.title === title);
	if (noteToChangeIndex < 0) {
		console.error(`No notes with a title of ${title} could be found.`);
		return;
	}
	let note = notes[noteToChangeIndex];
	note = {
		title: payload.title || note.title,
		body: payload.body || note.body,
	};

	notes[noteToChangeIndex] = note;

	const newNotesJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", newNotesJSON);
};

module.exports = { addNote, getNotes, removeNote, updateNote };

