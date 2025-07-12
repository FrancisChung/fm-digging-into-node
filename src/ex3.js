#! /usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var fs = require("fs");
var getStdin = import("get-stdin");

var args = require("minimist")(process.argv.splice(2), {
        boolean: ["help", "in"], string: ["file"]
    }
);


console.log("Args: ", args);
//console.log(process.argv.slice(2));


if (args.help) {
    printHelp();
}
else if (args.in || args._.includes("-") ) {
    getStdin().then(processFile).catch(error);
}
else if (args.file) {
    //var contents = fs.readFileSync(filepath);
    fs.readFile(args.file, function onContents(err, contents) {
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
    console.log("ex3 usuage:");
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
