import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { useStateValue, updatePatient } from "../state";
import { Header, Container, Icon } from "semantic-ui-react";

const PatientPage: React.FC<{ patientId: string }> = ({patientId}) => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();

  // TODO this should be abstracted away and the detection of whether the patient is detailed should be solved
  useEffect(() => {
    const fetchPatientIfNecessary = async () => {
        if(!patient && patients[patientId] && patients[patientId].ssn)
        {
          setPatient(patients[patientId]);
        }
        else
        {
          try {
              const { data: detailedPatient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${patientId}`
              );
              dispatch(updatePatient(detailedPatient));
              setPatient(detailedPatient);
            } catch (e) {
              console.error(e.response.data);
            }
        }     
    };
    
    fetchPatientIfNecessary();
    
    // cant depend on patient as it would cause a loop
    // eslint-disable-next-line
  }, [patientId]);

  if(!patient) return null;

  const renderGender = (gender: Gender) => {
    switch(gender) 
    {
      case "male":
        return <Icon name='mars' />;
      case "female": 
        return <Icon name='venus' />;
      case "other":
        return <Icon name='genderless' />;
    }
   };

  return (
    <div className="App">
       <Container>
         <div>
          <Header as="h2">{patient.name} {renderGender(patient.gender)}</Header>
          ssn: {patient.ssn}
          <br/>
          occupation: {patient.occupation}
        </div>
        </Container>
    </div>
  );
};

export default PatientPage;
