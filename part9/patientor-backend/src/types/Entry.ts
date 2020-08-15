import { Diagnose } from "./Diagnose";

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

  interface Discharge {
      date: string,
      criteria: string
  }

  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge : Discharge
  }

  export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

  interface Interval {
      startDate: string,
      endDate: string
  }

 export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave : Interval
  }

  export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;