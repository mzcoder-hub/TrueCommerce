import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { Grid } from '@material-ui/core'

const Steppers = ({ step }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }))

  function makeid(length) {
    var result = ''
    var characters = '12345678900987654321'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  function getSteps() {
    return ['pengiriman', 'metode', 'ekspedisi', 'verifikasi', 'pembayaran']
  }

  const classes = useStyles()
  const steps = getSteps()

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={
          step === '1'
            ? 0
            : step === '2'
            ? 1
            : step === '3'
            ? 2
            : step === '4'
            ? 3
            : step === '5'
            ? 4
            : 0
        }
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label === 'null' ? makeid(10) : label}>
            <StepLabel>
              <Link
                to={label === 'null' ? '#' : `/${label}`}
                className='MaStepBro'
              >
                {label === 'null' ? '' : label.toUpperCase()}
              </Link>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default Steppers
