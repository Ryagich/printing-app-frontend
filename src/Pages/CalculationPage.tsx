import React, {useEffect, useState} from 'react'
import '../App.css';
import '../cssFiles/order.css';
import {GetMainTitle, CreateCalculationOrders, createOrdersTitle, CreateTitleButtons, OrderTitleButtons} from './OrderPagesCreator';
import {TemplateWithDescription} from "../Models/Models";
import {api} from "../apiService";

type ButtonsName = 'Редактировать' | 'Паспорт'

export function GetCalculationPage() {
    const [activeButton, setActiveButton] = useState<OrderTitleButtons>('Расчёт');
    const [orders, setOrders] = useState<TemplateWithDescription[]>([]);
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: ButtonsName } | null>(null);
    useEffect(() => {
        api.getTemplates().then(x =>{
            setOrders([...x.items])
        });
    }, []);

    return (
        <div className="App">
            <div className="block block-column">
                {GetMainTitle("Система печати")}
                <CreateTitleButtons buttonLabels={['+', 'Шаблон', 'Расчёт']}
                                    activeButton={activeButton} setActiveButton={setActiveButton}
                                    onSubmit = {() => {
                                        api.getTemplates().then(x => {
                                            setOrders([...x.items])
                                        });
                                    }}
                />
                <div className="block block-row">
                    <div className="block block-column">
                        {createOrdersTitle(
                            '№ Заказа', 'Название заказа',
                            'Описание', 'Статус', ''
                        )}
                        <CreateCalculationOrders orders={orders}
                                                 activeInfo={activeButtonInfo}
                                                 setActiveInfo={setActiveButtonInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

