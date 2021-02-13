export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: []
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type PatientDisplay = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;