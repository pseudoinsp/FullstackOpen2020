import patientData from '../../data/patients.json';

import { Patient, NonSensitivePatient, NewPatient } from '../types/Patient';

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
        id: (Math.max(...patients.map(d => Number(d.id))) + 1).toString(),
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