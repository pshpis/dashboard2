import {useAuth} from "../../../lib/hooks/useAuth";
import Link from "next/link";

export const SectionTop = () => {
    const {user, isUserLoaded} = useAuth();
    return (
        <>
            <div className="toggle-sidebar">
                <i className='bx bx-menu'/>
                <div className="text">Рабочая панель</div>
                <div/>
            </div>

            <div className="accaunt">
                <div className="textname"><Link href="/account">{user? `${user.first_name} ${user.second_name}` : ""}</Link></div>
            </div>
        </>
    )
}