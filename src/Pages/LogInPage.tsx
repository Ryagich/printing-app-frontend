import '../cssFiles/passport.css';
import '../cssFiles/inputStyles.css';
import '../App.css'
import '../cssFiles/Titles.css';
import '../cssFiles/Elements.css';

import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {api} from "../apiService";

export function GetLogInPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return <div className="App">
        <div className="block block-row">
            <div className="block block-column content-middle">
                <div className="block block-column content-middle white-container">
                    <div className="block block-row bold-text-24">
                        Вход
                    </div>
                    <div className="block block-column ">
                        <div className="block block-row bold-text-16">
                            Логин
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your login"
                            className="form-input input-style"
                            value={login}
                            onChange={l => setLogin(l.target.value)}
                        />
                    </div>
                    <div className="block block-column ">
                        <div className="block block-row bold-text-16">
                            Пароль
                        </div>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="form-input input-style"
                            value={password}
                            onChange={p => setPassword(p.target.value)}
                        />
                    </div>
                    <button className="main-button"
                            onClick={
                                async () => {
                                    try {
                                        const response = await api.loginRequest({login, password});
                                        api.setAuthHeader(response.token);
                                        navigate("/TemplatePage");
                                    }
                                    catch { }
                                }}>
                        Войти
                    </button>
                    <div className="block block-row normal-text-14">
                        <div> Нет Аккаунта?</div>
                        <a
                            onClick={
                                () => {
                                    navigate("/RegistrationPage");
                                }}>
                            Регистрация
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export function GetRegisterPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    return <div className="App">
        <div className="block block-row">
            <div className="block block-column content-middle">
                <div className="block block-column content-middle white-container">
                    <div className="block block-row bold-text-24">
                        Регистрация
                    </div>
                    <div className="block block-column ">
                        <div className="block block-row bold-text-16">
                            Логин
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your login"
                            className="form-input input-style"
                            value={login}
                            onChange={l => setLogin(l.target.value)}
                        />
                    </div>
                    <div className="block block-column ">
                        <div className="block block-row bold-text-16">
                            Пароль
                        </div>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="form-input input-style"
                            value={password}
                            onChange={p => setPassword(p.target.value)}
                        />
                    </div>
                    <button className="main-button"
                            onClick={
                                async () => {
                                    try {
                                        const response = await api.registrationRequest({login, password});
                                        //api.setAuthHeader(response.token);
                                        navigate("/LogInPage");
                                    }
                                    catch { }
                                }}>
                        Зарегистрироваться
                    </button>
                    <div className="block block-row">
                        <div className="normal-text-14"> Уже есть аккаунт?</div>
                        <a
                            onClick={
                                () => {
                                    navigate("/LogInPage");
                                }}>
                            Войти
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
