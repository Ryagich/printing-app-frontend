import React, {useState} from 'react'
import '../App.css';
import '../cssFiles/order.css';
import {
    CreateTemplateOrders,
    createOrdersTitle,
    CreateTitleButtons,
    Order,
    OrderTitleButtons, 
    GetMainTitle
} from './OrderPagesCreator';

export function GetTemplatePage() {
    const [activeButton, setActiveButton] = useState<OrderTitleButtons>('Шаблон');
    const [orders] = useState<Order[]>([
        {Name: 'Брошюра А4', Description: 'Печать брошюры 12 стр.'},
        {Name: 'Каталог', Description: 'Печать 100 стр. с обложкой'},
        {Name: 'Листовка', Description: 'Цветная печать, 500 шт.'},
        {Name: 'Визитки', Description: '1000 визиток, двусторонние'},
    ]);
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: 'Редактировать' | 'Создать расчёт' } | null>(null);

    return (
        <div className="App">
            <div className="block block-column">
                {GetMainTitle("Система печати")}
                <CreateTitleButtons buttonLabels={['Шаблон', 'Расчёт', 'Проверенные']}
                                    activeButton={activeButton} setActiveButton={setActiveButton}/>
                <div className="block block-row">
                    <div className="block block-column">
                        {createOrdersTitle(
                            '№ Шаблона', 'Название шаблона',
                            'Описание', '', ''
                        )}
                        <CreateTemplateOrders orders={orders}
                                              activeInfo={activeButtonInfo}
                                              setActiveInfo={setActiveButtonInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

