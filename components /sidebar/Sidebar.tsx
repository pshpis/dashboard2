import {ReactElement, ReactNode, useCallback, useEffect, useState} from "react";
import useBoolean from "../../hooks/useBoolean";

interface MenuElement {
    id: number,
    name: string,
    icon: ReactElement
}

const menuElements : Array<MenuElement> = [
    {
        id: 0,
        name: "UNIT-Экономика",
        icon: <i className='bx bx-line-chart'/>
    },
    {
        id: 1,
        name: "Расчет цен из Китая",
        icon: <i className='bx bxs-factory'/>
    },
    {
        id: 2,
        name: "Расчет цен из Китая CARGO",
        icon: <i className='bx bx-bar-chart-alt-2'/>,
    },
    {
        id: 3,
        name: "Налоги",
        icon: <i className='bx bx-coin-stack'/>,
    },
    {
        id: 4,
        name: "Финансовые показатели",
        icon: <i className='bx bx-bar-chart-alt-2'/>,
    },
    {
        id: 5,
        name: "Финансовые итоги",
        icon: <i className='bx bxs-pie-chart-alt-2'/>,
    },
    {
        id: 6,
        name: "Маркировка",
        icon: <i className='bx bx-barcode-reader'/>,
    },
    {
        id: 7,
        name: "Выйти из аккаунта",
        icon: <i className='bx bx-log-out'/>
    }
];

const MenuElement = ({id, isActive, setActive, ...props}) => {
    return <li onClick={setActive} className={isActive ? "active" : ""}>
        <div className="title">
            <a href="#" className="link">
                {menuElements[id].icon}
                <span className="name">{menuElements[id].name}</span>
            </a>
        </div>
        <div className="submenu">
            <a href="#" className="link submenu-title">{menuElements[id].name}</a>
        </div>
    </li>
}

export const Sidebar = () => {
    const isClose = useBoolean(true);
    const [activeMenuElementId, setActiveMenuElementId] = useState<number>(-1);
    const isFirstRender = useBoolean(true);

    useEffect(() => {
        isFirstRender.setFalse();
    }, [])

    const getSetActive = useCallback((id: number) : () => void => {
        return useCallback(() => {
            setActiveMenuElementId(id);
        }, [setActiveMenuElementId, id]);
    }, [setActiveMenuElementId]);

    const getIsActive = useCallback((id: number) : boolean => {
        return activeMenuElementId === id;
    }, [activeMenuElementId]);

    return <div className={"sidebar " + (isClose.value ? "close" : "")}>
        <a href="#" className="logo-box" onClick={() => isClose.toggle()}>
            <i className='bx bxl-gmail'/>
            <div className="logo-name">Market Stat</div>
        </a>
        <ul className="sidebar-list" key="asa">
            {
                menuElements.map(info =>
                    <MenuElement
                        id={info.id}
                        isActive={getIsActive(info.id)}
                        setActive={getSetActive(info.id)}
                        key={info.id}
                    />
                )
            }
        </ul>
    </div>;
}