import {NextApiRequest, NextApiResponse} from "next";
import UserController from "../../backend/controllers/UserController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await UserController.catchError(UserController.getUser, req, res);
}