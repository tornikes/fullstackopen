import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import AddEntryForm from './AddEntryForm';
import EntryDetails from './EntryDetails';



const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [{ patients }, dispatch] = useStateValue();
  let [patient, setPatient] = useState(patients[id]);


  async function postEntry(entry: Entry) {
    try {
      const res = await fetch(`http://localhost:3001/api/patients/${id}/entries`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(entry)
      });
      const data = await res.json();
      setPatient({ ...patient, entries: data });
    } catch {
      console.log(`Posting failed`);
    }
  }

  useEffect(() => {
    if (!patient || ('entries' in patient)) {
      (async () => {
        try {
          let pat = await (await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)).data;
          dispatch(updatePatient(pat));
          setPatient(pat);
        } catch {
          history.push('/');
        }
      })();
    }
  }, [dispatch]);

  if (!patient) {
    return null;
  }
  return (
    <div>
      <p>{patient.name}</p>
      <p>{patient.occupation}</p>
      { patient.entries.length > 0 &&
        <div>
          <h2>Entries:</h2>
          {patient.entries.map((entry, i) => {
            return <EntryDetails key={i} entry={entry} />
          })}
        </div>
      }
      <div>
        <AddEntryForm onSubmit={postEntry} />
      </div>
    </div>
  );
};

export default PatientDetails;