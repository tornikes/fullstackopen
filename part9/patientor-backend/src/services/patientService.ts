import patientsData from '../../data/patients.json';
import { NewPatient, Patient, PatientDisplay } from '../types';
import { v4 } from 'uuid';
import utils from '../utils';

const patients: Patient[] = patientsData.map(data => {
    const newpat = utils.toNewPatient(data) as Patient;
    newpat.id = data.id;
    return newpat;
});

function fetchPatients(): PatientDisplay[] {
    return patients.map(({ id, gender, name, dateOfBirth, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

function addPatient(patient: NewPatient): Patient {
    const p = Object.assign({}, patient, { id: v4() });
    patients.push(p);
    return p;
}

function getPatientById(id: string) {
  const patient = patients.find(p => p.id === id);
  return patient || null;
}

export default { fetchPatients, addPatient, getPatientById };