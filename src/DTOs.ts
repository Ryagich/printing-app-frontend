import {Template} from "./Models/Models";

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

export type TemplateListResponse = Template[];

