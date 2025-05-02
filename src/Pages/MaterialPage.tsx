import {GetMainTitle} from "./OrderPagesCreator";

export function GetMaterialPage() {
    return <div className="App">
        <div className='block block-column'>
            {GetMainTitle("Материалы")}
        </div>
    </div>
}
