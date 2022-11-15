import {NextApiRequest, NextApiResponse} from "next";
import DefaultController from "./DefaultController";

type controllerMethod = (req: NextApiRequest, res:NextApiResponse) => void;

// todo: add methods from service
export default class UserInfoController implements DefaultController{
    public static async getUserInfoByUserId(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        let {query: {user_id}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        user_id = DefaultController.validateMultiData(user_id);


    }

    public static async setUserInfoByUserId(req: NextApiRequest, res: NextApiResponse): Promise<void> {

    }
}