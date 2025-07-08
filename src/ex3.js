#! /usr/bin/env node

"use strict";

var path = require("path");
var fs = require("fs");
var args = require("minimist")(process.argv.splice(2), {
        boolean: ["help"], string: ["file"]
    }
);


console.log("Args: ", args);
//console.log(process.argv.slice(2));


if (args.help) {
    printHelp();
}
else if (args.file) {
    let filePath = path.resolve(args.file);
    console.log("dir: ", __dirname);
    console.log("filePath: ", filePath);
    processFile(filePath);
}
else {
    error("Incorrect usage", true);
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.error("");
        printHelp();
    }
}

function printHelp() {
    console.log("ex3 usuage:");
    console.log("  ex3.js --help");
    console.log("");
    console.log("--help         print this help");
    console.log("--file={FILENAME}         print this help");
    console.log("");
}

function processFile(filepath) {
    //var contents = fs.readFileSync(filepath);
    var contents = fs.readFileSync(filepath, "utf8");
    console.log(contents);
    //process.stdout.write(contents);
}

//./ex3.js --hello=world
//./ex3.js --hello=world -c9 - foobar
// Args:  { _: [ '-', 'foobar' ], hello: 'world', c: 9 }
// first part above is called the overflow, parts minimist doesn't know how to handle

//./ex3.js --help=foobar
//./ex3.js --help=foobar --file
