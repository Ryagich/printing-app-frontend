import {TimeLike} from "fs";

export interface Template {
    Name: string;
    Guid: string;
    Steps: string[];
}

export interface Order {
    id: string;
    name: string;
    amount: number;
    circulation: number;
    status: string;
    executorId: string;
    customerId: string;
    orderDateTime: string;
    completionDateTime?: string;
    inputQuantity: number;
}
