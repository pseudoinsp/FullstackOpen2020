import React from 'react';
import { HospitalEntry} from "../types";
import { Segment, Header, Icon } from 'semantic-ui-react';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
    return (
        <Segment>
            <Header as="h2">{entry.date} <Icon name="hospital outline" /></Header>
            <i>{entry.description}</i>
            <br/>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
        </Segment>
    );
};

export default HospitalEntryDetails;