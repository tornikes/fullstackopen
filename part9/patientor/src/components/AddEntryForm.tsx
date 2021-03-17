import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { v4 } from 'uuid';

interface Props {
    onSubmit(data: any): void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }: Props) => {
    const [{ diagnoses }] = useStateValue();


    return (
        <>
            <h1>Add Another Entry</h1>
            <Formik
                initialValues={{
                    id: v4(),
                    type: "HealthCheck",
                    description: '',
                    date: '',
                    specialist: '',
                    diagnosisCodes: [],
                    healthCheckRating: 0
                }}
                onSubmit={onSubmit}
            >
                {({ values, setFieldValue, setFieldTouched }) => (
                    <Form>
                        <Field
                            label="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="date"
                            type="date"
                            name="date"
                        />
                        <Field
                            label="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Button type="submit">Submit</Button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddEntryForm;