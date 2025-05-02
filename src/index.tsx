import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GetTemplatePage} from './Pages/TemplatePage';
import {GetCalculationPage} from './Pages/CalculationPage';
import {GetPassportPage, GetPassportPageMore} from './Pages/PassportPage';
import {GetTechnologicalMapPage} from "./Pages/TechnologicalMapPage";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, replace, Navigate} from "react-router";
import {GetLogInPage, GetRegisterPage} from "./Pages/LogInPage";
import {GetMaterialPage} from "./Pages/MaterialPage";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/TemplatePage" replace />} />
            <Route path="/TemplatePage" element={<GetTemplatePage />} />
            <Route path="/CalculationPage" element={<GetCalculationPage />} />
            <Route path="/PassportPage" element={<GetPassportPage />} />
            <Route path="/PassportPageMore" element={<GetPassportPageMore />} />
            <Route path="/TechnologicalMapPage" element={<GetTechnologicalMapPage />} />
            <Route path="/LogInPage" element={<GetLogInPage />} />
            <Route path="/RegistrationPage" element={<GetRegisterPage />} />
            <Route path="/MaterialPage" element={<GetMaterialPage />} />
        </Routes>
    </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
