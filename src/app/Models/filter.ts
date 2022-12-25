import { IStar } from "./star";

export interface IFilter {
    stars: IStar[];
    dateEnd: string;
    dateStart: string;
    minimumUnitPrice: number;
    maximumUnitPrice: number;
    destinationCountry: string[];
}