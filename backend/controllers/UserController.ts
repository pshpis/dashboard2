import {NextApiRequest, NextApiResponse} from "next";
import UserService from "../services/UserService";
import {User} from "@prisma/client";

type controllerMethod = (req: NextApiRequest, res:NextApiResponse) => void;

export default class UserController {
    private static validateMultiData(x) : string{
        if (typeof x !== "string") x = x[0];
        return x;
    }

    // return auth_token from new user
    public static async register(req: NextApiRequest, res: NextApiResponse){
        let {query: {first_name, second_name, email, password}, method} = req;
        if (method !== "POST") return res.status(404).json({});

        let firstName = this.validateMultiData(first_name);
        let secondName = this.validateMultiData(second_name);
        email = this.validateMultiData(email);
        password = this.validateMultiData(password);

        const user : User | null = await UserService.registerUser(firstName, secondName, email, password);
        if (user !== null){
            return res.status(200).json(user.auth_token);
        }
        else {
            return res.status(500).json({error: "Invalid registration data"});
        }
    }

    public static async isEmailVacant(req: NextApiRequest, res: NextApiResponse){
        let {query: {email}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        email = this.validateMultiData(email);
        const isEmailVacant : boolean = await UserService.isEmailVacant(email);

        return res.status(200).json(isEmailVacant);
    }

    // return auth_token or json with error
    public static async login(req: NextApiRequest, res: NextApiResponse){
        let {query: {email, password}, method} = req;
        if (method !== "POST") return res.status(404).json({});
        email = this.validateMultiData(email);
        password = this.validateMultiData(password);

        const authToken : string | null = await UserService.getAuthToken(email, password);
        if (authToken === null) return res.status(500).json({error: "Invalid login data"});
        return res.status(200).json(authToken);
    }

    public static async getUser(req: NextApiRequest, res: NextApiResponse){
        let {query: {auth_token}, method} = req;
        if (method !== "POST") return res.status(500).json({});

        auth_token = this.validateMultiData(auth_token);
        const user: User | null = await UserService.getUserByAuthToken(auth_token);
        if (user !== null){
            return res.status(200).json(user);
        }
        else {
            return res.status(500).json({error: "Invalid auth_token"});
        }
    }

    public static async catchError(func: controllerMethod, req: NextApiRequest, res: NextApiResponse) : Promise<void>{
        try {
            await func(req, res);
            return;
        }
        catch (err){
            return res.status(500).json({error: err.message})
        }
    }
}