const fs = require("fs");

const getNotes = () => {
	const dataBuffer = fs.readFileSync("notes.json");
	return dataBuffer.toString();
};

const addNote = (title, body) => {
	let notes = [];
	if (fs.existsSync("notes.json")) {
		notes = JSON.parse(getNotes());
	}

	notes.push({ title, body });
	const newNotesJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", newNotesJSON);
};

module.exports = { addNote, getNotes };

