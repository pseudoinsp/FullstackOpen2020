import React from 'react';
import {  OccupationalHealthcareEntry} from "../types";
import { Header, Icon, Segment } from 'semantic-ui-react';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
    return (
        <Segment>
            <Header as="h2">{entry.date} <Icon name="stethoscope" /> {entry.employerName}</Header>
            <i>{entry.description}</i>
        </Segment>
    );
};

export default OccupationalHealthcareEntryDetails;