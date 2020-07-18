import express from 'express';
import diaryService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(diaryService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;