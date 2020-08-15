import React from 'react';
import { HealthCheckEntry} from "../types";
import { Header, Icon, Segment } from 'semantic-ui-react';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
    return (
        <Segment>
            <Header as="h2">{entry.date} <Icon name="user md" /></Header>
            <i>{entry.description}</i>
            <br/>
            Rating: {entry.healthCheckRating}
        </Segment>
    );
};

export default HealthCheckEntryDetails;