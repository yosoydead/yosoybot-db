import { RESPONSE_TYPE } from "./responseType";
export interface ICustomJsonResponse {
  message: string,
  statusCode: number,
  status: RESPONSE_TYPE
}

export interface IDbCommunication {
  // comments related stuff
  addComment(): any;
  addComments(): any;
  getRandomComment(): any;
  getComments(): any;

  // users related stuff
  getUserData(): any;
  getAllUsers(): any;
  addUser(): any;
  addUsers(): any;
  rewardUser(): any;
}