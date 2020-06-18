import { DateModel } from "./date.model";

export class ActivityModel{
    _id: string;
    idCongreso: string;
    nombre: string;
    descripcion: string;
    color: any;
    fechas: DateModel[];
}