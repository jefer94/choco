import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import ProjectCard from '../components/ProjectCard'
import Field from '../components/Field'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  stepContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const steps = ['Datos', 'Etiquetas', 'Vista previa']

export default function NewProjectContainer(): ReactElement {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = (): void => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = (): void => {
    setActiveStep(activeStep - 1)
  }

  function Data(): ReactElement {
    return (
      <div>
        <div>
          <Field
            id="username"
            label="Username"
            value={''}
            autoComplete="project-title"
            type="text"
            placeholder="Konan"
            onChange={(v) => {}}
            error={''}
          />
          <Field
            id="current-password"
            label="Password"
            value={''}
            autoComplete="project-description"
            type="password"
            placeholder="P4ssw0rd!"
            onChange={(v) => {}}
            error={''}
          />
        </div>
      </div>
    )
  }

  function Tags(): ReactElement {
    return (
      <>
        <Field
          id="username"
          label="Username"
          value={''}
          autoComplete="project-title"
          type="text"
          placeholder="Konan"
          onChange={(v) => {}}
          error={''}
        />
        <Chip
          label="Deletable secondary"
          onDelete={() => {}}
          color="primary"
        />
        <Chip
          label="Deletable secondary"
          onDelete={() => {}}
          color="primary"
        />
        <Chip
          label="Deletable secondary"
          onDelete={() => {}}
          color="primary"
        />
      </>
    )
  }

  function getStepContent(step): ReactElement {
    switch (step) {
      case 0:
        return <Data />
      case 1:
        return <Tags />
      case 2:
        return <ProjectCard />
      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Agregar un nuevo proyecto
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </>
            ) : (
              <>
                <div className={classes.stepContainer}>
                  <div>{getStepContent(activeStep)}</div>
                </div>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  )
}
