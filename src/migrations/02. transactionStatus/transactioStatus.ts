/* 
  * MIGRATION 2
  * Se presupune ca asta trebuie sa adaug un camp nou pe Transactions: status
  * O tranzactie trebuie sa contina urmatoarele proprietati:
    - reason: de ce a avut loc tranzactia
    - cost: cati bani au fost luati/adaugati
    - discordUserId: cui ii apartine tranzactia
    - NOU status: o sa fie successful/pending/rejected
*/
import { TestTransaction, GokuTransactions } from "../../models";
import { APP_ENV } from "../../types";

export const transactionStatus =  (appMode: APP_ENV | string | undefined, callback: () => any): void => {
    if (appMode === "local") {
        TestTransaction.updateMany({}, { $set: { status: "successful" }}, null, (err, success) => {
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
        GokuTransactions.updateMany({}, { $set: { status: "successful" }}, null, (err, success) => {
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