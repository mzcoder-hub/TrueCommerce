import React from 'react'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { BrowserRouter as Router } from 'react-router-dom'
import Layouting from './screens/Layouting'
import { HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
    <>
      <HelmetProvider>
        <Router>
          <Container style={{ maxWidth: '600px', padding: 0 }}>
            <div style={{ margin: 10 }}>
              <Grid container spacing={1}>
                <Layouting />
              </Grid>
            </div>
          </Container>
        </Router>
      </HelmetProvider>
    </>
  )
}

export default App
