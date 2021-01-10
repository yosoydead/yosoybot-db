import { RESPONSE_TYPE } from "./responseType";

export interface ICustomJsonResponse {
  message: string,
  statusCode: number,
  status: RESPONSE_TYPE
}