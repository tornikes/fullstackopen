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
    if(!('entries' in patient)) {
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
  
  return (
    <div>
      <p>{patient.name}</p>
      <p>{patient.occupation}</p>
    </div>
  );
};

export default PatientDetails;