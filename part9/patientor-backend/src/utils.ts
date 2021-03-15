/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Entry, 
    Gender, 
    HealthCheckEntry, 
    HospitalEntry, 
    NewPatient, 
    OccupationalHealthCareEntry 
} from './types';

function toNewPatient(object: any): NewPatient {
    return {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: parseEntries(object.entries)
    };
}

function parseEntries(object: any): Entry[] {
    const entries: Entry[] = [];
    if (Array.isArray(object)) {
        for (let entry of object) {
            entries.push(parseEntry(entry));
        }
    }
    return entries;
}

function parseEntry(object: any): Entry {
    if ('type' in object &&
        ['OccupationalHealthcare', 'Hospital', 'HealthCheck'].includes(object.type)) {
        const baseObject: any = {
            type: object.type,
            id: parseId(object),
            description: parseDescription(object),
            date: parseDate(object),
            specialist: parseSpecialist(object)
        };
        if ('diagnosisCodes' in object) {
            baseObject.diagnosisCodes = parseStringArray(baseObject.diagnosisCodes);
        }

        switch(object.type) {
            case "OccupationalHealthcare": {
                const rest: any = {
                    employerName: parseEmployerName(object)
                };
                if('sickLeave' in object) {
                    rest.sickLeave = parseSickLeaveDates(object.sickLeave);
                }
                return { ...baseObject, ...rest } as OccupationalHealthCareEntry;
            }
            case "Hospital": {
                const rest: any = {
                    discharge: parseDischarge(object.discharge)
                };
                return { ...baseObject, ...rest } as HospitalEntry;
            }
            case "HealthCheck": {
                const rest: any = {
                    healthCheckRanking: parseHealthCheckRanking(object)
                }
                return { ...baseObject, ...rest } as HealthCheckEntry;
            }
        }
    }
    throw new TypeError('Invalid entry type ' + JSON.stringify(object));
}

// Entry helpers
const parseId = parseStringProp('id');
const parseDescription = parseStringProp('description');
const parseSpecialist = parseStringProp('specialist');
const parseEmployerName = parseStringProp('employerName');
function parseStringArray(input: unknown) {
    if (!input || !Array.isArray(input)) {
        throw new TypeError(`Input is not an array`);
    }
    const result = [];
    for (let item of input) {
        if (typeof item !== 'string') {
            throw new TypeError(`Non-string value in array`);
        }
        result.push(item);
    }
    return result;
}

function parseSickLeaveDates(input: unknown) {
    if(!input || !Array.isArray(input)) {
        throw new TypeError(`SickLeave is not an array`);
    }
    const result = [];
    for(let item of input) {
        result.push(parseSickLeaveDate(item));
    }
    return result;
}

function parseSickLeaveDate(input: any) {
    if(typeof input !== 'object' || 
        input === null  || 
        !('startDate' in input) ||
        !('endDate' in input)) {
            throw new TypeError('Incorrect sick leave date');
    }
    return {
        startDate: parseDate(input.startDate),
        endDate: parseDate(input.endDate)
    }
}

function parseDischarge(input: any) {
    if(typeof input !== 'object' || 
        input === null  || 
        !('date' in input) ||
        !('criteria' in input)) {
            throw new TypeError('Incorrect sick leave date');
    }
    return {
        date: parseDate(input),
        criteria: parseStringProp('criteria')(input.criteria)
    }
}

function parseHealthCheckRanking(input: unknown) {
    if(typeof input !== 'number' || ![0, 1, 2, 3].includes(input)) {
        throw new TypeError('HealthCheckRanking value is invalid');
    }
    return input;
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
    parseGender,
    parseEntry
};