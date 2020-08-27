import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField} from 'formik-material-ui'
import { object, mixed, number} from 'yup'
import React, {useState} from 'react'

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
        validationSchema={object({
          money: mixed().when('millionaire', {
            is: true,
            then: number().required().min(1_000_000, 'Because you said you are a millionaire you need to have 1 million'),
            otherwise: number().required(),
          })
        })}

        initialValues={{
          firstName: '',
          lastName: '',
          millionaire: false,
          money: 0,
          descprition: ''

        }} onSubmit={() => {}}>
            <div>
              <Field name="firstname" component={TextField} label= "First Name"> </Field>
              <Field name="lastname" component={TextField} label= "Last Name"> </Field>
              <Field name="millionaire" type="checkbox" component={CheckboxWithLabel} Label={{ label: 'I am millionaire' }}></Field>
            </div>
            <div>
              <Field name="money" type="number" component={TextField} label= "All the money I have"> </Field>
            </div>
            <div>
              <Field name="description" component={TextField} label= "Description"> </Field>
            </div>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  return (
    <Formik {...props} >
      <Form autoComplete="off">
        {currentChild}
      </Form>
    </Formik>
  )
}