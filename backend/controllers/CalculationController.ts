import {NextApiRequest, NextApiResponse} from "next";
import {CalculationService} from "../services/CalculationService";
import DefaultController from "./DefaultController";

export default class CalculationController {
    public static async getStores(req: NextApiRequest, res: NextApiResponse){
        let {method} = req;
        if (method !== "GET") return res.status(404).json({});
        const stores = await CalculationService.getStores();
        return res.status(200).json(stores);
    }

    public static async getSubjects(req: NextApiRequest, res: NextApiResponse){
        let {query: {store, category}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        store = DefaultController.validateMultiData(store);
        category = DefaultController.validateMultiData(category);
        const subjects = await CalculationService.getSubjects(store, category);
        return res.status(200).json(subjects);
    }

    public static async getCategories(req: NextApiRequest, res: NextApiResponse){
        let {method} = req;
        if (method !== "GET") return res.status(404).json({});
        const categories = await CalculationService.getCategories();
        return res.status(200).json(categories);
    }

    public static async getTurnover(req: NextApiRequest, res: NextApiResponse){
        let {query: {category}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        category = DefaultController.validateMultiData(category);
        const turnover = await CalculationService.getTurnover(category);
        return res.status(200).json({turnover: turnover});
    }

    public static async getSubjectData(req: NextApiRequest, res: NextApiResponse){
        let {query: {category, subject, store}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        category = DefaultController.validateMultiData(category);
        store = DefaultController.validateMultiData(store);
        subject = DefaultController.validateMultiData(subject);
        const subjectData = await CalculationService.getSubjectData(store, category, subject);
        return res.status(200).json(subjectData);
    }

    public static async getPrices(req: NextApiRequest, res: NextApiResponse){
        let {query: {subject}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        subject = DefaultController.validateMultiData(subject);
        const prices = await CalculationService.getPrices(subject);
        return res.status(200).json(prices);
    }

}
