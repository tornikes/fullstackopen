import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Patient } from '../types';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [{ patients }, dispatch] = useStateValue();
  let patient: Patient = patients[id];

  useEffect(() => {
    if(!patient || ('entries' in patient)) {
      (async () => {
        try {
          patient = await (await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)).data;
          dispatch(updatePatient(patient));
        } catch {
          history.push('/');
        }
      })();
    }
  }, [dispatch]);
  
  if(!patient) {
    return null;
  }
  return (
    <div>
      <p>{patient.name}</p>
      <p>{patient.occupation}</p>
      { patient.entries.length > 0 &&
        <div>
          <h2>Entries:</h2>
          {patient.entries.map(entry => {
            return <> 
              <p>{entry.date} {entry.description}</p>
              <ul>
              { entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                return <li>{code}</li>
              })}
              </ul>
            </>
          })}
        </div>
      }
    </div>
  );
};

export default PatientDetails;