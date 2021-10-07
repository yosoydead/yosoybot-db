import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import fs from "fs";
import { APP_ENV } from "yosoybotDB";

function sleep(time: number, callback: () => void) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {}
    callback();
}
const env: APP_ENV | undefined | string = process.env.NODE_ENV;

(async function () {
    try {
        const migrationsFilePath: string = path.normalize(path.resolve('./migrationsHistory.json'));
        const migrationsFolderPath: string = path.normalize(path.resolve("./build/migrations"));

        const migrationsFile = JSON.parse(fs.readFileSync(migrationsFilePath).toString());
        const migrationsFolderStructure = fs.readdirSync(migrationsFolderPath);
        await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@yosoybotdb.fsga3.mongodb.net/<dbname>?retryWrites=true&w=majority`,
			{ useNewUrlParser: true, useUnifiedTopology: true }
		);

        for(let i = 0; i < migrationsFolderStructure.length; i++) {
            const migrationFolder = migrationsFolderStructure[i];
            if (migrationsFile[migrationFolder] === false) {
                /* an facut asa pentru ca nu puteam sa pasez ${env} direct
                    pur si simplu urla pentru ReferenceError
                */
                if(env === "local") {
                    eval(`
                        var x = require("./migrations");
                        x.${migrationFolder.split(" ")[1]}("local");
                    `);
                } else if (env === "production") {
                    eval(`
                        var x = require("./migrations");
                        x.${migrationFolder.split(" ")[1]}("production");
                    `);
                } else {
                    throw new Error("Din ceva motive, nu am putut sa iau app mode");
                }
            }
        }
        sleep(5000, () => { console.log("am terminat migratia.") });
    } catch (err) {
        console.log("Am primit ceva eroare. Ori nu m-am conectat la baza de date, ori o migratie a crapat.", err);
    } finally {
        console.log("finally");
        await mongoose.disconnect();
    }
})();