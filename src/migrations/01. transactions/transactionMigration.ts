/* 
  * MIGRATION 1
  * Se presupune ca asta trebuie sa adauge pentru colectia Users pe dev/prod urmatorul camp: transactions ARRAY
  * O tranzactie trebuie sa contina urmatoarele proprietati:
    - reason: de ce a avut loc tranzactia
    - cost: cati bani au fost luati/adaugati
    - discordUserId: cui ii apartine tranzactia
*/
import { TestUser, GokuUser } from "../../models";
import { APP_ENV } from "yosoybotDB";

export const migrate = (appMode: APP_ENV | string | undefined, callback: () => any): void => {
	if (appMode === "local") {
		TestUser.updateMany({}, { $set: { transactions: [] }}, null, (err, success) => {
			if (err) {
				console.log("eroare la migration local", err);
				callback();
			}
		
			if(success) {
				console.log("succes la migration local", success);
				callback();
			}
		});
	} else if (appMode === "production") {
		GokuUser.updateMany({}, { $set: { transactions: [] }}, null, (err, success) => {
			if (err) {
				console.log("eroare la migration prod", err);
				callback();
			}
		
			if(success) {
				console.log("succes la migration prod", success);
				callback();
			}
		});
	} else {
		console.log("APP mode undefined");
	}
};

