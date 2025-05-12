import '../cssFiles/passport.css';
import '../cssFiles/inputStyles.css';
import '../App.css'
import '../cssFiles/Titles.css';
import '../cssFiles/Elements.css';

import React, {useEffect, useState, useRef, forwardRef, use} from 'react';
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
    const nameButtonRef = useRef<HTMLButtonElement>(null);
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
                            <GetNameButton ref={nameButtonRef}
                                           template={template}
                                           onClick={() => {
                                               setLeftNameModalsIsOpen(true);
                                               setCanAddElderOperation(false);
                                               setCanAddYoungestOperation(true);
                                           }}/>
                        </div>
                        {<CreateSteps steps={template?.steps}
                                      nameButtonRef={nameButtonRef.current!}
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

const CreateSteps = ({steps, nameButtonRef, onStepSelect}
                         : {steps : Step[], nameButtonRef: HTMLButtonElement,  onStepSelect: (stepId: string, operationId: string) => void}) => {
    const maxLevel = Math.max(...steps.map(step => step.level));
    const groupedSteps: Step[][] = Array.from({ length: maxLevel + 1 }, () => []);
    const stepRefs = useRef<StepMap>({});
    const svgRef = useRef<SVGSVGElement>(null);
    const [n,setN] = useState(0)
    
    for (const step of steps) {groupedSteps[step.level].push(step);}

    useEffect(() => {
        const interval = setInterval(() => {
            if (steps.length !== Object.keys(stepRefs.current).length)
            {
                return;
            }
            clearInterval(interval)
            
            console.log(steps)

            const svg = svgRef.current;
            if (!svg) return;

            svg.innerHTML = "";
            const svgRect = svg.getBoundingClientRect();

            steps.forEach((parent) => {
                console.log("parent.id " + parent.id)
                console.log(stepRefs)
                console.log(stepRefs.current)

                const parentEl = stepRefs.current[parent.id];
                console.log(parentEl)

                if (!parentEl) return;

                const parentRect = parentEl.getBoundingClientRect();
                const parentX = parentRect.left + parentRect.width / 2 - svgRect.left;
                const parentY = parentRect.bottom - svgRect.top;

                const childCenters: { x: number; y: number }[] = [];

                for (const childId of parent.childStepsIds) {
                    const childEl = stepRefs.current[childId];
                    if (!childEl) continue;

                    const childRect = childEl.getBoundingClientRect();
                    const childX = childRect.left + childRect.width / 2 - svgRect.left;
                    const childY = childRect.top - svgRect.top;
                    childCenters.push({ x: childX, y: childY });
                }
                if (childCenters.length === 0) return;

                const minX = Math.min(...childCenters.map((c) => c.x));
                const maxX = Math.max(...childCenters.map((c) => c.x));
                const midY = parentY + 8;

                drawLine(svg, parentX, parentY, parentX, midY);
                childCenters.forEach((c) => {
                    drawLine(svg, c.x, midY, c.x, c.y);
                });
                childCenters.forEach((c) => {
                    drawLine(svg, c.x, midY, parentX, midY);
                });
            });
        }, 100)
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <svg
                ref={svgRef}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: -10000,
                    pointerEvents: "none",
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
                {groupedSteps.map((levelSteps, i) => (
                    <div
                        key={i}
                        className="block block-row content-middle"
                        style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "16px" }}
                    >
                        {levelSteps.map((step) => (
                            <GetOperationButton
                                key={step.id}
                                stepId={step.id}
                                operationId={step.operationId}
                                onClick={onStepSelect}
                                ref={(el) => {
                                    console.log("In ref | " + el)
                                    stepRefs.current[step.id] = el;
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
function drawLine(
    svg: SVGSVGElement,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string = "black"
) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "2");
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