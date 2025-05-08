// apiService.ts
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {
    CreateMaterialRequest,
    TemplateRequest,
    CreateOperationRequest,
    GetMaterialByIdResponse,
    GetMaterialsResponse, GetOperationByIdResponse,
    GetOperationsResponse,
    GetTemplatesResponse,
    LoginRequest,
    LoginResponse,
    RegistrationRequest,
    TemplateListResponse, GetTemplateByIdResponse, ChangeMaterialRequest
} from './DTOs';
import {TemplateWithDescription} from "./Models/Models";

export class ApiService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL: baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    setAuthHeader(token: string): void {
        this.api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    resetAuthHeader(): void {
        delete this.api.defaults.headers['Authorization'];
    }

    loginRequest(request: LoginRequest){
        return this.api.post<LoginRequest, LoginResponse>('/login', request);
    }

    registrationRequest(request: RegistrationRequest){
        return this.api.post('/register', request);
    }

    //Materials
    createMaterial(request : CreateMaterialRequest) {
        return this.api.post('/materials', request);
    }
    getMaterials(){
        return this.api.get('/materials?pageIndex=0&pageSize=10000000')
            .then(x=>x.data as GetMaterialsResponse);
    }
    getMaterialById(id : string) {
        return this.api.get(`/materials/${id}`)
            .then(x=>x.data as GetMaterialByIdResponse);
        
    }
    deleteMaterialById(id: string){
        return this.api.delete(`/materials/${id}`);
    }
    changeMaterialById(id: string, request: ChangeMaterialRequest)
    {
        return this.api.patch(`/materials/${id}`, request);
    }

    //Operations
    createOperation(request: CreateOperationRequest) {
        return this.api.post('/operations', request);
    }
    getAllOperations(){
        return this.api.get('/operations?pageIndex=0&pageSize=10000000')
            .then(x=>x.data as GetOperationsResponse);
    }
    getOperationById(id: string)
    {
        return this.api.get(`/operations/${id}`)
            .then(x=>x.data as GetOperationByIdResponse);
        
    }
    deleteOperationById(id: string){
        return this.api.delete(`/operations/${id}`);
    }
    addMaterialInOperation(operationId: string, materialId: string){
        return this.api.patch(`/operations/${operationId}/materials/${materialId}/add`);
    }
    removeMaterialInOperation(operationId: string, materialId: string){
        return this.api.patch(`/operations/${operationId}/materials/${materialId}/remove`);
    }
    //
    //Steps
    addChildOperationInStep(stepId: string, childOperationId: string){
        return this.api.patch(`/steps/${stepId}/operations/${childOperationId}`);
    }
    //
    //Templates
    getTemplateById(id : string) {
        return this.api.get(`/templates/${id}`)
            .then(x=>x.data as GetTemplateByIdResponse);
    }
    
    changeTemplateById(id : string, request: TemplateRequest) {
        return this.api.patch(`/templates/${id}`, request);
    }
    
    getTemplates(){
        return this.api.get('/templates?pageIndex=0&pageSize=10000000')
            .then(x=>x.data as GetTemplatesResponse);
    }
    createTemplate(request: TemplateRequest){
        return this.api.post(`/templates`, request);
    }
    AddOperationInTemplate(templateId: string, operationId: string){
        return this.api.patch(`/templates/${templateId}/operations/${operationId}`);
    }
}

export const api: ApiService = new ApiService("");

