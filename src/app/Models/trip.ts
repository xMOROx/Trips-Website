import { TripStatus } from "./tripStatus.enum";

export interface Trip {
    name: string;
    DestinationCountry: string;
    StartData: string;
    EndData: string;
    unitPrice: number;
    maxPlace: number;
    Description: string;
    ImageSrc: string[];
    amount: number;
    currency: string;
    likes: number;
    dislikes: number;
    status: TripStatus;
    id: number;
}