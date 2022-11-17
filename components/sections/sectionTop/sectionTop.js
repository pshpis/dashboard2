import {useAuth} from "../../../lib/hooks/useAuth";

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
                <div className="textname"><a href="/account">{user? `${user.first_name} ${user.second_name}` : ""}</a></div>
            </div>
        </>
    )
}