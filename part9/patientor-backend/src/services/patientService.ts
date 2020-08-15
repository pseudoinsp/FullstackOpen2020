import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types/Patient';
import { generateUuid } from '../utils';
import { NewEntry } from '../types/Entry';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
  };

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: generateUuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientid: string, entry: NewEntry): Patient => {
  const patient = patients.find(p => p.id === patientid);

  if(!patient) throw new Error();
  const newEntry = {
    ...entry,
    id: generateUuid(),
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry
};