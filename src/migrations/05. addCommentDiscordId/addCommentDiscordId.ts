/*
    * Template generated by script
    * Vreau sa adaug functionalitatea de a sterge un comentariu stocat in baza de date
    * Mi-ar fi mult mai usor sa le sterg dupa comanda %removeQuote care s-ar folosi de
        * id-ul comentariului din discord
    * Migration 5
        - new field: commentDiscordId: string. default: ""
*/
import { TestComment, GokuComment } from "../../models";
import { APP_ENV } from "yosoybotDB";

export const addCommentDiscordId = (appMode: APP_ENV | string | undefined, callback: () => any): void => {
    if (appMode === "local") {
        console.log("local migration");
        TestComment.updateMany({}, { 
            $set: { "commentDiscordId": "" }
        }, { strict: false }, (err, success) => {
            if (err) {
				console.log("eroare la migration local", err);
			}
		
			if(success) {
				console.log("succes la migration local", success);
			}
        });
    } else if (appMode === "production") {
        console.log("production migration");
        GokuComment.updateMany({}, { 
            $set: { "commentDiscordId": "" }
        }, { strict: false }, (err, success) => {
            if (err) {
				console.log("eroare la migration local", err);
			}
		
			if(success) {
				console.log("succes la migration local", success);
			}
        });
    }
};
