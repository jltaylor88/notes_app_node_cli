#!/usr/bin/env node
const chalk = require("chalk");
const y = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const {
	addNote,
	listNotes,
	removeNote,
	updateNote,
	readNote,
} = require("./notes");
const yargs = y(hideBin(process.argv));

// Customise yargs version
yargs.version("1.1.0");

// Create add command
yargs.command(
	"add",
	"Add a new note",
	y => {
		return y.options({
			title: {
				alias: "t",
				description: "The title of the note to add",
				type: "string",
				demandOption: true,
			},
			body: {
				alias: "b",
				description: "The body of the note to add",
				type: "string",
				demandOption: true,
			},
		});
	},
	argv => {
		addNote(argv.title, argv.body);
	}
);

// Create remove command
yargs.command(
	"remove",
	"Remove a note",
	y => {
		return y.options({
			title: {
				alias: "t",
				description: "The title of the note to remove",
				type: "string",
				demandOptio: true,
			},
		});
	},
	argv => {
		removeNote(argv.title);
	}
);

// Create list command
yargs.command(
	"list",
	"List the notes",
	() => {},
	() => {
		listNotes();
	}
);

// Create read command
yargs.command(
	"read",
	"Read a note",
	y => {
		return y.options({
			title: {
				alias: "t",
				description: "The title of the note to read",
				type: "string",
				demand: true,
			},
		});
	},
	argv => {
		readNote(argv.title);
	}
);

// Update a note
yargs.command(
	"update",
	"Update an existing note",
	y => {
		return y.options({
			title: {
				alias: "t",
				description: "The original title of the note",
				demandOption: true,
				type: "string",
			},
			newTitle: {
				alias: "nt",
				description: "The new title of the note",
				demandOption: false,
				type: "string",
			},
			newBody: {
				alias: "nb",
				description: "The new note body",
				demandOption: false,
				type: "string",
			},
		});
	},
	args => updateNote(args.title, { title: args.newTitle, body: args.newBody })
);

yargs.parse();

