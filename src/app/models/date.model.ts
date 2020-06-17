import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class DateModel{
    fecha: NgbDateStruct;
    horaInicio: {
        hour: number;
        minute: number;
    }
    horaFin: {
        hour: number;
        minute: number;
    }
}