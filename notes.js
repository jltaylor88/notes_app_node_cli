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
	const duplicateNotes = notes.filter(n => n.title === title);

	if (duplicateNotes.length === 0) {
		notes.push({ title, body });
		saveNotes(notes);
		console.log("New note added!");
	} else {
		console.log("Note title already taken!");
	}
};

const removeNote = title => {
	const notes = getNotes();
	const newNotes = notes.filter(n => n.title !== title);
	if (notes.length === newNotes.length) {
		console.warn(
			"No message with that title was found so no notes were removed from notes.json"
		);
	} else {
		saveNotes(newNotes);
		console.log(`Successfully removed the note with a title of: ${title}`);
	}
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
	console.log(getNotes());
};

const readNote = title => {
	const notes = getNotes();
	const note = notes.find(n => n.title === title);
	if (!note) {
		console.warn("No note with that title could be found");
		return;
	}

	return console.log(note);
};

module.exports = {
	addNote,
	getNotes,
	listNotes,
	readNote,
	removeNote,
	updateNote,
};

