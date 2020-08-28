import { Card, Button, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField} from 'formik-material-ui'
import { object, mixed, number} from 'yup'
import React, {useState} from 'react'

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper

        initialValues={{
          firstName: '',
          lastName: '',
          millionaire: false,
          money: 0,
          descprition: ''

        }} onSubmit={() => {}}>
            <FormikStep>
              <Field name="firstname" component={TextField} label= "First Name"> </Field>
              <Field name="lastname" component={TextField} label= "Last Name"> </Field>
              <Field name="millionaire" type="checkbox" component={CheckboxWithLabel} Label={{ label: 'I am millionaire' }}></Field>
            </FormikStep>
            <FormikStep
              validationSchema={object({
                money: mixed().when('millionaire', {
                  is: true,
                  then: number().required().min(1_000_000, 'Because you said you are a millionaire you need to have 1 million'),
                  otherwise: number().required(),
                })
              })}>
              <Field name="money" type="number" component={TextField} label= "All the money I have"> </Field>
            </FormikStep>
            <FormikStep>
              <Field name="description" component={TextField} label= "Description"> </Field>
            </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]

  const isLastStep = () => {
    return step === childrenArray.length - 1
  }

  return (
    <Formik {...props} 
    validationSchema={currentChild.props.validationSchema}
    onSubmit={ async (values, helpers) => {
      if(isLastStep()) {
        await props.onSubmit(values, helpers)
      } else {
        setStep(s => s+1)
      }
    }}>
      <Form autoComplete="off">
        {currentChild}
      {step> 0 ? <Button onClick={() => setStep(s => s-1)}>Back</Button> : null}
      <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}></Button>
      </Form>
    </Formik>
  )
}