declare module "yosoyDB-mongoose" {
    import { Document } from "mongoose";
    import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "yosoybotDB";

    /**
     * Cum o sa arate o tranzactie in baza de date pentru fiecare user
     * @property {string} reason
     * @property {number} cost
     * @property {string} discordUserID
     * @property {string} initiatorDiscordUsername
     * @property {string} initiatorDiscordUserId
     * @property {string} receiverDiscordUserId
     * @property {string} receiverDiscordUsername
     * @property {TRANSACTION_STATUS} status
     * @property {TRANSACTION_TYPE} type
    */
    interface IUserTransaction {
        /** de ce se face tranzactia asta */
        reason: string;
        /** cat costa tranzactia respectiva */
        cost: number;
        /** id-ul de discord al persoanei careia ii apartine tranzactia */
        discordUserId: string;
        /** username-ul persoanel care a initiat tranzactia */
        initiatorDiscordUsername: string;
        /** id-ul de discord al persoanei care initiaza tranzactia */
        initiatorDiscordUserId: string;
        /** id-ul de discord al persoanei care primeste tranzactia */
        receiverDiscordUserId: string;
        /** username-ul de discord al persoanei care initiaza tranzactia */
        receiverDiscordUsername: string;
        /** daca tranzactia a esuat sau a fost acceptata */
        status: TRANSACTION_STATUS;
        /** daca userul da sau primeste bani */
        type: TRANSACTION_TYPE;
    }

    /** extinde IUserTransaction si mongoose Document */
    interface IUserTransactionMongoose extends IUserTransaction, Document {}

    /** 
     * asa o sa arate fiecare quote adaugat in baza de date pt fiecare user
     * @property {string} content - text content
     * @property {string} author - discord user id
    */
    interface IComment {
        /** textul zicalei */
        content: string;
        /** id-ul de discord al persoanei care a scris acea treaba */
        author: string;
    }

    /** extinde IComment si mongoose Document */
    interface ICommentMongoose extends IComment, Document {}
    
    /**
     * Asa arata un user stocat in baza de date. Pentru ca vreau sa adaug si referinte, dupa ce creez modelul Mongoose, o sa aiba inca 2 proprietati
     * @property {string} discordServerId - id-ul serverului/guildei
     * @property {string} discordUserId - id-ul de discord al userului
     * @property {string} discordUsername - username folosit pe discord
     * @property {number} rublerts - cati bani are respectivul user
     * @property {commentsID[]} - o sa fie un array cu id-urile fiecarui comentariu ce apartine respectivului user
     * @property {transactionsID[]} - o sa fie un array cu id-urile fiecarui tranzactii ce apartine respectivului user 
     */
    interface IUser {
        discordServerId: string;
        discordUserId: string;
        discordUsername: string;
        rublerts: number;
    }

    /** extinde IUser si mongoose Document */
    interface IUserMongoose extends IUser, Document {
        comments: [ICommentMongoose["_id"]];
        transactions: [IUserTransactionMongoose["_id"]];
    }
}