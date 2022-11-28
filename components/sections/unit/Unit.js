import {SectionTop} from "../sectionTop/sectionTop";
import {useSubjectsData} from "../../../lib/hooks/useSubjectsData";
import {useEffect, useState} from "react";
import {use} from "bcrypt/promises";

export const Unit = () => {
    const subjectsDataFunc = useSubjectsData();
    const [currentSubject, setCurrentSubject] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentStore, setCurrentStore] = useState("");
    const [listSubjects, setListSubjects] = useState([]);
    const [packaging, setPackaging] = useState("");
    const [subjectData, setSubjectData] = useState({});
    const [logisticMarketplace, setLogisticMarketplace] = useState("");
    const [logistic, setLogistic] = useState("");
    const [commission, setCommission] = useState("");
    const [price, setPrice] = useState("");
    const [fullPrice, setFullPrice] = useState("");
    const [turnover, setTurnover] = useState("");
    const [cost, setCost] = useState(0);
    

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        subjectsDataFunc.getSubjectData(currentStore, currentCategory, currentSubject).then(res => {
            setSubjectData(res);
        })
    }, [currentSubject]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
            setPackaging(subjectData.CostLogisticsBox * 0.25)
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
            setLogisticMarketplace(subjectData.CostLogisticsBox)
    }, [subjectData, currentSubject]);

    useEffect(() => {
        setLogistic(logisticMarketplace * 0.35)
    }, [logisticMarketplace]);

    useEffect(() => {
        setCommission(subjectData.CommissionPercentage);
    }, [subjectData, currentSubject])


    useEffect(() => {
        if (currentSubject === "") return;
        subjectsDataFunc.getPrices(currentSubject).then(res => setPrice(res.price));
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentSubject === "") return;
        subjectsDataFunc.getPrices(currentSubject).then(res => setFullPrice(res.fullPrice));
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentCategory === "") return;
        subjectsDataFunc.getTurnover(currentCategory).then(res => {
            setTurnover(res)
        });
    }, [subjectData, currentCategory]);

    return (
        <section className="home">
            <SectionTop/>
            <div className="block">

                <div className="block_sku">
                    <div className="rectangle"/>
                </div>

                <div className="textsku">Количество карточек</div>
                <div className="textskutwo">SKU</div>
                <div className="textskuthree">125</div>

                <div className="iconsku">
                    <img src="/img/bxs-cabinet.svg" height="50px" width="50px"/>
                </div>


                <div className="block_vp">
                    <div className="rectangle"/>
                </div>

                <div className="textvp">Количество товаров</div>
                <div className="textvptwo">ШТ</div>
                <div className="textvpthree">4750</div>

                <div className="iconsvp">
                    <img src="/img/bxs-basket.svg" height="50px" width="50px"/>
                </div>





                <div className="block_vm">
                    <div className="rectangle"></div>
                </div>

                <div className="textvm">Денежные средства</div>
                <div className="textvmtwo">₽</div>
                <div className="textvmthree">127800</div>

                <div className="iconsvm">
                    <img src="/img/bxs-wallet.svg" height="50px" width="50px"/>
                </div>





                <div className="companycard">
                    <img src="/img/companycard.svg" height="171px"/>
                </div>




                <div className="videocard">
                    <img src="/img/videocard.svg" height="172px"/>
                </div>



            </div>

            <div className="textoreview">
                Расчет ценообразования и затрат (UNIT-Экономика товара) &nbsp; &nbsp; &nbsp; &nbsp;
                <span> + </span>
            </div>


            <div className="bordertable">
                <div className="rectangle"></div>
            </div>


            <div className="units-table">
                <div className="table">
                    <table>
                        <thead>
                        <tr>
                            <th>Cклад</th>
                            <th>Категория</th>
                            <th>Предмет</th>
                            <th>Наименование</th>
                            <th>Бренд</th>
                            <th>Цвет</th>
                            <th>Размер</th>
                            <th>Количество</th>
                            <th>Себестоимость</th>
                            <th>Упаковка</th>
                            <th>Логистика</th>
                            <th>Комиссия_маркетплейса_%</th>
                            <th>Комиссия_маркетплейса</th>
                            <th>Логистика_маркетплейса</th>
                            <th>Стоимость_хранения_в_день</th>
                            <th>Стоимость_хранения</th>
                            <th>Оборачиваемость</th>
                            <th>Наценка</th>
                            <th>Цена</th>
                            <th>Скидка</th>
                            <th>Цена_до_скидки</th>
                            <th>Баркод</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input list="stores" onChange={async (evt) => {
                                    const store = evt.target.value;
                                    if (subjectsDataFunc.stores.indexOf(store) !== -1){
                                        setCurrentStore(store);
                                        if (currentCategory !== ""){
                                            setListSubjects(await subjectsDataFunc.getSubjects(store, currentCategory));
                                        }
                                    }
                                } }/>
                                <datalist id="stores">
                                    {
                                        subjectsDataFunc.stores.map(store => {
                                            return <option value={store}/>
                                        })
                                    }
                                </datalist>
                            </td>
                            <td>
                                <input list="category" onChange={async (evt) => {
                                    const category = evt.target.value;
                                    if (subjectsDataFunc.categories.indexOf(category) !== -1){
                                        setCurrentCategory(category);
                                        if (currentStore !== ""){
                                            setListSubjects(await subjectsDataFunc.getSubjects(currentStore, category));
                                        }
                                    }
                                } }/>
                                <datalist id="category">
                                    {
                                        subjectsDataFunc.categories.map(c => {
                                            return <option value={c}/>
                                        })
                                    }
                                </datalist>
                            </td>
                            <td>
                                <input list="subjects" onChange={async (evt) => {
                                const subject = evt.target.value;
                                if (listSubjects.indexOf(subject) !== -1){
                                    setCurrentSubject(subject);
                                }
                            } }/>
                                <datalist id="subjects">
                                    {
                                        listSubjects.map(c => {
                                            return <option value={c}/>
                                        })
                                    }
                                </datalist>
                            </td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="number"/></td>
                            <td><input type="number" onChange={evt => {
                                setCost(+evt.target.value);
                            }}/></td>
                            <td>{packaging}</td>
                            <td>{logistic}</td>
                            <td>{commission}</td>
                            <td>{commission * price / 100}</td>
                            <td>{logisticMarketplace}</td>
                            <td>{subjectData.CostStorageBox}</td>
                            <td>{subjectData.CostStorageBox * turnover}</td>
                            <td>{turnover}</td>
                            <td>{price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost }</td>
                            <td>{price}</td>
                            <td>{Math.round((fullPrice - price) / fullPrice * 100) + '%'}</td>
                            <td>{fullPrice}</td>
                            <td><input type="text"/></td>
                        </tr>
                        </tbody>


                    </table>
                </div>
            </div>
        </section>
    );
}