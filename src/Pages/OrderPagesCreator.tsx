import '../App.css';
import '../cssFiles/order.css';
import { useNavigate } from 'react-router-dom';
import React, {JSX, useState } from "react";
import Modal from '../Modal/Modal'

export type Order = {
    Name: string;
    Description: string;
    Status?: string;
}

export type OrderTitleButtons =  'Шаблон'  |  'Расчёт'  |  'Проверенные' | 'Сасал';

export function createOrdersTitle(id?: string, name?: string, description?: string,
                                  status?: string, more?: string)
{
    return <div className="block block-row white-container height-2">
        <div className="content-middle cell-id bold-text-20 ellipsis">{id}</div>
        <div className="content-middle cell-name bold-text-20 ellipsis">{name}</div>
        <div className="content-middle cell-description bold-text-20 ellipsis">{description}</div>
        <div className="content-middle cell-status bold-text-20 ellipsis">{status}</div>
        <div className="content-middle cell-more bold-text-20 ellipsis">{more}</div>
    </div>
}

interface OrdersProps{
    orders: Order[], 
    activeInfo: { orderIndex: number; button: string } | null, 
    setActiveInfo: any
}    

export function CreateTemplateOrders(ordersProps: OrdersProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return <>{ordersProps.orders.map((order, index) => (
        <div key={index} className="block block-row white-container height-2 hover-transparent hover-light-green ">
            {CreateTexts(index + 1, ordersProps.orders[index])}
            <div className="content-middle cell-more order-cell-Object">
                <button
                    className={`order-button ${ordersProps.activeInfo?.orderIndex === index 
                    && ordersProps.activeInfo?.button === 'Редактировать' ? 'active' : ''}`}
                    onClick={
                    () => {
                        ordersProps.setActiveInfo({orderIndex: index, button: 'Редактировать'})
                        setIsModalOpen(true);
                    }}
                > Редактировать
                </button>
                <button
                    className={`order-button ${ordersProps.activeInfo?.orderIndex === index 
                    && ordersProps.activeInfo?.button === 'Создать расчёт' ? 'active' : ''}`}
                    onClick={
                    () => {
                        ordersProps.setActiveInfo({orderIndex: index, button: 'Создать расчёт'});
                    }}
                > Создать расчёт
                </button>
            </div>
        </div>        
    ))}
        <Modal 
            isOpen={isModalOpen} onClose={() => setIsModalOpen(false) }>
        </Modal>
    </>
}

export function CreateCalculationOrders(ordersProps: OrdersProps) {
    const navigate = useNavigate();
    
    return <>{ordersProps.orders.map((order, index) => (
        <div key={index} className="block block-row white-container height-2 hover-transparent hover-light-green ">
            {CreateTexts(index + 1, ordersProps.orders[index])}
            <div className="content-middle cell-more order-cell-Object ">
                <button
                    className={`order-button ${ordersProps.activeInfo?.orderIndex === index
                    && ordersProps.activeInfo?.button === 'Редактировать' ? 'active' : ''}`}
                    onClick={
                        () => {
                            ordersProps.setActiveInfo({orderIndex: index, button: 'Редактировать'})
                        }}
                > Редактировать
                </button>
                <button
                    className={`order-button ${ordersProps.activeInfo?.orderIndex === index
                    && ordersProps.activeInfo?.button === 'Паспорт' ? 'active' : ''}`}
                    onClick={
                        () => {
                            ordersProps.setActiveInfo({orderIndex: index, button: 'Паспорт'});
                            navigate("/PassportPage");
                        }}
                > Паспорт
                </button>
            </div>
        </div>
    ))}
    </>
}

function CreateTexts(index: number, order: Order) {
    return <>
        <div className="content-middle cell-id bold-text-16 ellipsis">{index}</div>
        <div className="content-middle cell-name bold-text-16 ellipsis">{order.Name}</div>
        <div className="content-middle cell-description bold-text-16 ellipsis">{order.Description}</div>
        <div className="content-middle cell-status bold-text-16 ellipsis">{order.Status}</div>
    </>
}

interface ButtonLabel{
    buttonLabels: OrderTitleButtons[],
    activeButton: OrderTitleButtons,
    setActiveButton: (text: OrderTitleButtons) => void
}
export function GetMainTitle(name: string)
{
    return  <div className="block block-row">
        <div className="flex-1">
        </div>
        <div className="flex-1 page-header-title content-middle ellipsis">
            {name}
        </div>
        <div className="flex-1 content-right">
            {GetProfileMenu()}
        </div>
    </div>
}
export function GetProfileMenu()
{
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    return <>
        <button className="main-button"
                onClick={() => setOpen(!isOpen)}>
            Профиль
        </button>
        {isOpen && (
            <div className="lock block-row-0-padding profile-drop-down-menu ">
                <div className="block block-column-0-padding-0-gap">
                    <button className="main-button-0-padding"
                            onClick={() => {
                                navigate("/MaterialPage");
                            }}>
                        Материалы
                    </button>
                    <button className="main-button-0-padding">Операции</button>
                    <button className="main-button-0-padding"
                            onClick={() => {
                                navigate("/LogInPage");
                            }}>
                        Выход
                    </button>
                </div>
            </div>
        )}
    </>
}
export function CreateTitleButtons(ButtonLabel: ButtonLabel) {
    const navigate = useNavigate();
    return <div className="block block-row content-middle">
        {ButtonLabel.buttonLabels.map((text) => (
            <button
                key={text}
                className={`main-button ${ButtonLabel.activeButton === text ? 'active' : ''}`}
                onClick={() => {
                    ButtonLabel.setActiveButton(text)
                    if (text === 'Расчёт') navigate("/CalculationPage");
                    if (text === 'Шаблон') navigate("/TemplatePage");
                }}>
                {text}
            </button>))}
    </div>
}