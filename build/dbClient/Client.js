"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = /** @class */ (function () {
    function DbClient(baseUrl, userModel, commentsModel) {
        this.UsersModel = userModel;
        this.CommentsModel = commentsModel;
    }
    // comments stuff
    DbClient.prototype.addComment = function () {
        console.log("adaug comment");
    };
    DbClient.prototype.addComments = function () {
        console.log("adaug multe comentarii");
    };
    DbClient.prototype.getRandomComment = function () {
        console.log("trag un comment random");
    };
    DbClient.prototype.getComments = function () {
        console.log("trag toate comentariile");
    };
    // users stuff
    DbClient.prototype.getUserData = function () {
        console.log("date despre un user");
    };
    DbClient.prototype.getAllUsers = function () {
        console.log("date despre toti userii");
    };
    DbClient.prototype.addUser = function () {
        console.log("adaug un user");
    };
    DbClient.prototype.addUsers = function () {
        console.log("adaug multi useri");
    };
    DbClient.prototype.rewardUser = function () {
        console.log("dau rublerts unui user");
    };
    return DbClient;
}());
exports.default = DbClient;
