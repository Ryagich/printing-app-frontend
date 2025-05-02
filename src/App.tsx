import './App.css';
import './cssFiles/order.css';
import {GetTemplatePage} from './Pages/TemplatePage';
import {GetCalculationPage} from './Pages/CalculationPage';
import {GetPassportPage} from './Pages/PassportPage';

function App() {
    return GetPassportPage();
    // return GetTemplatePage();
}

export default App;
