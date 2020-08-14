import React from 'react';
import { Entry} from "../types";
import { useStateValue } from "../state";

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <div key={entry.id}>
        <p>{entry.date} <i>{entry.description}</i></p>
        <ul>
            {entry.diagnosisCodes?.map(c => <li key={c}>{c} {diagnoses[c]?.name}</li>)}
        </ul>
    </div>
  );
};

export default EntryDetails;
