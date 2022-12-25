import { TripStatus } from "./tripStatus.enum";

export interface Trip {
    key?: string;
    name: string;
    likes: number;
    amount: number;
    oldKey?: string;
    endDate: string;
    dislikes: number;
    maxPlace: number;
    unitPrice: number;
    startDate: string;
    status: TripStatus;
    imageSrc: string[];
    boughtDate: string;
    description: string;
    getNotification?: boolean;
    destinationCountry: string;
}