import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.fetchPatients());
});

router.post('/', (req, res) => {
    const patient = patientService.addPatient(req.body);
    res.json(patient);
});

export default router;