import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

function fetchDiagnoses(): Diagnose[] {
    return diagnoses;
}

export default { fetchDiagnoses };