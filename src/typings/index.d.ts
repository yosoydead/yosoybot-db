declare module "yosoybotDB" {
    import { Request, Response, NextFunction } from "express";
    import { IComment, IUser, IUserTransaction, IUserMongoose } from "yosoyDB-mongoose";

    /** prin fiecare response, adaug un camp care indica daca requestul a bun sau nu */
    type RESPONSE_TYPE = "success" | "error";
    /** indic tipul tranzactiei, daca se dau bani sau se primesc bani */
    type TRANSACTION_TYPE = "give" | "receive";
    /** daca tranzactia a fost aprobata sau nu */
    type TRANSACTION_STATUS = "successful" | "pending" | "rejected";
    /** asta e folosit pentru functia utilitara care imi face rute si handlers */
    type API_OPERATIONS = "get" | "post" | "put" | "patch" | "delete";
    /** indic in ce stadiu se afla aplicatia */
    type APP_ENV = "local" | "production";

    /**
     * Asta e structura generala pentru fiecare response
     * @property {string} message - un simplu mesaj care sa aiba vreun inteles pentru actiune. De obicei, acel mesaj e folosit de bot sa dea reply
     * @property {number} statusCode - as fi vrut sa folosesc REST API codes. momentan, trimit doar 200/500
     * @property {RESPONSE_TYPE} status - adica success sau error
     * @property {any[]?} - un array care poate sa contina orice si nu e obligatoriu de trimis 
    */
    interface ICustomJsonResponse {
        message: string;
        statusCode: number;
        status: RESPONSE_TYPE;
        arrayOfStuff?: any;
    }

    /**
     * Interfata pentru o functie utilitara care imi creeaza rute + handlers
     * @property {string} url - ruta adica /x/test
     * @property {function} routeHandler - trebuie sa primeasca Request, Response, Next si un db client
     * @property {API_OPERATIONS} action - daca ruta e pt get/post/etc
     */
    interface ICustomRoute {
        url: string;
        routeHandler: (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => any;
        action: API_OPERATIONS;
    }

    interface IDbCommunication {
        appMode: APP_ENV;
        // comments related stuff
        addComment(content: string, authorID: string, commentDiscordId: string): Promise<ICustomJsonResponse>;
        addComments(comments: IComment[]): Promise<ICustomJsonResponse>;
        getRandomComment(): Promise<ICustomJsonResponse>;
        getComments(): Promise<ICustomJsonResponse>;
        removeComment(commentDiscordId: string): Promise<ICustomJsonResponse>;
      
        // users related stuff
        getUserData(discordUserId: string): Promise<ICustomJsonResponse>;
        getAllUsers(): Promise<ICustomJsonResponse>;
        getUserBank(discordUserId: string): Promise<ICustomJsonResponse>;
        getUsersBank(): Promise<ICustomJsonResponse>;
        addUser(user: IUser): Promise<ICustomJsonResponse>;
        //din varii motive, nu mergea sa folosesc IUser pentru ca modelul de mongoose are o referinta la ICommentMongoose
          //si avea tot felul de erori. cu IUserMongoose nu se mai plange
        addUsers(users: IUserMongoose[]): Promise<ICustomJsonResponse>;

        addTransaction(transactions: IUserTransaction[]): Promise<ICustomJsonResponse>;
        getUserTransactions(userId: string, numberOfTransactions: number): Promise<ICustomJsonResponse>;
    }
}