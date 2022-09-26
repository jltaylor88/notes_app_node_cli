#!/usr/bin/env node
const chalk = require("chalk");
const y = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { addNote } = require("./notes");
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
	() => {
		console.log("Removing a note");
	}
);

// Create list command
yargs.command(
	"list",
	"List the notes",
	() => {},
	() => {
		console.log("Listing the notes");
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
	() => {
		console.log("Reading a note");
	}
);

yargs.parse();

