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

        // -1 pentru ca am un fisier de index.ts pe care il citeste in migrationsFolderStructure.length
        for(let i = 0; i < migrationsFolderStructure.length - 1; i++) {
            const migrationFolder = migrationsFolderStructure[i];
            if (env === "local" && migrationsFile[migrationFolder]["local"] === false) {
                /* an facut asa pentru ca nu puteam sa pasez ${env} direct
                    pur si simplu urla pentru ReferenceError
                */
                eval(`
                    var x = require("./migrations");
                    x.${migrationFolder.split(" ")[1]}("local");
                `);
                migrationsFile[migrationFolder]["local"] = true;
            }
            if (env === "production" && migrationsFile[migrationFolder]["production"] === false) {
                eval(`
                    var x = require("./migrations");
                    x.${migrationFolder.split(" ")[1]}("production");
                `);
                migrationsFile[migrationFolder]["production"] = true;
            }
        }

        // din cauza chestiei cu eval, nu am putut sa dau un callback ca lumea
        // inchid conexiunea dupa ceva timp. 30 secunde ar fi suficient timp pentru
            // marimea serverului si ale datelor pe care le stocheaza
        fs.writeFileSync(migrationsFilePath, JSON.stringify(migrationsFile));        
        sleep(30000, () => { console.log("am terminat migratia.") });
        await mongoose.disconnect(() => {
            console.log("am inchis conexiunea");
        });
    } catch (err) {
        console.log("Am primit ceva eroare. Ori nu m-am conectat la baza de date, ori o migratie a crapat.", err);
    }
})();