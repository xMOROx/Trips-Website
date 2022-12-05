export interface TripJSON {
    name: string;
    destinationCountry: string;
    startDate: string;
    endDate: string;
    unitPrice: number;
    maxPlace: number;
    description: string;
    imageSrc: string[];
    currency: string;
    likes: number;
    dislikes: number;
    id: number;
}