"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = /** @class */ (function () {
    function DbClient(baseUrl, userModel, commentsModel) {
        this.UsersModel = userModel;
        this.CommentsModel = commentsModel;
    }
    DbClient.prototype.createResponseObject = function (message, statusCode, status) {
        console.log("fac response msg");
        return {
            message: message,
            statusCode: statusCode,
            status: status
        };
    };
    // comments stuff
    DbClient.prototype.addComment = function (content, authorID) {
        var _this = this;
        console.log("adaug comment");
        return this.CommentsModel.create({ content: content, author: authorID })
            .then(function (comment) {
            return _this.UsersModel.findOneAndUpdate({ discordUserId: authorID }, { $push: { comments: comment._id } });
        })
            .then(function (user) {
            console.log("success");
            return _this.createResponseObject("Comment added successfully", 200, "sucess");
        })
            .catch(function (err) {
            return _this.createResponseObject("Something went wrong", 500, "error");
        });
    };
    DbClient.prototype.addComments = function () {
        console.log("adaug multe comentarii");
    };
    DbClient.prototype.getRandomComment = function () {
        var _this = this;
        console.log("trag un comment random");
        var quote;
        return this.CommentsModel.find({})
            .then(function (result) {
            var index = Math.floor(Math.random() * result.length);
            quote = result[index];
            return _this.UsersModel.find({ discordUserId: quote.author });
        })
            .then(function (user) {
            console.log(user);
            return _this.createResponseObject("\"" + quote.content + "\" de " + user[0].discordUsername, 200, "sucess");
        })
            .catch(function (err) {
            return _this.createResponseObject("Something went wrong", 500, "error");
        });
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
