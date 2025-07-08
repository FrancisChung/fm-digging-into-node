#! /usr/bin/env node

"use strict";

console.log(process.argv.slice(2));


printHelp();

function printHelp() {
    console.log("ex3 usuage:");
    console.log("  ex3.js --help");
    console.log("");
    console.log("--help         print this help");
    console.log("");
}

//./ex3.js --hello=world
