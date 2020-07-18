import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;