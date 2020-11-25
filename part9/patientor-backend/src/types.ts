export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type PatientDisplay = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;