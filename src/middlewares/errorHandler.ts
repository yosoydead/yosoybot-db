/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Response } from "express";
import { ICustomJsonResponse} from "yosoybotDB";
export class ErrorHandler extends Error {
	public _statusCode: number;
	constructor(message: string, statusCode: number = 500) {
		super();
		this.message = message;
		this._statusCode = statusCode;
	}
}

export const handlerError = (err: ErrorHandler, res: Response): Response => {
	const { message, _statusCode} = err;
	const json: ICustomJsonResponse = {
		message,
		status: "error",
		statusCode: _statusCode
	};

	return res
		.status(_statusCode)
		.json(json);
};