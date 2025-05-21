import React, {useEffect, useState} from "react";
import {api} from "../apiService";
import {Material, Operation, TemplateWithDescription} from "../Models/Models";
import {GetProfileMenu} from "./OrderPagesCreator";
import {useNavigate} from "react-router-dom";
import {GetMaterialByIdResponse} from "../DTOs";

type ButtonsName = 'Редактировать' | 'Редактировать2'

export function GetOperationPage(){
    const [operations, setOperations] = useState<Operation[]>([]);
    const [activeButtonInfo, setActiveButtonInfo]
        = useState<{ orderIndex: number; button: ButtonsName } | null>(null);
    
    useEffect(() => {
        api.getAllOperations().then(x =>{
            setOperations([...x.items])
        });
    }, []);
    
    return (
        <div className="App">
            <div className="block block-column">
                {GetMainTitle(() => {
                    api.getAllOperations().then(x => {
                        setOperations([...x.items])
                    });
                })}
                <div className="block block-row">
                    <div className="block block-column">
                        {createOperationsTitle()}
                        <CreateCalculationOrders operations={operations}
                                                 activeInfo={activeButtonInfo}
                                                 setActiveInfo={setActiveButtonInfo}
                                                 onSubmit={() => api.getAllOperations().then(x => {
                                                     setOperations([...x.items])
                                                 })}
                                                 onDelete={() => api.getAllOperations().then(x => {
                                                     setOperations([...x.items])
                                                 })}
                                                 onAdd={() => api.getAllOperations().then(x => {
                                                     setOperations([...x.items])
                                                 })}
                                                 onCreateNewMaterial={() => api.getAllOperations().then(x => {
                                                     setOperations([...x.items])
                                                 })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
function createOperationsTitle() {
    return <div className="block block-row white-container height-2 content-middle">
        <div className="content-middle flex-1 bold-text-20 ellipsis">Имя</div>
        <div className="content-middle flex-1 bold-text-20 ellipsis">%Дефекта</div>
        <div className="content-middle flex-1 bold-text-20 ellipsis">Отрезаемые части</div>
        <div className="content-middle flex-1 bold-text-20 ellipsis">Собираемые части</div>
        <div className="content-middle flex-1 bold-text-20 ellipsis">Материалы</div>
        <div className="content-middle flex-1 bold-text-20 ellipsis">Параметры</div>
    </div>
}

function GetMainTitle(onSubmit: () => void) {
    return  <div className="block block-row">
        <div className="flex-1 content-left">
            {GetLeftTitleButtons(onSubmit)}
        </div>
        <div className="flex-1 page-header-title content-middle ellipsis">
            Операции
        </div>
        <div className="flex-1 content-right">
            {GetProfileMenu()}
        </div>
    </div> 
}

function GetLeftTitleButtons(onSubmit: () => void) {
    const navigate = useNavigate();
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
        {<OperationCreateModal isOpen={isModalOpen}
                              onClose={() => {
                                  setIsModalOpen(false)
                              }}
                              onSubmit={() => {onSubmit?.()}}
        />
        }
    </div>
}
interface OperationsProps {
    operations: Operation[],
    activeInfo: { orderIndex: number; button: string } | null,
    setActiveInfo: any
    onSubmit: () => void;
    onDelete: () => void;
    onAdd: () => void;
    onCreateNewMaterial: () => void;
}
function CreateCalculationOrders(operationsProps: OperationsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [operationId, setOperationIdId] = useState<string>() 
    
    return <>
        {operationsProps.operations.map((op, index) => (
            <div key={op.id} className="block block-row white-container height-2 hover-transparent hover-light-green hide-children">
                {CreateTexts(operationsProps.operations[index])}
                <div className="content-middle cell-more">
                    <button
                        className={`order-button ${operationsProps.activeInfo?.orderIndex === index
                        && operationsProps.activeInfo?.button === 'Редактировать' ? 'active' : ''}`}
                        onClick={() => {
                                setIsModalOpen(true)
                                setOperationIdId(op.id)
                                operationsProps.setActiveInfo({orderIndex: index, button: 'Редактировать'})
                            }}
                    > Редактировать
                    </button>
                    <button
                        className={`order-button disable`}
                    > Редактировать
                    </button>
                </div>
            </div>
        ))}
        {operationId !== undefined ? <ChangeMaterialInOperationModal 
                               isOpen={isModalOpen}
                               operation = {operationsProps.operations.find(x => (x.id === operationId))!}
                               onClose={() => {setIsModalOpen(false)}}
                               onOpen={() => {setIsModalOpen(true)}}
                               onDelete={() => {operationsProps.onDelete()}}
                               onAdd={() => {operationsProps.onAdd()}}
                               onSubmit={() => {operationsProps.onSubmit()}}
                               onCreateNewMaterial ={() => {operationsProps.onCreateNewMaterial()}}
        /> 
            : <div></div>
        }
    </>
}
function CreateTexts(operation: Operation) {
    return <>
        <div className="content-middle flex-1 bold-text-16 ellipsis">{operation.name}</div>
        <div className="content-middle flex-1 bold-text-16 ellipsis">{operation.defectsPercentage}</div>
        <div className="content-middle flex-1 bold-text-16 ellipsis">{operation.cuttingParts}</div>
        <div className="content-middle flex-1 bold-text-16 ellipsis">{operation.assemblyParts}</div>
    </>
}

const MaterialCreateModal = ({isOpen, onClose, onCreateNewMaterial, onOpenMainModal}
                          : {isOpen: boolean, onClose?: () => void, onCreateNewMaterial: () => void, onOpenMainModal: () => void}) => {
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
                            if (name !== undefined && price !== undefined) {
                                api.createMaterial({name, price}).then(() => {
                                    onCreateNewMaterial()
                                    onOpenMainModal()
                                    onClose?.()
                                })
                            }
                        }}>Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const ChangeMaterialInOperationModal = ({isOpen, onClose, onOpen, operation, onDelete, onAdd, onCreateNewMaterial} 
                                     : {isOpen: boolean, operation: Operation, onClose?: () => void, onOpen?: () => void,
                                        onDelete: () => void, onAdd: () => void, onSubmit: () => void, onCreateNewMaterial: () => void}) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [materials, setMaterials] = useState<Material[]>()
    
    useEffect(() => {
        api.getMaterials().then(x =>{
            setMaterials([...x.items])
        });
    }, []);
    if (!isOpen) return null;
    return <div className="modal-backdrop">
        <div className="modal-window">
            <div className="material-modal-container">
                <div className="block block-column-0-padding">
                    <div className="block block-row-0-padding">
                        <button 
                                onClick={onClose}>←</button>
                        <div className="content-middle bold-text-16 ellipsis">Материалы Операции</div>
                    </div>
                        {operation.materialIds.map(id => {
                        return id !== undefined ? <DrawMaterial key={id} id={id} idOperation={operation.id}
                                                                onDelete={() => {
                                                                    onDelete()
                                                                    api.getMaterials().then(x => {
                                                                        setMaterials([...x.items])
                                                                    });
                                                                }}/> : <>Loading...</>
                        })}
                    <div className="block block-row-0-padding content-middle">
                        <button className="main-button"
                                onClick={() => {
                                    setIsCreateModalOpen(true)
                                }}>
                            Создать новый
                        </button>
                        <button className="main-button"
                                onClick={() => {
                                    setIsAddModalOpen(true);
                                }}>
                            Добавить в операцию
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {materials !== undefined ? <AddMaterialsInOperation
                isOpen={isAddModalOpen}
                onClose={() => {setIsAddModalOpen(false)}}
                onAdd={onAdd}
                onOpenMainModal={() => onOpen}
                materials = {materials}
                operation = {operation}
            />
            : <div></div>
        }
        {<MaterialCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => {setIsCreateModalOpen(false)}}
                onOpenMainModal={() => onOpen}
                onCreateNewMaterial={() => {
                    onCreateNewMaterial()
                    api.getMaterials().then(x =>{
                        setMaterials([...x.items])
                    });
                }}
        />}
    </div>
}

