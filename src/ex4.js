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


// ************************************

var SQL3;

async function main() {
    if (!args.other) {
        error("Missing '--other=..'");
        return;
    }

    // define some SQLite3 database helpers
    var myDB = new sqlite3.Database(DB_PATH);
    SQL3 = {
        run(...args) {
            return new Promise(function c(resolve,reject){
                myDB.run(...args,function onResult(err){
                    if (err) reject(err);
                    else resolve(this);
                });
            });
        },
        get: util.promisify(myDB.get.bind(myDB)),
        all: util.promisify(myDB.all.bind(myDB)),
        exec: util.promisify(myDB.exec.bind(myDB)),
    };

    var initSQL = fs.readFileSync(DB_SQL_PATH,"utf-8");
    await SQL3.exec(initSQL);


    var other = args.other;
    var something = Math.trunc(Math.random() * 1E9);

    // ***********
    var otherId = await getOrInsertOtherID(other)
    //var otherId = await insertOrLookupOther(other);
    if (otherId) {
        // let result = await insertSomething(otherId, something);
        // if (result) {
        //     console.log("Successfully inserted!");
        //     return;
        // }
    }

    error("Oops!");
}

function error(err) {
    if (err) {
        console.error(err.toString());
        console.log("");
    }
}

async function insertOrLookupOther(other) {
    var result = await SQL3.get(
        `SELECT
            id
        FROM
            Other
        WHERE
            data = ?
        `,
        other
    );

    if (result && result.id) {
        return result.id;
    }
    else {
        result = await SQL3.run(`
            INSERT INTO
                Other (data)
            VALUES
                ?
            `,
            other
        );
        if (result && result.lastID) {
            return result.lastID;
        }
    }

}

async function getOrInsertOtherID(other) {
    var result = await SQL3.get(
        `
		SELECT
			id
		FROM
			Other
		WHERE
			data = ?
		`,
        other
    );

    if (result != null) {
        return result.id;
    }
    else {
        result = await SQL3.run(
            `
			INSERT INTO
				Other
			(data)
			VALUES
				(?)
			`,
            other
        );

        if (
            result != null &&
            result.changes > 0
        ) {
            return result.lastID;
        }
    }
}

async function insertSomething(otherId, something) {
    var result = await SQL3.run(`
            INSERT INTO
                Something (otherId, data)
            VALUES
                (?, ?)
            `,
        otherId,
        something
    );

    if (result && result.changes > 0)
        return true;

    return false;
}
