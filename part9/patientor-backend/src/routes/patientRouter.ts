/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newDiaryEntry = patientService.addEntry({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    });
    res.json(newDiaryEntry);
});

export default router;