const AddMaterialsInOperation = ({isOpen, onClose, onAdd, onOpenMainModal, materials, operation} 
                              : {isOpen : boolean, onClose: () => void, onAdd: () => void, onOpenMainModal: () => void, materials: Material[],
                                 operation: Operation}) => {
    if (!isOpen) return null;
    const materialsInOperation = operation.materialIds
    
    return <div className="modal-backdrop">
        <div className="modal-window">
            <div className="material-modal-container">
                <div className="block block-column-0-padding">
                    <div className="block block-row-0-padding">
                        <button onClick={() => {
                            onClose();
                            onOpenMainModal()
                        }}>
                            ←
                        </button>
                        <div className="content-middle bold-text-16 ellipsis">Существующие материалы</div>
                    </div>
                    {materials.map(material => {
                        return material !== undefined && !materialsInOperation.includes(material.id) 
                            ? <DrawAvailableMaterials material = {material} operationId = {operation.id} onAdd ={onAdd}/> : <></>
                    })}
                </div>
            </div>
        </div>
    </div>
}

const DrawAvailableMaterials = ({operationId, material, onAdd} 
                             : {operationId: string, material: Material, onAdd: () => void}) => {
    return <>{material === undefined ? <>Loading...</> :
        <div className="block block-row">
            <div className="block block-column-0-padding content-left">
                <div className="bold-text-14">{material.name}</div>
            </div>
            <div className="block block-column-0-padding content-middle">
                <button className="main-button-0-padding"
                        onClick={() => api.addMaterialInOperation(operationId, material.id).then(() => {onAdd()})}
                >+</button>
            </div>
        </div>
    }</>
}

