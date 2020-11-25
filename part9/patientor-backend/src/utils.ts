/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import { Gender, NewPatient } from './types';

function toNewPatient(object: any): NewPatient {
    return {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth)
    };
}

function parseStringProp(prop: string): (input: unknown) => string {
    return function (input) {
        if (!input || !isString(input)) {
            throw new TypeError(`Incorrect or missing ${prop}`);
        }
        return input;
    };
}

function isDate(date: string): boolean {
    return Boolean(Date.parse(date));
}

function parseDate(date: unknown): string {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
}

function parseGender(gender: unknown): Gender {
    if (!gender || !isGender(gender)) {
        throw new TypeError('Incorrect or missing gender');
    }
    return gender;
}

function isGender(gender: unknown): gender is Gender {
    return Object.values(Gender).includes(gender as Gender);
}

const parseName = parseStringProp('name');
const parseSSN = parseStringProp('ssn');
const parseOccupation = parseStringProp('occupation');

function isString(text: unknown): text is string {
    return typeof text === 'string' || text instanceof String;
}

export default { 
    toNewPatient, 
    parseName, 
    parseSSN, 
    parseOccupation, 
    parseDate,
    parseGender
};