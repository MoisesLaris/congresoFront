import { DateModel } from "./date.model";

export class ActivityModel{
    _id: string;
    idCongreso: string;
    nombre: string;
    descripción: string;
    fechas: DateModel[];
}