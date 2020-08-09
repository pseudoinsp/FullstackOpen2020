/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const requestedId = req.params.id;
  const matchedPatient = patientService.getPatient(requestedId);

  if(matchedPatient) {
    res.status(200).json(matchedPatient);
  }
  else {
    res.status(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const newDiaryEntry = patientService.addPatient(newPatient);
    res.json(newDiaryEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;