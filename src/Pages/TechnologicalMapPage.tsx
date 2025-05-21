import '../cssFiles/passport.css';
import '../cssFiles/inputStyles.css';
import '../App.css'
import '../cssFiles/Titles.css';
import '../cssFiles/Elements.css';

import React, {useEffect, useState, useRef, forwardRef, useLayoutEffect, useMemo, JSX, RefObject} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetProfileMenu } from "./OrderPagesCreator";
import { api } from "../apiService";
import { GetMaterialByIdResponse, GetOperationByIdResponse, GetTemplateByIdResponse } from "../DTOs";
import { Operation, Step } from "../Models/Models";
import {Console} from "inspector";

export function GetTechnologicalMapPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [template, setTemplate] = useState<GetTemplateByIdResponse>();
    const [leftModalsIsOpen, setLeftModalsIsOpen] = useState(false);
    const [isAddOperationModalOpen, setAddOperationModalOpen] = useState(false);
    const [leftNameModalsIsOpen, setLeftNameModalsIsOpen] = useState(false);
    const [isNameAddOperationModalOpen, setIsNameAddOperationModalOpen] = useState(false);
    const [canAddElderOperation, setCanAddElderOperation] = useState(false);
    const [canAddYoungestOperation, setCanAddYoungestOperation] = useState(false);
    const [rightModalIsOpen, setRightModalIsOpen] = useState(false);
    const [currentOperationId, setCurrentOperationId] = useState<string>();
    const [currentStepId, setCurrentStepId] = useState<string>();
    const nameButtonRef = useRef<HTMLButtonElement>(null);

    const handleStepSelect = (stepId: string, operationId: string) => {
        setCurrentStepId(stepId);
        setCurrentOperationId(operationId);
    };
    
    useEffect(() => {
        api.getTemplateById(id!).then(setTemplate);
    }, [id]);

    return (id === undefined || !template ? <>Loading...</> :
            <>
                <div className="App">
                    <div className="block block-column">
                        <GetMainTitle />
                        <div className="block block-row content-middle">
                            <GetNameButton
                                ref={nameButtonRef}
                                template={template}
                                onClick={() => {
                                    setLeftNameModalsIsOpen(true);
                                    setCanAddElderOperation(false);
                                    setCanAddYoungestOperation(true);
                                }}
                            />
                        </div>
                        <CreateSteps
                            steps={template.steps}
                            nameButtonRef={nameButtonRef}
                            onStepSelect={(stepId, operationId) => {
                                setLeftModalsIsOpen(true);
                                setCanAddElderOperation(true);
                                setCanAddYoungestOperation(true);
                                setRightModalIsOpen(true);
                                handleStepSelect(stepId, operationId);
                            }}
                        />
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
const GetNameButton = React.forwardRef<HTMLButtonElement, {template: GetTemplateByIdResponse, onClick: () => void}>
                        (({ template, onClick }, ref) => {
    return (
        <button
            ref={ref}
            className="tech-button"
            onClick={() => {
                if (template?.steps.length === 0) {
                    onClick();
                }
            }}
        >
            {template?.name}
        </button>
    );
});

type StepMap = Record<string, HTMLButtonElement | null>;

const CreateSteps: React.FC<{
    steps: Step[];
    // Реф может быть null до первой отрисовки
    nameButtonRef: RefObject<HTMLButtonElement | null>;
    onStepSelect: (stepId: string, operationId: string) => void;
}> = ({ steps, nameButtonRef, onStepSelect }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const stepRefs = useRef<StepMap>({});

    const stepsById = useMemo(
        () => steps.reduce<Record<string, Step>>((acc, s) => (acc[s.id] = s, acc), {} as any),
        [steps]
    );

    const roots = useMemo(
        () => steps.filter(s => !steps.some(p => p.childStepsIds.includes(s.id))),
        [steps]
    );

    // находим шаги с минимальным level
    const startSteps = useMemo(() => {
        if (!steps.length) return [];
        const minLevel = Math.min(...steps.map(s => s.level));
        return steps.filter(s => s.level === minLevel);
    }, [steps]);

    useLayoutEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const draw = () => {
            svg.innerHTML = '';
            const rect = svg.getBoundingClientRect();

            // связи шаги -> дети
            steps.forEach(parent => {
                if (!parent.childStepsIds.length) return;
                const pEl = stepRefs.current[parent.id];
                if (!pEl) return;
                const pB = pEl.getBoundingClientRect();
                const pX = pB.x - rect.x + pB.width/2;
                const pY = pB.y - rect.y + pB.height;

                const centers = parent.childStepsIds.map(cid => {
                    const cEl = stepRefs.current[cid]!;
                    const cB = cEl.getBoundingClientRect();
                    return { x: cB.x - rect.x + cB.width/2, y: cB.y - rect.y };
                });

                const midY = (pY + Math.min(...centers.map(c => c.y))) / 2;
                drawLine(svg, pX, pY, pX, midY);
                centers.forEach(c => drawLine(svg, pX, midY, c.x, midY));
                centers.forEach(c => drawLine(svg, c.x, midY, c.x, c.y));
            });

            // линия от названия к шагам min level
            const nameEl = nameButtonRef.current;
            if (nameEl && startSteps.length) {
                const nB = nameEl.getBoundingClientRect();
                const nX = nB.x - rect.x + nB.width/2;
                const nY = nB.y - rect.y + nB.height;

                const centers = startSteps.map(s => {
                    const cEl = stepRefs.current[s.id]!;
                    const cB = cEl.getBoundingClientRect();
                    return { x: cB.x - rect.x + cB.width/2, y: cB.y - rect.y };
                });

                const midY = (nY + Math.min(...centers.map(c => c.y))) / 2;
                drawLine(svg, nX, nY, nX, midY);
                centers.forEach(c => drawLine(svg, nX, midY, c.x, midY));
                centers.forEach(c => drawLine(svg, c.x, midY, c.x, c.y));
            }
        };

        // дождаться рендеринга кнопок
        const wait = () => {
            if (Object.keys(stepRefs.current).length < steps.length) {
                requestAnimationFrame(wait);
            } else draw();
        };
        wait();
    }, [steps, nameButtonRef, startSteps]);

    const renderNode = (step: Step): JSX.Element => (
        <div key={step.id} className="block block-column-0-padding" style={{ alignItems: 'center', margin: '0 1px' }}>
            <GetOperationButton
                stepId={step.id}
                operationId={step.operationId}
                onClick={onStepSelect}
                ref={(el) => { stepRefs.current[step.id] = el; }}
            />
            {step.childStepsIds.length > 0 && (
                <div className="block block-row-0-padding-0-gap" style={{ marginTop: 8 }}>
                    {step.childStepsIds.map(cid => renderNode(stepsById[cid]))}
                </div>
            )}
        </div>
    );

    return (
        <div style={{ position: 'relative' }}>
            <svg ref={svgRef}
                 style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }}/>
            <div style={{ position: 'relative', zIndex: 1 }} className="block block-row">
                {roots.map(root => renderNode(root))}
            </div>
        </div>
    );
};



