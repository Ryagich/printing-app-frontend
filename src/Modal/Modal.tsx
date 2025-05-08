import React, {useEffect, useState} from 'react';
import '../cssFiles/modal.css';
import {api} from "../apiService";
import {TemplateRequest} from "../DTOs";
import {TemplateWithDescription} from "../Models/Models";

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    template: TemplateWithDescription;
    onTemplateChanged: (t: TemplateWithDescription) => void;
    onSubmit: () => void;
}

interface ModalTemplateCreateProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, template, onTemplateChanged, onSubmit }) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    
    if (!isOpen) return null;
    return (
        <div className="modal-backdrop">
            <div className="modal-window">
                <div className="modal-container">
                    <div className="modal-header">
                        <button onClick={onClose} className="modal-back-button">←</button>
                        <h2 className="modal-title">Создание расчета</h2>
                    </div>
                    <div className="modal-form-grid">
                        <div className="form-col-1">
                            <label className="form-label">Название:</label>
                            <input 
                                type="text" 
                                value={template.name}
                                onChange={e => {
                                    const nn = e.currentTarget.value
                                    onTemplateChanged({...template, name: nn});
                                }}
                                className="form-input input-style" 
                            />
                            <label className="form-label">Описание:</label>
                            <textarea
                                value= {template.description}
                                onChange={e => {
                                    const nd = e.currentTarget.value
                                    onTemplateChanged({...template, description: nd});
                                }}
                                className="form-textarea input-style"
                            />
                        </div>

                        <div className="form-col-2">
                            <label className="form-label">Дата заказа:</label>
                            <input type="text" 
                                   value="23.03.2025" 
                                   readOnly 
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Дата готовности заказа:</label>
                            <input type="text" 
                                   value="02.04.2025" 
                                   readOnly 
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Тираж:</label>
                            <input type="text" 
                                   value="100" 
                                   readOnly 
                                   className="form-input input-style small gray-background" />
                        </div>

                        <div className="form-col-3">
                            <label className="form-label">Время заказа:</label>
                            <input type="text" 
                                   value="10:09" 
                                   readOnly 
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Время готовности заказа:</label>
                            <input type="text" 
                                   value="16:30" 
                                   readOnly 
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Цветность:</label>
                            <input type="text" 
                                   value="---" 
                                   readOnly 
                                   className="form-input input-style small gray-background" />
                        </div>

                        <div className="form-col-4">
                            <label className="form-label">Менеджер:</label>
                            <input type="text" 
                                   value="Иванов Иван Иванович" 
                                   readOnly 
                                   className="form-input input-style gray-background" />
                            <label className="form-label">Клиент:</label>
                            <input type="text" 
                                   value="Иванов Иван Иванович" 
                                   readOnly 
                                   className="form-input input-style gray-background" />
                            <div style={{ flexGrow: 1 }}></div>
                            <button className="submit-button" onClick={() => {
                                onSubmit();
                                onClose?.();
                            }}>Подтвердить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const ModalTemplateCreate: React.FC<ModalTemplateCreateProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    if (!isOpen) return null;
    return (
        <div className="modal-backdrop">
            <div className="modal-window">
                <div className="modal-container">
                    <div className="modal-header">
                        <button onClick={onClose} className="modal-back-button">←</button>
                        <h2 className="modal-title">Создание расчета</h2>
                    </div>
                    <div className="modal-form-grid">
                        <div className="form-col-1">
                            <label className="form-label">Название:</label>
                            <input
                                type="text"
                                onChange={e => {
                                    setName(e.currentTarget.value)
                                }}
                                className="form-input input-style"
                            />
                            <label className="form-label">Описание:</label>
                            <textarea
                                onChange={e => {
                                    setDescription(e.currentTarget.value)
                                }}
                                className="form-textarea input-style"
                            />
                        </div>

                        <div className="form-col-2">
                            <label className="form-label">Дата заказа:</label>
                            <input type="text"
                                   value="23.03.2025"
                                   readOnly
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Дата готовности заказа:</label>
                            <input type="text"
                                   value="02.04.2025"
                                   readOnly
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Тираж:</label>
                            <input type="text"
                                   value="100"
                                   readOnly
                                   className="form-input input-style small gray-background" />
                        </div>

                        <div className="form-col-3">
                            <label className="form-label">Время заказа:</label>
                            <input type="text"
                                   value="10:09"
                                   readOnly
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Время готовности заказа:</label>
                            <input type="text"
                                   value="16:30"
                                   readOnly
                                   className="form-input input-style small gray-background" />
                            <label className="form-label">Цветность:</label>
                            <input type="text"
                                   value="---"
                                   readOnly
                                   className="form-input input-style small gray-background" />
                        </div>

                        <div className="form-col-4">
                            <label className="form-label">Менеджер:</label>
                            <input type="text"
                                   value="Иванов Иван Иванович"
                                   readOnly
                                   className="form-input input-style gray-background" />
                            <label className="form-label">Клиент:</label>
                            <input type="text"
                                   value="Иванов Иван Иванович"
                                   readOnly
                                   className="form-input input-style gray-background" />
                            <div style={{ flexGrow: 1 }}></div>
                            <button className="submit-button" onClick={
                                () => {
                                if (name !== undefined && description !== undefined) {
                                    api.createTemplate({name, description}).then(() => onSubmit?.())
                                    onClose?.()
                                }
                            }}>Подтвердить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};