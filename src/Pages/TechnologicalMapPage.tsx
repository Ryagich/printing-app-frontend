import '../cssFiles/passport.css';
import '../cssFiles/inputStyles.css';
import '../App.css'
import '../cssFiles/Titles.css';
import '../cssFiles/Elements.css';

import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';

export function GetTechnologicalMapPage() {
    const navigate = useNavigate();
    return <>
        <div className="block block-column  ">
            <div className="block block-row">
                <button className="main-button"
                        onClick={
                            () => {
                                navigate("/CalculationPage");
                            }}>← Вернуться
                </button>
            </div>
        </div>
        <div className="white-container">
            <div className="block block-column align-center">
                <div className="block block-row bold-text-24">Технологическая карта:</div>
                <div className="block block-row align-center">
                    <div className="main-button">Допечатные работы ˅</div>
                    <div className="main-button">Контрагенты ˅</div>
                    <div className="main-button">Общие ˅</div>
                    <div className="main-button">Печать ˅</div>
                    <div className="main-button">Поспечатные работы ˅</div>
                    <div className="main-button">Препресс ˅</div>
                </div>
            </div>
            <div className="block block-column align-center">
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 1</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 2.1</div>
                    <div className="main-button">Тестовая операция 2.2</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 3</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 4</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 5</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 6</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 7</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Тестовая операция 8</div>
                </div>
                <div className="block block-row">
                    <div className="main-button">Результат</div>
                </div>
            </div>
        </div>
    </>
}