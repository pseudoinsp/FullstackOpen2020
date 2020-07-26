import { Gender } from "./Gender";

export interface Patient {
    id: string
    name: string
    // TODO date?
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
