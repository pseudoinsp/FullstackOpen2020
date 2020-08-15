import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {

  const [{ diagnoses }] = useStateValue();

  if(!diagnoses) return null; 

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        description: "",
        healthCheckRating: HealthCheckRating.LowRisk
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if(!Date.parse(values.date)) {
            errors.date = "Invalid date format";
        } 
        if (!values.healthCheckRating && values.healthCheckRating !== 0) {
          errors.healthCheckRating = requiredError;
        }
        if(!Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
            errors.healthCheckRating = "Unknown health check rating";
        }
        if (!values.specialist) {
            errors.specialist = requiredError;
          }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            />    
            <Field
                label="Health check rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
                />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
