import '../cssFiles/passport.css';
import '../cssFiles/inputStyles.css';
import '../App.css'
import '../cssFiles/Titles.css';
import '../cssFiles/Elements.css';

import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {GetMainTitle} from "./OrderPagesCreator";

type ButtonsName = 'Паспорт заказа' | 'Подробнее'

export function GetPassportPage() {
    return (
        <div className="App">
            <div className='block block-column'>
                {GetMainTitle("Паспорт заказа")}
                {GetMiddle(true)}
                {GetBottom()}
            </div>
        </div>
    );
}

export function GetPassportPageMore() {
    const navigate = useNavigate();
    return <div className="App">
        <div className="block block-column">
            {GetMainTitle("Паспорт заказа")}
            {GetMiddle(false)}
            <div className="block block-row">
                <div className="block block-column align-start white-container">
                    <div className="block block-row bold-text-16 align-center">
                        Введите тираж:
                        <input
                            type={"number"}
                            defaultValue="1"
                            className="form-input input-style"
                        />
                        <button className='main-button'>Подробнее</button>
                    </div>
                    <div className="block block-row bold-text-16 ">
                        <div className="cell-vertical">
                            <div className="bold-text-16">Стоимость:</div>
                            <div className="normal-text-14 gray-background">11111111</div>
                        </div>
                        <div className="cell-vertical">
                            <div className="bold-text-16">Сумма работ:</div>
                            <div className="normal-text-14 gray-background">11111111</div>
                        </div>
                        <div className="cell-vertical">
                            <div className="bold-text-16">Сумма материалов:</div>
                            <div className="normal-text-14 gray-background">11111111</div>
                        </div>
                        <div className="cell-vertical">
                            <div className="bold-text-16">Цена изделия:</div>
                            <div className="normal-text-14 gray-background">11111111</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block block-row">
                {/* Первая строка: заголовок + кнопка */}
                <div className="block block-row white-container flex-075 ">
                    <div className="block block-column">
                        <div className="left-section block-spase ">
                            <div>Состав Визитка 4+4:</div>
                            <button className="main-button"
                                    onClick={
                                        () => {
                                            navigate("/TechnologicalMapPage");
                                        }}
                            >Редактировать
                            </button>
                        </div>
                        {/* Сюда потом вписывать все содержание объекта */}
                        <button className="main-button left-section"
                        >1. Операция
                        </button>
                        <button className="main-button left-section"
                        >2. Операция
                        </button>
                        <button className="main-button left-section"
                        >3. Операция
                        </button>
                        <button className="main-button left-section"
                        >4. Операция
                        </button>
                        <button className="main-button left-section"
                        >5. Операция
                        </button>
                        <button className="main-button left-section"
                        >6. Операция
                        </button>
                    </div>
                </div>
                {/* Вторая строка: Сумма материалов + заголовки колонок */}
                <div className="block block-column-0-padding flex-1">
                    <div className="block block-row-0-padding">
                        <div className="block block-row white-container">
                            <div className="block block-column ">
                                <div className="block block-row align-center">
                                    <div className="flex-2">Материалы</div>
                                    <div className="block block-column flex-075 align-center bold-text-16">Кол-во</div>
                                    <div className="block block-column flex-075 align-center bold-text-16">Сумма</div>
                                </div>
                                <div className="block block-row align-center  ">
                                    <div className="normal-text-14 flex-2">Пример материала 1</div>
                                    <div className="block block-column-0-padding flex-075 align-center normal-text-14">12</div>
                                    <div className="block block-column-0-padding flex-075 align-center normal-text-14">1412412
                                    </div>
                                </div>
                                <div className="block block-row align-start block-spase ">
                                    <div className="normal-text-14 flex-2">Пример материала 2</div>
                                    <div className="block block-column-0-padding flex-075 align-center normal-text-14">2</div>
                                    <div className="block block-column-0-padding flex-075 align-center normal-text-14">13412</div>
                                </div>
                                <div className="block block-row align-start block-spase ">
                                    <div className="normal-text-14 flex-2">Пример материала 3</div>
                                    <div className="block block-column-0-padding flex-075 align-center normal-text-14">81</div>
                                    <div className="block block-column-0-padding flex-075 align-center normal-text-14">2342</div>
                                </div>
                                <button className="main-button align-center"
                                >Добавить Материал
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="block block-column white-container">
                        <div className="block block-row">Добавить Материал</div>
                        <div className="block block-row">
                            <div className="bold-text-16">Выход:</div>
                            <div className="normal-text-14">000000</div>
                        </div>
                        <div className="block block-row">
                            <div className="bold-text-16">Сумма:</div>
                            <div className="normal-text-14">000000</div>
                        </div>
                        <div className="block block-row">
                            <div className="bold-text-16">Предшествующие операции:</div>
                            <div className="normal-text-14">000000</div>
                        </div>
                        <div className="block block-row">
                            <div className="bold-text-16">Мат. расходы:</div>
                            <div className="normal-text-14">000000</div>
                        </div>
                        <div className="block block-row">
                            <div className="bold-text-16">Итого:</div>
                            <div className="normal-text-14">000000</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

function GetMiddle(bool: boolean) {
    const navigate = useNavigate();
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: ButtonsName } | null>(null);
    return <>
        <div className="block block-row align-center">
            <button className="block-button bold-text-24"
                    onClick={
                        () => {
                            navigate("/CalculationPage");
                        }}>←
            </button>
            <div className="bold-text-24">Вернуться</div>
        </div>
        <div className='block block-row'>
            <button
                className={`main-button ${bool ? 'active' : ''}`}
                onClick={() => {
                    navigate("/PassportPage");
                }}>
                Паспорт заказа
            </button>
            <button
                className={`main-button ${!bool ? 'active' : ''}`}
                onClick={() => {
                    navigate("/PassportPageMore");
                }}>
                Подробнее
            </button>
        </div>
    </>
}

