import React, {useEffect, useState} from 'react'
import '../App.css';
import '../cssFiles/order.css';
import {
    CreateTemplateOrders,
    createOrdersTitle,
    CreateTitleButtons,
    OrderTitleButtons, 
    GetMainTitle
} from './OrderPagesCreator';
import {api} from "../apiService";
import {TemplateWithDescription} from "../Models/Models";

export function GetTemplatePage() {
    const [activeButton, setActiveButton] = useState<OrderTitleButtons>('Шаблон');
    const [orders, setOrders] = useState<TemplateWithDescription[]>([]);
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: 'Редактировать' | 'Тех. Карта' } | null>(null);
    
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
                            '№ Шаблона', 'Название шаблона',
                            'Описание', '', ''
                        )}
                        <CreateTemplateOrders orders={orders}
                                              activeInfo={activeButtonInfo}
                                              setActiveInfo={setActiveButtonInfo}
                                              onSubmit={() => {
                                                  api.getTemplates().then(x => {
                                                      setOrders([...x.items])
                                                  });
                                              }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

