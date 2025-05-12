import '../cssFiles/passport.css';
import '../cssFiles/inputStyles.css';
import '../App.css'
import '../cssFiles/Titles.css';
import '../cssFiles/Elements.css';

import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {GetProfileMenu} from "./OrderPagesCreator";
import {api} from "../apiService";
import {GetMaterialByIdResponse, GetOperationByIdResponse, GetTemplateByIdResponse} from "../DTOs";
import {Operation, Step} from "../Models/Models";

export function GetTechnologicalMapPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [template, setTemplate] = useState<GetTemplateByIdResponse>()
    const [leftModalsIsOpen, setLeftModalsIsOpen] = useState(false)
    const [isAddOperationModalOpen, setAddOperationModalOpen] = useState(false)
    const [leftNameModalsIsOpen, setLeftNameModalsIsOpen] = useState(false)
    const [isNameAddOperationModalOpen, setIsNameAddOperationModalOpen] = useState(false)
    const [canAddElderOperation, setCanAddElderOperation] = useState(false)
    const [canAddYoungestOperation, setCanAddYoungestOperation] = useState(false)
    const [rightModalIsOpen, setRightModalIsOpen] = useState(false)
    const [currentOperationId, setCurrentOperationId] = useState<string>()
    const [currentStepId, setCurrentStepId] = useState<string>()
    const handleStepSelect = (stepId: string, operationId: string) => {
        setCurrentStepId(stepId);
        setCurrentOperationId(operationId);
    }
    useEffect(() => {
        api.getTemplateById(id!).then(x => {
            setTemplate(x)
        });
    }, []);

    return (id === undefined || !template ? <>Loading...</> :
            <>
                <div className="App">
                    <div className="block block-column">
                        <GetMainTitle/>
                        <div className="block block-row content-middle">
                            <GetNameButton template={template} 
                                           onClick={() => {
                                setLeftNameModalsIsOpen(true);
                                setCanAddElderOperation(false);
                                setCanAddYoungestOperation(true);
                            }}/>
                        </div>
                        {<CreateSteps steps={template?.steps}
                                      onStepSelect={(stepId: string, operationId: string) => {
                                          setLeftModalsIsOpen(true);
                                          setCanAddElderOperation(true);
                                          setCanAddYoungestOperation(true);
                                          setRightModalIsOpen(true)
                                          handleStepSelect(stepId, operationId);
                                      }}
                        />
                        }
                    </div>
                </div>
                <LeftButtons
                    isOpen={leftModalsIsOpen}
                    canAddElderOperation={canAddElderOperation}
                    canAddYoungestOperation={canAddYoungestOperation}
                    onAddedModal={() => setAddOperationModalOpen(true)}
                />        
                <LeftButtons
                    isOpen={leftNameModalsIsOpen}
                    canAddElderOperation={canAddElderOperation}
                    canAddYoungestOperation={canAddYoungestOperation}
                    onAddedModal={() => setIsNameAddOperationModalOpen(true)}
                />
                <AddOperationModal
                    isOpen={isAddOperationModalOpen}
                    onClose={() => setAddOperationModalOpen(false)}
                    onAddOperation={() => api.getTemplateById(id!).then(x => {setTemplate(x)})}
                    templateId={id}
                    stepId={currentStepId!}
                />
                <AddOperationModal
                    isOpen={isNameAddOperationModalOpen}
                    onClose={() => setIsNameAddOperationModalOpen(false)}
                    onAddOperation={() => {
                        api.getTemplateById(id!).then(x => {
                            setTemplate(x)
                        })
                        setLeftNameModalsIsOpen(false)
                        setIsNameAddOperationModalOpen(false)
                    }}
                    templateId={id}
                    stepId={""}
                />
                <RightOperationInfo isOpen={rightModalIsOpen}
                                    id ={currentOperationId!}
                />
            </>
    );
}
const GetNameButton = ({template, onClick} : {template: GetTemplateByIdResponse, onClick: () => void}) => {
    return (
        <>
            <button
                className="tech-button"
                onClick={() => {
                    if (template?.steps.length === 0) {
                        onClick();
                    }
                }}>
                {template?.name}
            </button>
        </>
    );
}

const CreateSteps = ({steps, onStepSelect} 
                  : {steps : Step[], onStepSelect: (stepId: string, operationId: string) => void}) => {
    const maxLevel = Math.max(...steps.map(step => step.level));
    const groupedSteps: Step[][] = Array.from({ length: maxLevel + 1 }, () => []);
    
    for (const step of steps) {groupedSteps[step.level].push(step);}

    return <>
        {groupedSteps.map((ss, level) => (<>
                <div className="block block-row content-middle" key={level}>
                    {ss.map((step) => (<>
                            <GetOperationButton key={step.id}
                                                stepId ={step.id}
                                                operationId={step.operationId}
                                                onClick={onStepSelect}
                            />
                        </>
                    ))}
                </div>
            </>
        ))}
    </>
}