const DrawMaterial = ({id, idOperation, onDelete} : {id: string, idOperation: string, onDelete: () => void}) => {
    const [material, setMaterial] =  useState<GetMaterialByIdResponse>()
    useEffect(() => {
        api.getMaterialById(id).then(x =>{
            setMaterial(x)
        });
    }, []);
    
    return <>{material === undefined ? <>Loading...</> :
    <div className="block block-row">
        <div className="block block-column-0-padding content-left">
            <div className="bold-text-14">{material.name}</div>
        </div>
        <div className="block block-column-0-padding content-middle">
            <button className="main-button-0-padding"
            onClick={ () => api.removeMaterialInOperation(idOperation, id).then(() => {onDelete()})}
            >×</button>
        </div>
    </div>
}</>
}

interface OperationAddModelProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit: () => void;
}
const OperationCreateModal = ({isOpen, onClose, onSubmit} : OperationAddModelProps) => {
    const [name, setName] = useState<string>();
    const [cuttingParts, setCuttingParts] = useState<number>();
    const [assemblyParts, setAssemblyParts] = useState<number>();
    const [defectsPercentage, setDefectsPercentage] = useState<number>();
    const [circulation, setCirculation] = useState<number>();
    const [colorNumbers, setColorNumbers] = useState<number>();

    if (!isOpen) return null;
    return <div className="modal-backdrop">
        <div className="modal-window">
            <div className="material-modal-container">
                <div className="block block-column-0-padding">
                    <div className="block block-row-0-padding">
                        <button onClick={onClose}>←</button>
                        <div className="content-middle bold-text-16 ellipsis">Создание Операции</div>
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
                            <div className="bold-text-14">Выход:</div>
                            <input
                                type="number"
                                onChange={e => {
                                    const x = e.currentTarget.value
                                    setCuttingParts(Number(x));
                                }}
                                className="form-input-vertical input-style "
                            />
                        </div>
                    </div>
                    <div className="block block-row-0-padding">
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Операций:</div>
                            <input
                                type="number"
                                onChange={e => {
                                    const x = e.currentTarget.value
                                    setAssemblyParts(Number(x));
                                }}
                                className="form-input-vertical input-style"
                            />
                        </div>
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Брак:</div>
                            <input
                                type="number"
                                onChange={e => {
                                    const c = e.currentTarget.value
                                    setDefectsPercentage(Number(c));
                                }}
                                className="form-input-vertical input-style "
                            />
                        </div>
                    </div>
                    <div className="block block-row-0-padding">
                        <div className="block block-column-0-padding content-middle flex-1">
                            <div className="bold-text-14">Тираж:</div>
                            <input
                                type="number"
                                onChange={e => {
                                    const x = e.currentTarget.value
                                    setCirculation(Number(x));
                                }}
                                className="form-input-vertical input-style"
                            />
                        </div>
                    </div>
                    <div className="block block-row-0-padding">
                        <button className="submit-button" onClick={() => {
                            if (name !== undefined && cuttingParts !== undefined 
                                                   && assemblyParts !== undefined
                                                   && defectsPercentage !== undefined
                                                   && circulation !== undefined
                                                   && colorNumbers !== undefined)
                                api.createOperation({name, cuttingParts,assemblyParts,defectsPercentage,
                                                     circulation,colorNumbers}).then(() => onSubmit?.())
                        }}>Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
