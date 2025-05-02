import React, {useState} from 'react'
import '../App.css';
import '../cssFiles/order.css';
import {GetMainTitle, CreateCalculationOrders, createOrdersTitle, CreateTitleButtons, Order, OrderTitleButtons} from './OrderPagesCreator';

type ButtonsName = 'Редактировать' | 'Паспорт'

export function GetCalculationPage() {
    const [activeButton, setActiveButton] = useState<OrderTitleButtons>('Расчёт');
    const [orders] = useState<Order[]>([
        {Name: 'Брошюра А4', Description: 'Печать брошюры 12 стр.', Status: 'Расчёт'},
        {Name: 'Каталог', Description: 'Печать 100 стр. с обложкой', Status: 'Расчёт'},
        {Name: 'Листовка', Description: 'Цветная печать, 500 шт.', Status: 'Расчёт'},
        {Name: 'Визитки', Description: '1000 визиток, двусторонние', Status: 'Расчёт'},
    ]);
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: ButtonsName } | null>(null);

    return (
        <div className="App">
            <div className="block block-column">
                {GetMainTitle("Система печати")}
                <CreateTitleButtons buttonLabels={['Шаблон', 'Расчёт', 'Проверенные']}
                                    activeButton={activeButton} setActiveButton={setActiveButton}/>
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