const GetOperationButton = ({stepId, operationId, onClick} 
                         : {stepId: string, operationId: string, onClick: (stepId: string, operationId: string) => void}) => {
    const [operation, SetOperation] = useState<GetOperationByIdResponse>()

    useEffect(() => {
        api.getOperationById(operationId).then(x => {
            SetOperation(x)
        });
    }, []);
    if (operation === undefined) return null;
    return <button
                className="tech-button"
                onClick={() => {
                    onClick(stepId, operationId);
                }}>
                {operation.name}
            </button>
}

function GetMainTitle() {
    const navigate = useNavigate();
    return <div className="block block-row">
        <div className="flex-1 content-left">
            <div className="block block-row-0-padding align-center">
                <button className="block-button bold-text-24"
                        onClick={
                            () => {
                                navigate("/TemplatePage");
                            }}>←
                </button>
            </div>
        </div>
        <div className="flex-1 page-header-title content-middle ellipsis">
            Технологическая карта
        </div>
        <div className="flex-1 content-right">
            <GetProfileMenu/>
        </div>
    </div>
}

const LeftButtons = ({isOpen, canAddElderOperation, canAddYoungestOperation, onAddedModal}
                         : {
    isOpen: boolean, canAddElderOperation: boolean, canAddYoungestOperation: boolean,
    onAddedModal: () => void
}) => {
    if (!isOpen) return null;
    return <>
        <div className="block block-row-0-padding left-drop-down-menu ">
            <div className="block block-column-0-padding-0-gap">
                {canAddElderOperation && false ?
                    <button className="tech-button"
                            onClick={() => {
                                onAddedModal();
                            }}>
                        Новая старшая операция
                    </button>
                    :
                    <></>
                }
                {canAddYoungestOperation ?
                    <button className="tech-button"
                            onClick={() => {
                                onAddedModal();
                            }}>
                        Новая младшая операция
                    </button>
                    :
                    <></>
                }
            </div>
        </div>
    </>
}
const RightOperationInfo = ({isOpen, id} : {isOpen: boolean, id: string}) => {
    const [operation, SetOperation] = useState<GetOperationByIdResponse>()

    useEffect(() => {
        if (id)
        api.getOperationById(id).then(x => {
            SetOperation(x)
        });
    }, [id]);
    return !isOpen || !operation ? null : <>
        {isOpen && (
            <div className="block block-column right-drop-down-menu">
                <div className="block block-row white-container">
                    <div className="block block-column-0-padding">
                        <div className="bold-text-20">
                            {operation.name}
                        </div>
                        <div className="bold-text-16">
                            assemblyParts: {operation.assemblyParts}
                        </div>
                        <div className="bold-text-16">
                            cuttingParts: {operation.cuttingParts}
                        </div>
                        <div className="bold-text-16">
                            defectsPercentage: {operation.defectsPercentage}
                        </div>
                        <div className="bold-text-16">
                            colorNumbers: {operation.colorNumbers}
                        </div>
                        <div className="bold-text-16">
                            circulation: {operation.circulation}
                        </div>
                        <div className="bold-text-16">
                            materialIds: {operation.materialIds.length}
                        </div>
                    </div>
                </div>
                <div className="block block-row white-container">
                    <div className="block block-column-0-padding">
                        <div className="bold-text-16 content-middle block-spase">
                            <div>Материалы</div>
                            <div>Цена</div>
                        </div>
                        {operation.materialIds.map((materialId, index) => (
                            <GetMaterialName materialId={materialId}/>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
}

const GetMaterialName = ({materialId} : {materialId: string}) => {
    const [material, setMaterial] = useState<GetMaterialByIdResponse>()
    useEffect(() => {
            api.getMaterialById(materialId).then(x => {
                setMaterial(x)
            });
    }, [materialId]);
    
    return !material ? null : 
            <div className="bold-text-16 content-middle block-spase">
                <div>{material.name}</div>
                <div>{material.price}</div>
            </div>
}

const AddOperationModal = ({isOpen, stepId, onClose, onAddOperation, templateId}
                        : { isOpen: boolean, stepId: string, onClose: () => void, onAddOperation: () => void, templateId: string}) => {
    const [operations, setOperations] = useState<Operation[]>()
    useEffect(() => {
        api.getAllOperations().then(x => {
            setOperations([...x.items])
        });
    }, []);
    if (!isOpen) return null;
    if (operations === undefined) return null;
    
    return <>
        <div className="modal-backdrop">
            <div className="modal-window">
                <div className="material-modal-container">
                    <div className="block block-column-0-padding">
                        <div className="block block-row-0-padding">
                            <button onClick={onClose}>←</button>
                            <div className="content-middle bold-text-16 ellipsis">Операции</div>
                        </div>
                        {operations.map((operation, index) => (
                            <div className="block block-row block-spase">
                                <div className="content-middle bold-text-16 ellipsis">{operation.name}</div>
                                <button onClick={() => {
                                    if (stepId === undefined || stepId === "") {
                                    api.AddOperationInTemplate(templateId, operation.id).then(() => {
                                        onAddOperation()
                                    })}
                                    else {
                                        api.addChildOperationInStep(stepId, operation.id).then(() => {
                                        onAddOperation()
                                    })}
                                }}
                                >+</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
}