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

router.post('/:id/entries', (req, res) => {
  const id = req.params['id'];
  try {
    const entry = utils.parseEntry(req.body);
    const result = patientService.addEntryById(id, entry);
    if(result) {
      return res.send(result);
    } else {
      return res
        .status(404)
        .send({ error: `Could not find patient with id ${id}` });
    }
  } catch(err) {
    return res.status(400).send({ error: err.message });
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