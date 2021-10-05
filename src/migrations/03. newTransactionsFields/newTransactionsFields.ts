/* 
  * MIGRATION 3
  * Se presupune ca asta trebuie sa adaug niste campuri noi pe Transactions:
    - initiatorDiscordUsername
    - initiatorDiscordUserId
    - receiverDiscordUsername
    - receiverDiscordUserId
  * Trebuie sa sterg:
    - fromDiscordUserId
    - fromDiscordUsername
*/
import { TestTransaction, GokuTransactions } from "../../models";
import { APP_ENV } from "yosoybotDB";

export const transactionsInitReceiver =  (appMode: APP_ENV | string | undefined, callback: () => any): void => {
    if (appMode === "local") {
        TestTransaction.updateMany({}, { 
            $set: { initiatorDiscordUsername: "N/A", initiatorDiscordUserId: "N/A", receiverDiscordUsername: "N/A", receiverDiscordUserId: "N/A" },
            $unset: { "fromDiscordUserId": "", "fromDiscordUsername": "" }
        }, {strict: false }, (err, success) => {
            if (err) {
				console.log("eroare la migration local", err);
				callback();
			}
		
			if(success) {
				console.log("succes la migration local", success);
				callback();
			}
        })
    } else if (appMode === "production") {
        GokuTransactions.updateMany({}, { 
            $set: { initiatorDiscordUsername: "N/A", initiatorDiscordUserId: "N/A", receiverDiscordUsername: "N/A", receiverDiscordUserId: "N/A" },
            $unset: { "fromDiscordUserId": "", "fromDiscordUsername": "" }
        }, {strict: false }, (err, success) => {
            if (err) {
				console.log("eroare la migration local", err);
				callback();
			}
		
			if(success) {
				console.log("succes la migration local", success);
				callback();
			}
        })
    } else {
        console.log("APP mode undefined"); 
    }
}