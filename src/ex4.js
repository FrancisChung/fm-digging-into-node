#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var fs = require("fs");

var sqlite3 = require("sqlite3");
// require("console.table");


// ************************************

const DB_PATH = path.join(__dirname,"my.db");
const DB_SQL_PATH = path.join(__dirname,"mydb.sql");

var args = require("minimist")(process.argv.slice(2),{
    string: ["other",],
});

main().catch(console.error);