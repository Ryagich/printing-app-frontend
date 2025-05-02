import React from 'react';
import '../cssFiles/modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
                            <input type="text" value="Визитка 4+4" readOnly className="form-input input-style" />
                            <label className="form-label">Описание:</label>
                            <textarea
                                value="90x50 мм, глянцевая, 4+4, тиснение фольгой, скругление 2 мм, 200 шт."
                                readOnly
                                className="form-textarea input-style"
                            />
                        </div>

                        <div className="form-col-2">
                            <label className="form-label">Дата заказа:</label>
                            <input type="text" value="23.03.2025" readOnly className="form-input input-style small" />

                            <label className="form-label">Дата готовности заказа:</label>
                            <input type="text" value="02.04.2025" readOnly className="form-input input-style small" />

                            <label className="form-label">Тираж:</label>
                            <input type="text" value="100" readOnly className="form-input input-style small" />
                        </div>

                        <div className="form-col-3">
                            <label className="form-label">Время заказа:</label>
                            <input type="text" value="10:09" readOnly className="form-input input-style small" />

                            <label className="form-label">Время готовности заказа:</label>
                            <input type="text" value="16:30" readOnly className="form-input input-style small" />

                            <label className="form-label">Цветность:</label>
                            <input type="text" value="---" readOnly className="form-input input-style small" />
                        </div>

                        <div className="form-col-4">
                            <label className="form-label">Менеджер:</label>
                            <input type="text" value="Иванов Иван Иванович" readOnly className="form-input input-style" />

                            <label className="form-label">Клиент:</label>
                            <input type="text" value="Иванов Иван Иванович" readOnly className="form-input input-style  " />

                            <div style={{ flexGrow: 1 }}></div>
                            <button className="submit-button">Подтвердить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