function GetBottom() {
    return <>
        <div className="block block-row ">
            <div className="block block-column  white-container ">
                <div className="block block-column align-center">
                    <div className="bold-text-24">Статус:</div>
                    <div className="block block-row">
                        <button className="main-button ">Шаблон</button>
                        <button className="main-button ">Расчёт</button>
                        <button className="main-button ">Проверен</button>
                    </div>
                </div>
                <div className="block block-row">
                    <div className="block block-row align-center">
                        <div className="bold-text-16">№ Заказа:</div>
                        <input
                            type={"number"}
                            defaultValue="1"
                            className="form-input input-style"
                        />
                    </div>
                    <div className="block block-row align-center">
                        <div className="bold-text-16 padding-left-2">Дата:</div>
                        <input
                            type={"date"}
                            defaultValue="25.05.2025"
                            className="date-input input-style"
                        />
                    </div>
                    <div className="block block-row align-center">
                        <div className="bold-text-16">Тираж:</div>
                        <input
                            type={"number"}
                            defaultValue="100"
                            className="form-input input-style"
                        />
                    </div>
                    <div className="block block-row align-center">
                        <div className="bold-text-16 padding-left-2">Сумма:</div>
                        <input
                            type={"number"}
                            defaultValue="14321"
                            className="form-input input-style"
                        />
                    </div>
                </div>
                <div className="block block-row">
                    <div className="block block-column align-center">
                        <div className="block block-column">
                            <div className="bold-text-16">Название:</div>
                            <input
                                type={"text"}
                                defaultValue="Визитка 4+4"
                                className="form-input-vertical input-style"
                            />
                        </div>
                    </div>
                    <div className="block block-column align-center">
                        <div className="block block-column">
                            <div className="bold-text-16">Описание:</div>
                            <textarea
                                defaultValue="wfew fw Меого текста многа тексата ааааа акак его мноагага ага"
                                className="form-input-vertical height-100 input-style"
                            />
                        </div>
                    </div>
                    <div className="block block-column align-center">
                        <div className="block block-column">
                            <div className="bold-text-16">Дата заказа:</div>
                            <input
                                type={"date"}
                                defaultValue="25.05.2025"
                                className="date-input input-style"
                            />
                            <div className="bold-text-16">Дата готовности:</div>
                            <input
                                type={"date"}
                                defaultValue="25.05.2025"
                                className="date-input input-style"
                            />
                        </div>
                    </div>
                    <div className="block block-column align-center">
                        <div className="block block-column">
                            <div className="bold-text-16">Время заказа:</div>
                            <input
                                type={"text"}
                                defaultValue="Визитка 4+4"
                                className="form-input-vertical input-style"
                            />
                            <div className="bold-text-16">Время готовности:</div>
                            <input
                                type={"text"}
                                defaultValue="Визитка 4+4"
                                className="form-input-vertical input-style"
                            />
                        </div>
                    </div>
                    <div className="block block-column align-center">
                        <div className="block block-column">
                            <div className="bold-text-16">Менеджер:</div>
                            <input
                                type={"text"}
                                defaultValue="Визитка 4+4"
                                className="form-input-vertical input-style"
                            />
                            <div className="bold-text-16">Клиент:</div>
                            <input
                                type={"text"}
                                defaultValue="Визитка 4+4"
                                className="form-input-vertical input-style"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

