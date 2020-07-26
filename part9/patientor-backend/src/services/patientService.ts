import patientData from '../../data/patients.json';

import { Patient, NonSensitivePatient, NewPatient } from '../types/Patient';
import { generateUuid } from '../utils';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
  };

const addEntry = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: generateUuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};