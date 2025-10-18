"use strict";

var fetch = require("node-fetch");


// ************************************

const HTTP_PORT = 8039;


main().catch(() => 1);


// ************************************

async function main() {
    try {
        var res = await fetch(`http://localhost:${HTTP_PORT}/get-records`);
        if (res && res.ok) {
            let records = await res.json();
            if (records && records.length > 0) {
                console.log("Records returned", records.length);
                process.exitCode = 0;
                return;
            }
        }
    }
    catch (err) {
        console.error(err);
        process.exitCode = 1;
    }

}
