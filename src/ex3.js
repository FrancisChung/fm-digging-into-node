#! /usr/bin/env node

"use strict";

var args = require("minimist")(process.argv.splice(2));
console.log("Args: ", args);
//console.log(process.argv.slice(2));



printHelp();

function printHelp() {
    console.log("ex3 usuage:");
    console.log("  ex3.js --help");
    console.log("");
    console.log("--help         print this help");
    console.log("");
}

//./ex3.js --hello=world
//./ex3.js --hello=world -c9 - foobar
// Args:  { _: [ '-', 'foobar' ], hello: 'world', c: 9 }
// first part above is called the overflow, parts minimist doesn't know how to handle