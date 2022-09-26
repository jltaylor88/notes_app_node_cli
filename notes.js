const fs = require("fs");

const getNotes = () => {
	let notes = [];
	if (fs.existsSync("notes.json")) {
		const dataBuffer = fs.readFileSync("notes.json");
		const notesJSON = dataBuffer.toString();
		notes = JSON.parse(notesJSON);
	}
	return notes;
};

const addNote = (title, body) => {
	const notes = getNotes();

	notes.push({ title, body });
	const newNotesJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", newNotesJSON);
};

const removeNote = () => {};

module.exports = { addNote, getNotes };

