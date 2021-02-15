import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Diagnosis, Entry, HealthCheckEntry } from '../types';

interface Props {
  entry: Entry
}

function assertNever(entry: never): never {
  throw new TypeError(`Unknown entry type`);
}

function lookupInDiagnoses(code: string, diagnoses: Diagnosis[]): string {
  for(let diagnosis of diagnoses) {
    if(diagnosis.code === code) {
      return diagnosis.name;
    }
  }
  return '';
}

const EntryDetails: React.FC<Props> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital": return <HospitalEntry entry={entry} />
    case "HealthCheck": return <HealthCheck entry={entry} />
    case "OccupationalHealthcare": return <OccupationalHealthcare entry={entry} />
    default:  return assertNever(entry);
  }
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>{entry.date} <Icon name="doctor" /></p>
      <p>
        {entry.description}
      </p>
      { entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />}
    </div>
  );
};


type Color = "green" | "teal" | "yellow" | "red"; 
const colors: Color[] = ["green", "teal", "yellow", "red"];
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <p>{entry.date} <Icon name="doctor" /></p>
      <p>
        {entry.description}
        <br />
        <Icon name="heart" color={colors[entry.healthCheckRating]} />
      </p>
      { entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />}
    </div>
  );
};

const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>{entry.date} <Icon name="stethoscope" /></p>
      <p>
        {entry.description}
      </p>
      { entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />}
    </div>
  );
};

const DiagnosisList: React.FC<{ diagnosisCodes: string[] }> = ({ diagnosisCodes}) => {
  const [{ diagnoses }] = useStateValue();
  return <> 
     {diagnosisCodes.map(code => {
      return <li key={code}>{code} {lookupInDiagnoses(code, diagnoses)}</li>
    })}
  </>
};


export default EntryDetails;