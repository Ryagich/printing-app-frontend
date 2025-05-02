// apiService.ts
import axios, { AxiosInstance } from 'axios';
import {LoginRequest, LoginResponse, RegistrationRequest, TemplateListResponse} from './DTOs';

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
        return this.api.post<LoginRequest, LoginResponse>('Auth/login', request);
    }

    registrationRequest(request: RegistrationRequest){
        return this.api.post<RegistrationRequest, void>('Auth/register', request);
    }

    getAllTemplates(){
        return this.api.get<void, TemplateListResponse>('Templates/all');
    }
}

export const api: ApiService = new ApiService("http://localhost:5151/api/");

