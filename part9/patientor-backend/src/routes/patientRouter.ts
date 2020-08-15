/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const requestedId = req.params.id;
  const matchedPatient = patientService.getPatient(requestedId);

  console.log(`queried patient with id ${requestedId}`);
  if(matchedPatient) {
    res.status(200).json(matchedPatient);
  }
  else {
    res.status(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry = toNewEntry(req.body);
    const patientid = req.params.id;
    const modifiedPatient = patientService.addEntry(patientid, entry);
    res.json(modifiedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
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