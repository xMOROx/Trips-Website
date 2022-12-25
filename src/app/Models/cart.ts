import { Trip } from "./trip";
export interface ICart {
    tripsReserved: Trip[]
    priceTotalAmount: number;
    reservedTotalAmount: number;
}