import { IStar } from "./star";

export interface IFilter {
    stars: IStar[];
    minimumUnitPrice: number;
    maximumUnitPrice: number;
    dateStart: string;
    dateEnd: string;
    destinationCountry: string[];
}