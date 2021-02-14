import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.fetchPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if(patient) {
    const patientData = { ...patient };
    return res.send(patientData);
  } else {
    return res.status(404).json({ error: 'Patient not found' });
  }
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