import patientsData from '../../data/patients.json';
import { Patient, PatientDisplay } from '../types';

const patients: Patient[] = patientsData;

function fetchPatients(): PatientDisplay[] {
    return patients.map(({ id, gender, name, dateOfBirth, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

export default { fetchPatients };