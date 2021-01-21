import React, { useState } from 'react';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import _ from 'lodash';
export default function Forms() {
  const [step, setStep] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const initialValues = {
    name: '',
    email: '',
    channel: '',
  };
  const schema = () => {
    //   step wise validation
    switch (step) {
      case 0:
        return Yup.object().shape({
          name: Yup.string().required('Required!'),
        });
      case 1:
        return Yup.object().shape({
          email: Yup.string()
            .email('Invalid email format')
            .required('Required!'),
        });
      case 2:
        return Yup.object().shape({
          channel: Yup.string().required('Required!'),
        });
      default:
        break;
    }
  };
  // useFormik hook used
  const formik = useFormik({
    isValidating: true,
    initialValues: initialValues,
    validationSchema: schema(),
    // this is default method of formik when we call handlesubmit() and it will be called only there is no error
    onSubmit: (values) => {
      // if not the last step
      if (step < 2) {
        setStep((s) => s + 1);
      }
      // if last step
      if (step === 2) {
        alert(JSON.stringify(values, null, 2));
      }
    },
  });
  const { errors, values, handleSubmit, handleChange } = formik;
  console.log('Errors', errors);
  console.log('Values', values);
  /** *
   * @method renderFormByStep will render forms as per step
   */
  const renderFormByStep = () => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="name"
              autoComplete="off"
              onChange={handleChange}
              value={values?.name}
              error={errors.name}
              helperText={errors.name}
            />
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="email"
              autoComplete="off"
              onChange={handleChange}
              value={values?.email}
              error={errors.email}
              helperText={errors.email}
            />
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              id="channel"
              name="channel"
              label="channel"
              autoComplete="off"
              onChange={handleChange}
              value={values?.channel}
              error={errors.channel}
              helperText={errors.channel}
            />
          </form>
        );
      default:
        break;
    }
  };
  
  return (
    <Card>
      <CardContent>
        <h1>YouTube Channel</h1>
        <h3>{steps[step]}</h3>
        {renderFormByStep()}
        {step > 0 ? (
          <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
        ) : null}
        {step < steps.length - 1 ? (
          <Button onClick={ handleSubmit}>Next</Button>
        ) : null}
        {step === steps.length - 1 ? (
          <Button onClick={handleSubmit} type="submit">
            submit
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
