/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from "./types/Patient";
import { Gender } from "./types/Gender";

export function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export const toNewPatient = (object: any): NewPatient => {
    return {
      dateOfBirth: parseDate(object.date),
      name: parseString(object.name),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender)
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