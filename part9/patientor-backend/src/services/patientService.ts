import patientData from '../../data/patients.json';

import { Patient, NonSensitivePatient } from '../types/Patient';

const diagnoses: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return diagnoses;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
    return diagnoses.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
  };

export default {
  getEntries,
  getNonSensitiveEntries
};