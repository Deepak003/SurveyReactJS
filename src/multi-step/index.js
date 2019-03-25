import React from 'react'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { StepThree } from './StepThree'
import { StepFour } from './StepFour'

const steps = 
    [
      {name: 'Survey Settings', component: <StepOne/>},
      {name: 'Survey Questions', component: <StepTwo/>},
      {name: 'Survey Audience', component: <StepThree/>},
      {name: 'Survey Summary', component: <StepFour/>}
    ]

export { steps }