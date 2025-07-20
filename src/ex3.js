#! /usr/bin/env node

"use strict";

//import * as util from 'util';
//import * as path from 'path';
//import * as fs from 'fs';

//import path from 'path';

//import fs from 'fs';

const fs = require("fs");
const path = require("node:path");
var Transform = require("stream").Transform;
var zlib = require("zlib");

//import * as minimist from 'minimist';
//import minimist from 'minimist';

var args = require("minimist")(process.argv.splice(2), {
        boolean: ["help", "in", "out", "compress", "uncompress"], string: ["file"]
    });

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

var OUTFILE = path.join(BASE_PATH, "out.txt");


if (process.env.HELLO) {
    console.log(process.env.HELLO)
}


console.log("Args: ", args);


if (args.help) {
    printHelp();
}
else if (args.in || args._.includes("-") ) {
    processFile(process.stdin);
}
else if (args.file) {
    let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
    processFile(stream);
}
else {
    error("Incorrect usage", true);
}

function processFile(inStream) {
    var outStream = inStream;

    if (args.uncompress) {
        let gunzipStream = zlib.createGunzip();
        outStream = outStream.pipe(gunzipStream);
    }

    var upperStream = new Transform({
        transform(chunk, enc, cb) {
            this.push(chunk.toString().toUpperCase());
            cb();
        }
    });

    outStream = outStream.pipe(upperStream);

    if (args.compress) {
        let gzipStream = zlib.createGzip();
        outStream = outStream.pipe(gzipStream);
        OUTFILE = `${OUTFILE}.gz`
        //OUTFILE = ${OUTFILE};
    }

    var targetStream;
    if (args.out) {
        targetStream = process.stdout;
    }
    else {
        targetStream = fs.createWriteStream(OUTFILE);
    }

    outStream.pipe(targetStream);
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
    console.log("--in, -                   process stdin");
    console.log("--out, -                  process stdout");
    console.log("--compress,               gzip the output");
    console.log("--uncompress,             un-gzip the input");
    console.log("");
}


//./ex3.js --hello=world
//./ex3.js --hello=world -c9 - foobar
// Args:  { _: [ '-', 'foobar' ], hello: 'world', c: 9 }
// first part above is called the overflow, parts minimist doesn't know how to handle

//./ex3.js --help=foobar
//./ex3.js --help=foobar --file
