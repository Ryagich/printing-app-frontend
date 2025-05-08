import '../App.css';
import '../cssFiles/order.css';
import { useNavigate } from 'react-router-dom';
import React, {JSX, useState } from "react";
import {TemplateWithDescription} from "../Models/Models";
import {Modal, ModalTemplateCreate} from "../Modal/Modal";
import {api} from "../apiService";

export type OrderTitleButtons =  '+' | 'Шаблон'  |  'Расчёт'  |  'Проверенные';

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

interface OrdersProps {
    orders: TemplateWithDescription[], 
    activeInfo: { orderIndex: number; button: string } | null, 
    setActiveInfo: any
    onSubmit?: () => void;
}    

export function CreateTemplateOrders(ordersProps: OrdersProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [template, changeTemplate] = useState<TemplateWithDescription>()
    const navigate = useNavigate();
    
    return <>{ordersProps.orders.map((order, index) => (
        <div key={index} className="block block-row white-container height-2 hover-transparent hover-light-green hide-children">
            {CreateTexts(index + 1, ordersProps.orders[index])}
            <div className="content-middle cell-more">
                <button
                    className={`order-button ${ordersProps.activeInfo?.orderIndex === index 
                    && ordersProps.activeInfo?.button === 'Редактировать' ? 'active' : ''}`}
                    onClick={
                    () => {
                        ordersProps.setActiveInfo({orderIndex: index, button: 'Редактировать'})
                        setIsModalOpen(true);
                        changeTemplate(order);
                    }}
                > Редактировать
                </button>
                <button
                    className={`order-button ${ordersProps.activeInfo?.orderIndex === index
                    && ordersProps.activeInfo?.button === 'Тех. Карта' ? 'active' : ''}`}
                    onClick={
                    () => {
                        ordersProps.setActiveInfo({orderIndex: index, button: 'Тех. Карта'});
                        navigate(`/TechnologicalMapPage/${order.id}`);
                    }}
                >Тех. Карта
                </button>
            </div>
        </div>
    ))}
        {template &&
            <Modal template={template}
                   onTemplateChanged={changeTemplate}
                   onSubmit={() => {
                       api.changeTemplateById(template.id, template).then(() => ordersProps.onSubmit?.())
                   }}
                   isOpen={isModalOpen} onClose={() => {
                        setIsModalOpen(false);
                        changeTemplate(undefined);
                   }}
            />
        }
    </>
}
export function CreateCalculationOrders(ordersProps: OrdersProps) {
    const navigate = useNavigate();
    
    return <>{ordersProps.orders.map((order, index) => (
        <div key={index} className="block block-row white-container height-2 hover-transparent hover-light-green ">
            {CreateTexts(index + 1, ordersProps.orders[index])}
            <div className="content-middle cell-more ">
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
                            navigate(`/PassportPage/${order.id}`);
                        }}
                > Паспорт
                </button>
            </div>
        </div>
    ))}
    </>
}

function CreateTexts(index: number, order: TemplateWithDescription) {
    return <>
        <div className="content-middle cell-id bold-text-16 ellipsis">{index}</div>
        <div className="content-middle cell-name bold-text-16 ellipsis">{order.name}</div>
        <div className="content-middle cell-description bold-text-16 ellipsis">{order.description}</div>
        <div className="content-middle cell-status bold-text-16 ellipsis">"Жду Статус"</div>
    </>
}

interface ButtonLabel {
    buttonLabels: OrderTitleButtons[],
    activeButton: OrderTitleButtons,
    setActiveButton: (text: OrderTitleButtons) => void
    onSubmit: () => void
}
export function GetMainTitle(name: string) {
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
export function GetProfileMenu() {
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
                    <button className="main-button-0-padding"
                            onClick={() => {
                                navigate("/OperationPage");
                            }}>
                        Операции
                    </button>
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return <div>
        <div className="block block-row content-middle">
            
            {ButtonLabel.buttonLabels.map((text) => (
                <button
                    key={text}
                    className={`main-button ${text === 'Расчёт' ? 'disable' : '' } `}
                    onClick={() => {
                        if (text === '+')
                            setIsModalOpen(true)
                    }}
                    //className={`main-button ${ButtonLabel.activeButton === text ? 'active' : ''}`}
                    // onClick={() => {
                    //     ButtonLabel.setActiveButton(text)
                    //     if (text === 'Расчёт') navigate("/CalculationPage");
                    //     if (text === 'Шаблон') navigate("/TemplatePage");
                    //     if (text === '+') {
                    //         {setIsModalOpen(true)}
                    //     }
                    // }}
                    >
                    {text}
                </button>)
            )}
            
            {<ModalTemplateCreate
                    onSubmit = {() => {ButtonLabel.onSubmit?.()}}
                    isOpen = {isModalOpen} 
                    onClose={() => { setIsModalOpen(false)}}
             />
            }
        </div>
    </div>
}