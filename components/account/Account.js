export const Account = () => {
    return (
        <section className="home">
            <div className="toggle-sidebar">
                <div> </div>
            </div>

            <div className="logotipe">
                <img src="assets/img/Logo MarketStat 1.png" alt="logotipe" height="50px"/>
            </div>

            <div className="tablename">
                <div>
                    <div>Имя</div>
                    <div>София</div>
                </div>
            </div>

            <div className="tabletwoname">
                <div>
                    <div>Фамилия</div>
                    <div>Тумарова</div>
                </div>
            </div>

            <div className="tablephone">
                <div>
                    <div>Телефон</div>
                    <div>+7 (999) 001 11 13</div>
                </div>
            </div>

            <div className="tablemail">
                <div>
                    <div>Почта</div>
                    <div>tumarova2015@gmail.com</div>
                </div>
            </div>

            <div className="tablecompanyname">
                <div>
                    <div>Наименование организации</div>
                    <div>Джефко логистика</div>
                </div>
            </div>


            <div className="tableinn">
                <div>
                    <tr>ИНН организации</tr>
                    <td>366001456789</td>
                </div>
            </div>

            <div className="tablechecking">
                <div>
                    <tr>Расчетный счет</tr>
                    <td>40817897465783000023</td>
                </div>
            </div>

            <div className="tablebic">
                <div>
                    <tr>БИК Банка</tr>
                    <td>044567833259</td>
                </div>
            </div>


            <button className="saveimage">Загрузить</button>

            <button className="save">Сохранить</button>

            <div className="work">
                <img src="assets/img/bx-log-out.png" height="40px" width="40px"/>
            </div>


            <div className="worktext">
                <div className="textname">Вернуться к работе</div>
            </div>

            <div className="accaunt">
                <div className="textname">Никита Тумаров</div>
            </div>


            <div className="accauntimage">
                <img src="assets/img/humanicon.png" height="50px" width="50px"/>
            </div>
        </section>

    )
}