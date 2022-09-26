const chalk = require("chalk");
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
	const duplicateNote = notes.find(n => n.title === title);

	if (!duplicateNote) {
		notes.push({ title, body });
		saveNotes(notes);
		console.log(chalk.bgGreen("New note added!"));
	} else {
		console.log(chalk.bgRed("Note title already taken!"));
	}
};

const removeNote = title => {
	const notes = getNotes();
	const newNotes = notes.filter(n => n.title !== title);
	if (notes.length === newNotes.length) {
		console.log(
			chalk.bgRed(
				"No message with that title was found so no notes were removed from notes.json"
			)
		);
	} else {
		saveNotes(newNotes);
		console.log(
			chalk.bgGreen(`Successfully removed the note with a title of: ${title}`)
		);
	}
};

const updateNote = (title, payload) => {
	const notes = getNotes();
	const noteToChangeIndex = notes.findIndex(n => n.title === title);
	if (noteToChangeIndex < 0) {
		console.log(
			chalk.bgRed(`No notes with a title of '${title}' could be found.`)
		);
	} else {
		let note = notes[noteToChangeIndex];
		note = {
			title: payload.title || note.title,
			body: payload.body || note.body,
		};

		notes[noteToChangeIndex] = note;

		saveNotes(notes);

		console.log(chalk.bgGreen("Successfully updated task"));
	}
};

const listNotes = () => {
	const notes = getNotes();
	console.log(chalk.bgGreen("Your notes: "));
	notes.forEach(n => {
		console.log(n.title);
	});
};

const readNote = title => {
	const notes = getNotes();
	const note = notes.find(n => n.title === title);
	if (!note) {
		console.log(chalk.bgRed("No note with that title could be found"));
	} else {
		console.log(chalk.bgGreen(`Title: ${note.title}`));
		console.log(chalk.bgGreen(`Body: ${note.body}`));
	}
};

module.exports = {
	addNote,
	getNotes,
	listNotes,
	readNote,
	removeNote,
	updateNote,
};

