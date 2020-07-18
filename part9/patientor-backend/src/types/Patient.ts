export interface Patient {
    id: string
    name: string
    // TODO date?
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;