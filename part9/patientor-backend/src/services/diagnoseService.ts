import diagnosesData from '../../data/diagnoses.json';

import { Diagnose } from '../types/Diagnose';

const diagnoses: Array<Diagnose> = diagnosesData as Array<Diagnose>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getEntries
};