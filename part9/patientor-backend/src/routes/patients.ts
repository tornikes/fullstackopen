import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.fetchPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = utils.toNewPatient(req.body);
        const patient = patientService.addPatient(newPatient);
        res.json(patient);
    } catch(err) {
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
        res.status(400).send(err.message);
    }    
});

export default router;