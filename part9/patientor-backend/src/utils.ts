/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from "./types/Patient";
import { Gender } from "./types/Gender";
import { NewEntry, NewBaseEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from "./types/Entry";

export function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const baseEntryParse = (object: any): NewBaseEntry => {
  return {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: object.diagnosisCodes
  };
};

export const toNewEntry = (object: any): NewEntry => {
  if (!object.type) {
    throw new Error('The new entry contains no type!');
  }
  let base;
  switch(object.type) {
    case "OccupationalHealthcare":
      if(!object?.employerName || !object.sickLeave) {
        throw new Error("Invalid OccupationalHealthcare entry.");
      }

      base = baseEntryParse(object) as OccupationalHealthcareEntry;
      base.type = "OccupationalHealthcare";
      base.employerName = parseString(object.employerName);
      base.sickLeave = object.sickLeave;

      return base;
    case "Hospital":
      if(!object?.discharge) {
        throw new Error("Invalid Hospital entry.");
      }

      base = baseEntryParse(object) as HospitalEntry;
      base.type = "Hospital";
      base.discharge = object.discharge;
      
      return base;
    case "HealthCheck":
      if(!object?.healthCheckRating) {
        throw new Error("Invalid health check entry.");
      }

      base = baseEntryParse(object) as HealthCheckEntry;
      base.type = "HealthCheck";
      base.healthCheckRating = object.healthCheckRating;
      return base;
    default:
      throw new Error("Unknown entry type");
  }
};

export const toNewPatient = (object: any): NewPatient => {
    return {
      dateOfBirth: parseDate(object.dateOfBirth),
      name: parseString(object.name),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
      entries: []
    };
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseString = (data: any): string => {
    if (!data || !isString(data)) {
      throw new Error('Incorrect or missing string: ' + data);
    }
  
    return data;
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };