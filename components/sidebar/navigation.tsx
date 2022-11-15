import {ReactElement} from "react";
import {FinancialTotal} from "../sections/financialTotal/FinancialTotal";
import {FinancialProduct} from "../sections/financialProduct/FinancialProduct";
import {China} from "../sections/china/China";
import {ChinaCargo} from "../sections/chinaCargo/ChinaCargo";
import {Barcodes} from "../sections/barcodes/Barcodes";
import {Unit} from "../sections/unit/Unit";
import {Nalog} from "../sections/nalog/Nalog";

export interface MenuElement {
    id: number,
    name: string,
    icon: ReactElement,
    content: ReactElement,
}

export const menuElements : Array<MenuElement> = [
    {
        id: 0,
        name: "UNIT-Экономика",
        icon: <i className='bx bx-line-chart'/>,
        content: <Unit/>
    },
    {
        id: 1,
        name: "Расчет цен из Китая",
        icon: <i className='bx bxs-factory'/>,
        content: <China/>
    },
    {
        id: 2,
        name: "Расчет цен из Китая CARGO",
        icon: <i className='bx bx-bar-chart-alt-2'/>,
        content: <ChinaCargo/>
    },
    {
        id: 3,
        name: "Налоги",
        icon: <i className='bx bx-coin-stack'/>,
        content: <Nalog/>
    },
    {
        id: 4,
        name: "Финансовые показатели",
        icon: <i className='bx bx-bar-chart-alt-2'/>,
        content: <FinancialProduct/>,
    },
    {
        id: 5,
        name: "Финансовые итоги",
        icon: <i className='bx bxs-pie-chart-alt-2'/>,
        content: <FinancialTotal/>
    },
    {
        id: 6,
        name: "Маркировка",
        icon: <i className='bx bx-barcode-reader'/>,
        content: <Barcodes/>
    },
    {
        id: 7,
        name: "Выйти из аккаунта",
        icon: <i className='bx bx-log-out'/>,
        content: <></>
    }
];