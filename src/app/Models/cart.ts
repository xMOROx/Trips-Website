import { Trip } from "./trip";

export interface ICart {
    reservedTotalAmount: number;
    priceTotalAmount: number;
    tripsReserved: Trip[]
}