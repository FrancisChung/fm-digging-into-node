#! /usr/bin/env node

"use strict";

import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import getStdin from "get-stdin";
//import * as minimist from 'minimist';
import minimist from 'minimist';

var args = minimist(process.argv.splice(2), {
        boolean: ["help", "in"], string: ["file"]
    });

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

if (process.env.HELLO) {
    console.log(process.env.HELLO)
}


console.log("Args: ", args);


if (args.help) {
    printHelp();
}
else if (args.in || args._.includes("-") ) {
    getStdin().then(processFile).catch(error);
}
else if (args.file) {
    //var contents = fs.readFileSync(filepath);
    fs.readFile(path.join(BASE_PATH, args.file), function onContents(err, contents) {
        if (err) {
            error(err.toString());
        }
        else {
            processFile(contents.toString());
        }
    });
}
else {
    error("Incorrect usage", true);
}

function processFile(contents) {
    contents = contents.toUpperCase();
    process.stdout.write(contents);
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.error("");
        printHelp();
    }
}

function printHelp() {
    console.log("ex3 usage:");
    console.log("  ex3.js --help");
    console.log("");
    console.log("--help                    print this help");
    console.log("--file={FILENAME}         process the file");
    console.log("--in=, -                  process stdin");
    console.log("");
}


//./ex3.js --hello=world
//./ex3.js --hello=world -c9 - foobar
// Args:  { _: [ '-', 'foobar' ], hello: 'world', c: 9 }
// first part above is called the overflow, parts minimist doesn't know how to handle

//./ex3.js --help=foobar
//./ex3.js --help=foobar --file