function drawLine(svg: SVGSVGElement, x1: number, y1: number, x2: number, y2: number, color = 'black') {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
} 


export const GetOperationButton = forwardRef<HTMLButtonElement, 
             {stepId: string; operationId: string; onClick: (stepId: string, operationId: string) => void;}
>(({ stepId, operationId, onClick }, ref) => {
    const [operation, setOperation] = useState<GetOperationByIdResponse>();

    useEffect(() => {
        api.getOperationById(operationId).then(setOperation);
    }, [operationId]);

    if (!operation) return null;

    return (
        <button
            ref={ref}
            className="tech-button"
            onClick={() => onClick(stepId, operationId)}
        >
            {operation.name}
        </button>
    );
});

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
        <div className="block block-row-0-padding left-drop-down-menu">
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
            <div className="block block-column right-drop-down-menu ">
                <div className="block block-row white-container">
                    <div className="block block-column-0-padding">
                        <div className="bold-text-20">
                           Параметры
                        </div>
                        <div className="bold-text-16">
                            {operation.name}
                        </div>
                        <div className="bold-text-16">
                            Операций: {operation.assemblyParts}
                        </div>
                        <div className="bold-text-16">
                            Выход: {operation.cuttingParts}
                        </div>
                        <div className="bold-text-16">
                            Брак: {operation.defectsPercentage}
                        </div>
                        <div className="bold-text-16">
                            Тираж: {operation.circulation}
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