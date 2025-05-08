import {GetProfileMenu} from "./OrderPagesCreator";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Material} from "../Models/Models";
import {api} from "../apiService";
import '../cssFiles/MaterialModal.css';

type ButtonsName = 'Паспорт заказа' | 'Подробнее'

export function GetMaterialPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: ButtonsName } | null>(null);

    useEffect(() => {
        api.getMaterials().then(x =>{
            setMaterials([...x.items])
        });
    }, []);
    
    return <div className="App">
        <div className='block block-column'>
            {GetMainTitle(() => {
                api.getMaterials().then(x => {
                    setMaterials([...x.items])
                });
            })}
            <div className="block block-row">
                <div className="block block-column">
                    {CreateMaterialsTitle()}
                    {materials ? <CreateMaterials materials = {materials}
                                                  activeInfo ={activeButtonInfo}
                                                  setActiveInfo ={setActiveButtonInfo}
                                                  onSubmit={() => {
                                                      api.getMaterials().then(x => {
                                                          setMaterials([...x.items])
                                                      });
                                                  }}
                        />
                               : <div>Loading...</div>}
                </div>
            </div>
        </div>
    </div>
}
function GetMainTitle(onSubmit: () => void)
{
    return  <div className="block block-row">
        <div className="flex-1 content-left">
            {GetMiddle(onSubmit)}
        </div>
        <div className="flex-1 page-header-title content-middle ellipsis">
            "Материалы"
        </div>
        <div className="flex-1 content-right">
            {GetProfileMenu()}
        </div>
    </div>
}

function GetMiddle(onSubmit: () => void) {
    const navigate = useNavigate();
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: ButtonsName } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return <div className="block block-row-0-padding align-center">
        <button className="block-button bold-text-24"
                onClick={
                    () => {
                        navigate("/TemplatePage");
                    }}>←
        </button>
        <button className="block-button bold-text-24"
                onClick={
                    () => {
                        setIsModalOpen(true);
                    }}>+
        </button>
        {<MaterialCreateModal isOpen={isModalOpen}
                           onClose={() => {
                               setIsModalOpen(false)
                           }}
                           onSubmit={() => { onSubmit?.()}}
            />
        }
    </div>
}

interface materialProps {
    materials: Material[]
    activeInfo: { orderIndex: number; button: string } | null,
    setActiveInfo: any
    onSubmit?: () => void;
}

function CreateMaterials(materialProps : materialProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [material, setMaterial] = useState<Material>()

    return <>{materialProps.materials.map((material, index) => (
        <div key={index}>
            <div className="block block-row white-container height-2 hover-transparent hover-light-green hide-children">
                {CreateText(material.name, material.price, material)}
                <div className="content-middle cell-more">
                    <button
                        className="order-button"
                        onClick={
                            () => {
                                materialProps.setActiveInfo({orderIndex: index, button: 'Редактировать'})
                                setIsModalOpen(true);
                                setMaterial(material);
                            }}
                    > Редактировать
                    </button>
                </div>
            </div>
        </div>
    ))}
        {material &&
            <MaterialModal material={material}
                           isOpen={isModalOpen}
                           onClose={() => {
                               setIsModalOpen(false)
                               setMaterial(undefined)
                           }}
                           onMaterialChanged={m => setMaterial(m)}
                           onSubmit={() => {
                               api.changeMaterialById(material.id, material).then(() => materialProps.onSubmit?.())
                           }}
            />
        }
    </>
}

function CreateMaterialsTitle() {
    return <div className="block block-row white-container height-2">
        <div className="content-middle cell-id bold-text-20 ellipsis"></div>
        <div className="content-middle cell-name bold-text-20 ellipsis">Имя</div>
        <div className="content-middle cell-description bold-text-20 ellipsis"></div>
        <div className="content-middle cell-status bold-text-20 ellipsis">Цена</div>
        <div className="content-middle cell-more bold-text-20 ellipsis"></div>
    </div>
}

function CreateText(name: string, cost: number, material:Material) {
    return <>
        <div className="content-middle cell-id bold-text-16 ellipsis"></div>
        <div className="content-middle cell-name bold-text-16 ellipsis">{name}</div>
        <div className="content-middle cell-description bold-text-16 ellipsis"></div>
        <div className="content-middle cell-status bold-text-16 ellipsis">{cost}</div>
    </>
}

interface MaterialModalProps {
    material : Material;
    isOpen: boolean;
    onClose?: () => void;
    onMaterialChanged: (t: Material) => void;
    onSubmit: () => void;
}
interface MaterialCreateModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit: () => void;
}
const MaterialCreateModal: React.FC<MaterialCreateModalProps> = ({isOpen, onClose, onSubmit}) => {
    const [name, setName] = useState<string>();
    const [price, setPrice] = useState<number>();
    
    if (!isOpen) return null;
    return <div className="modal-backdrop">
        <div className="modal-window">
            <div className="material-modal-container">
                <div className="block block-column-0-padding">
                    <div className="block block-row-0-padding">
                        <button onClick={onClose}>←</button>
                        <div className="content-middle bold-text-16 ellipsis">Создание Материала</div>
                    </div>
                    <div className="block block-row-0-padding">
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Название:</div>
                            <input
                                onChange={e => {
                                    const nn = e.currentTarget.value
                                    setName(nn);
                                }}
                                className="form-input-vertical input-style"
                            />
                        </div>
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Цена:</div>
                            <input
                                type="number"
                                onChange={e => {
                                    const c = e.currentTarget.value
                                    setPrice(Number(c));
                                }}
                                className="form-input-vertical input-style "
                            />
                        </div>
                    </div>
                    <div className="block block-row-0-padding">
                        <button className="submit-button" onClick={() => {
                            if (name !== undefined && price !== undefined)
                                api.createMaterial({name, price}).then(() => onSubmit?.())
                        }}>Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
const MaterialModal: React.FC<MaterialModalProps> = ({material, isOpen, onClose, onMaterialChanged, onSubmit}) => {
    if (!isOpen) return null;
    return <div className="modal-backdrop">
        <div className="modal-window">
            <div className="material-modal-container">
                <div className="block block-column-0-padding">
                    <div className="block block-row-0-padding">
                        <button onClick={onClose}>←</button>
                        <div className="content-middle bold-text-16 ellipsis">Изменение Материала</div>
                    </div>
                    <div className="block block-row-0-padding">
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Название:</div>
                            <input
                                value={material.name}
                                onChange={e => {
                                    const nn = e.currentTarget.value
                                    onMaterialChanged({...material, name: nn});
                                }}
                                className="form-input-vertical input-style"
                            />
                        </div>
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Цена:</div>
                            <input
                                value={material.price}
                                type="number"

                                onChange={e => {
                                    const c = e.currentTarget.value
                                    onMaterialChanged({...material, price: Number(c)});
                                }}
                                className="form-input-vertical input-style "
                            />
                        </div>
                    </div>
                    <div className="block block-row-0-padding">
                        <button className="submit-button" onClick={() => {
                            onSubmit();
                        }}>Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}