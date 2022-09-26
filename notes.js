const fs = require("fs");

const saveNotes = notes => {
	const newNotesJSON = notes.length === 0 ? "" : JSON.stringify(notes);
	fs.writeFileSync("notes.json", newNotesJSON);
};

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
	saveNotes(notes);
};

const removeNote = title => {
	const notes = getNotes();
	const newNotes = notes.filter(n => n.title !== title);
	if (notes.length === newNotes.length) {
		console.warn(
			"No message with that title was found so no notes were removed from notes.json"
		);
	}

	saveNotes(newNotes);
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

	saveNotes(notes);
};

const listNotes = () => {
	return getNotes();
};

const readNote = title => {
	const notes = getNotes();
	const note = notes.find(n => n.title === title);
	if (!note) {
		console.warn("No note with that title could be found");
		return;
	}

	return note;
};

module.exports = {
	addNote,
	getNotes,
	listNotes,
	readNote,
	removeNote,
	updateNote,
};

