import {Material, Operation, Step, TemplateWithDescription, TemplateWithSteps} from "./Models/Models";

export interface LoginRequest {
    login: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegistrationRequest {
    login: string;
    password: string;
}
//Materials
export interface CreateMaterialRequest {
    name: string;
    price: number;
}
export interface ChangeMaterialRequest {
    name: string;
    price: number;
}
export interface GetMaterialsResponse {
    items: Material[];
}
export interface GetMaterialByIdResponse {
    id: string;
    name: string;
    price: number;
}
//
//Operations
export interface CreateOperationRequest {
    name: string,
    cuttingParts: number,
    assemblyParts: number,
    defectsPercentage: number,
    circulation: number,
    colorNumbers: number
}
export interface GetOperationByIdResponse {
    name: string,
    cuttingParts: number,
    assemblyParts: number,
    defectsPercentage: number,
    circulation: number,
    colorNumbers: number
    materialIds: string[]
    id: string
}
export interface GetOperationsResponse {
    items: Operation[];
}

//Templates
export interface GetTemplatesResponse {
    items: TemplateWithDescription[]
}

export interface TemplateRequest {
    name: string;
    description: string;
}
export interface GetTemplateByIdResponse {
    id: string,
    name: string;
    description: string;
    steps: Step[],
}
export type TemplateListResponse = TemplateWithSteps[];


