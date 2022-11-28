import {useCallback, useEffect, useState} from "react";

export function useSubjectsData(){
    const [stores, setStores] = useState<Array<string>>([]);
    const [categories, setCategories] = useState<Array<string>>([]);

    const loadStoresData = useCallback(async () => {
        const req = await fetch(`/api/calc/get_stores`);
        setStores(await req.json());
    }, [setStores, stores]);

    useEffect(() => {
        loadStoresData();
    }, [loadStoresData]);



    const loadCategoriesData = useCallback(async () => {
        const req = await fetch(`/api/calc/get_categories`);
        setCategories(await req.json());
    }, [setCategories, categories])

    useEffect(() => {
        loadCategoriesData();
    }, [loadCategoriesData]);



    const getSubjects = useCallback(async (store, category) => {
        const req = await fetch(`/api/calc/get_subjects?store=${store}&category=${category}`);
        return await req.json();
    }, []);

    const getTurnover = useCallback(async (category) : Promise<number> => {
        const req = await fetch(`/api/calc/get_turnover?category=${category}`);
        return (await req.json()).turnover;
    }, []);

    const getSubjectData = useCallback(async (store, category, subject) => {
        const req = await fetch(`/api/calc/get_subject_data?store=${store}&category=${category}&subject=${subject}`);
        return await req.json();
    }, []);

    const getPrices = useCallback(async (subject) => {
        const req = await fetch(`/api/calc/get_prices?subject=${subject}`);
        return await req.json();
    }, []);

    return {
        stores,
        loadStoresData,
        categories,
        loadCategoriesData,
        getSubjects,
        getTurnover,
        getPrices,
        getSubjectData,
    }
}