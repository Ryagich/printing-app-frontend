import {TimeLike} from "fs";

export interface Material {
    id: string;
    name: string;
    price: number;
}

export interface Operation {
    name: string,
    cuttingParts: number,
    assemblyParts: number,
    defectsPercentage: number,
    circulation: number,
    colorNumbers: number,
    materialIds: string[],
    id: string,
}

export interface TemplateWithSteps {
    id: string;
    name: string;
    steps: Step[];
}
export interface TemplateWithDescription {
    id: string;
    name: string;
    description: string;
}
export interface Step {
    id: string;
    operationId: string;
    level: number;
    childStepsIds: string[];
}
