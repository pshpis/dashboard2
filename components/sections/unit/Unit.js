import {SectionTop} from "../sectionTop/sectionTop";
import {useSubjectsData} from "../../../lib/hooks/useSubjectsData";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../lib/hooks/useAuth";


function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const CalcRow = ({id, defStore = "", defCategory ="", defSubject = "",
                     defName = "", defBrand = "", defColor = "",
                     defSize = "", defCount = 0, defCost = 0, defBarcode = ""}) => {
    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();

    const [currentId, setCurrentId] = useState(JSON.parse(JSON.stringify(id)));
    const [currentSubject, setCurrentSubject] = useState(JSON.parse(JSON.stringify(defSubject)));
    const [currentCategory, setCurrentCategory] = useState(JSON.parse(JSON.stringify(defCategory)));
    const [currentStore, setCurrentStore] = useState(JSON.parse(JSON.stringify(defStore)));
    const [listSubjects, setListSubjects] = useState([]);
    const [packaging, setPackaging] = useState("");
    const [subjectData, setSubjectData] = useState({});
    const [logisticMarketplace, setLogisticMarketplace] = useState("");
    const [logistic, setLogistic] = useState("");
    const [commission, setCommission] = useState("");
    const [price, setPrice] = useState("");
    const [fullPrice, setFullPrice] = useState("");
    const [turnover, setTurnover] = useState("");
    const [cost, setCost] = useState(JSON.parse(JSON.stringify(defCost)));
    const [name, setName] = useState(JSON.parse(JSON.stringify(defName)));
    const [brand, setBrand] = useState(JSON.parse(JSON.stringify(defBrand)));
    const [color, setColor] = useState(JSON.parse(JSON.stringify(defColor)));
    const [size, setSize] = useState(JSON.parse(JSON.stringify(defSize)));
    const [count, setCount] = useState(JSON.parse(JSON.stringify(defCount)));
    const [barcode, setBarcode] = useState(JSON.parse(JSON.stringify(defBarcode)));

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

    const onSave = useCallback(async () => {
        console.log(currentStore);
        console.log(currentCategory);
        console.log(currentSubject);
        console.log(name);
        console.log(brand);
        console.log(color);
        console.log(size);
        console.log(count);
        console.log(cost);
        console.log(barcode);

        if (currentId === -1){
            let newId = await subjectsDataFunc.addCalculation({
                user_id: auth.user.id,
                store: currentStore,
                category: currentCategory,
                subject: currentSubject,
                name: name,
                brand: brand,
                color: color,
                size: size,
                count: count,
                cost: cost,
                barcode: barcode,
            }).id;
            newId = parseInt(newId);
            setCurrentId(newId);
        }
        else {
            await subjectsDataFunc.updateCalculation(currentId, {
                user_id: auth.user.id,
                store: currentStore,
                category: currentCategory,
                subject: currentSubject,
                name: name,
                brand: brand,
                color: color,
                size: size,
                count: count,
                cost: cost,
                barcode: barcode,
            });
        }
    }, [currentStore, currentCategory, currentSubject, name, brand, color, size, count, cost, barcode]);

    const updateListSubjects = useCallback(async () => {
        if (currentCategory !== "" && currentStore !== ""){
            const newList = await subjectsDataFunc.getSubjects(currentStore, currentCategory);
            setListSubjects(newList);
        }
    }, [currentStore, currentCategory, subjectsDataFunc, subjectsDataFunc.getSubjects, setListSubjects]);

    useEffect(() => {
        updateListSubjects();
    }, [currentStore, currentCategory, defStore, defCategory])

    return <tr>
        <td>
            <input list="stores" defaultValue={currentStore} onChange={async (evt) => {
                const store = evt.target.value;
                if (subjectsDataFunc.stores.indexOf(store) !== -1){
                    setCurrentStore(store);
                }
            } }/>
            <datalist id="stores">
                {
                    subjectsDataFunc.stores.map(store => {
                        return <option value={store} key={store}/>
                    })
                }
            </datalist>
        </td>
        <td>
            <input list="category" defaultValue={currentCategory} onChange={async (evt) => {
                const category = evt.target.value;
                if (subjectsDataFunc.categories.indexOf(category) !== -1){
                    setCurrentCategory(category);
                }
            } }/>
            <datalist id="category">
                {
                    subjectsDataFunc.categories.map(c => {
                        return <option value={c} key={c}/>
                    })
                }
            </datalist>
        </td>
        <td>
            <input list={"subjects"+id} defaultValue={currentSubject} onChange={async (evt) => {
                const subject = evt.target.value;
                if (listSubjects.indexOf(subject) !== -1){
                    setCurrentSubject(subject);
                }
            } }/>
            <datalist id={"subjects" + id}>
                {listSubjects.map((c, i) => {
                    return <option value={c} key = {i}/>
                })}
            </datalist>
        </td>
        <td><input type="text" defaultValue={name} onChange={(evt) => {setName(evt.target.value)}}/></td>
        <td><input type="text" defaultValue={brand} onChange={(evt) => {setBrand(evt.target.value)}}/></td>
        <td><input type="text" defaultValue={color} onChange={evt => {setColor(evt.target.value)}}/></td>
        <td><input type="text" defaultValue={size} onChange={evt => {setSize(evt.target.value)}}/></td>
        <td><input type="number" defaultValue={count} onChange={evt => {setCount(+evt.target.value)}}/></td>
        <td><input type="number" defaultValue={cost} onChange={evt => {
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
        <td><input type="text" defaultValue={barcode} onChange={evt => {setBarcode(evt.target.value)}}/></td>
        <td><button onClick={onSave}>Сохранить</button></td>
    </tr>
}
export const Unit = () => {
    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();
    const [sections, setSections] = useState([]);
    useEffect(() => {
        console.log(auth);
        if (!auth.user) return;
        subjectsDataFunc.getCalculations(auth.user.id).then(res => {
            console.log(res);
            const newSections = res.map(data => {
                // console.log(data);
                return  <CalcRow auth={auth} subjectsDataFunc={subjectsDataFunc} id={data.id}
                        defStore={data.Store} defCategory={data.Category} defSubject={data.Subject}
                        defName={data.Name} defBrand={data.Brand} defColor={data.Color}
                        defSize={data.Size} defCount={data.Count} defCost={data.Cost} defBarcode={data.Barcode} key={makeId(8)}/>

            });
            setSections(newSections);
        });
    }, [auth.user]);

    const addCalcRow = useCallback(() => {
        const newSections = sections;

        newSections.push(<CalcRow auth={auth} subjectsDataFunc={subjectsDataFunc} id={-1} key={makeId(8)}/>);
        setSections(newSections);
    }, [sections, setSections]);

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
                <button onClick={addCalcRow}
                        style={{width: "50px", height: "30px", fontSize:"24px", lineHeight:"30px"}}>
                    +
                </button>
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
                            <th>Сохранить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sections}
                        </tbody>


                    </table>
                </div>
            </div>
        </section>
    );
}