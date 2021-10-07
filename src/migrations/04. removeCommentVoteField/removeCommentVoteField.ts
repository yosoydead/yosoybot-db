/*
    * Template generated by script
    * Migration 4
        - nu folosesc deloc campul de votes asa ca vreau sa il sterg
*/
import { TestComment, GokuComment } from "../../models";
import { APP_ENV } from "yosoybotDB";

export const removeCommentVoteField = (appMode: APP_ENV | string | undefined, callback: () => any): void => {
    if (appMode === "local") {
        console.log("local migration");
        TestComment.updateMany({}, { 
            $unset: { "votes": "" }
        }, { strict: false }, (err, success) => {
            if (err) {
				console.log("eroare la migration local", err);
				// callback();
			}
		
			if(success) {
				console.log("succes la migration local", success);
				// callback();
			}
        });
    } else if (appMode === "production") {
        console.log("production migration");
        GokuComment.updateMany({}, { 
            $unset: { "votes": "" }
        }, { strict: false }, (err, success) => {
            if (err) {
				console.log("eroare la migration local", err);
				// callback();
			}
		
			if(success) {
				console.log("succes la migration local", success);
				// callback();
			}
        });
    }
};
