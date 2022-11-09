import styles from "../../styles/auth.component.css";

export const Auth = () => {
    return (
        <div className={styles.container}>
            <div className={styles.signinSignup}>
                <form action="" className={styles.signInForm}>
                    <h2 className={styles.title}>Вход в приложение</h2>
                    <div className={styles.inputField}>
                        <i className="fas fa-user"/>
                        <input type="text" placeholder="Логин"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"/>
                        <input type="password" placeholder="Пароль"/>
                    </div>
                    <input type="submit" value="Войти" className="btn"/>
                    <p className="social-text"/>
                    <div className="social-media">
                    </div>
                    <p className="account-text">Don't have an account? <a href="#" id="sign-up-btn2">Sign up</a></p>
                </form>
                <form action="" className="sign-up-form">
                    <h2 className="title">Быстрая регистрация</h2>
                    <div className="input-field">
                        <i className="fas fa-user"/>
                        <input type="text" placeholder="Имя"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"/>
                        <input type="text" placeholder="Email"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"/>
                        <input type="password" placeholder="Пароль"/>
                    </div>
                    <input type="submit" value="Регистрация" className="btn"/>
                    <p className="social-text"/>
                    <div className="social-media"/>
                    <p className="account-text">Already have an account? <a href="#" id="sign-in-btn2">Sign in</a></p>
                </form>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Уже есть аккаунт?</h3>
                        <p>Мы рады, что Вы уже с нами. Желаем Вам приятной работы!</p>
                        <button className="btn" id="sign-in-btn">Войти</button>
                    </div>
                    <img src="5241364%201.svg" alt="" className="image"/>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Еще нет аккаунта?</h3>
                        <p>Мгновенная регистрация и быстрый доступ ко всем функциям приложения всего за 15 секунд</p>
                        <button className="btn" id="sign-up-btn">Регистрация</button>
                    </div>
                    <img src="5224471%201.svg" alt="" className="image"/>
                </div>
            </div>
        </div>
    )
}