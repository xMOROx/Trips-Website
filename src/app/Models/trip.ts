import { TripStatus } from "./tripStatus.enum";

export interface Trip {
    name: string;
    destinationCountry: string;
    startDate: string;
    endDate: string;
    boughtDate: string;
    unitPrice: number;
    maxPlace: number;
    description: string;
    imageSrc: string[];
    amount: number;
    currency: string;
    likes: number;
    dislikes: number;
    status: TripStatus;
    key: string;
}