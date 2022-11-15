import React from 'react';
import { Typography,Container,Grid,Box,Paper,CssBaseline} from '@mui/material';
import useStyles from '../styles';
import {Footer} from './Footer'
export const Home = () => {
  const classes = useStyles();
  return (
    <main  >
      <div className={classes.bColor}>
      <Container >
      <Box sx={{pt:20}}>
        <Box >
          <Typography variant="h6">Welcome</Typography>
        </Box>
        <Box className={classes.pp} component={Container}  sx={{mt:1}}>
        <Grid container >
          <Grid item md={4} xs={12} >
          <Typography variant="h5">We are</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
          <Typography variant="h4">MERN</Typography> 
          </Grid>
          <Grid item md={4} xs={12} >
          <Typography variant="h5">developers</Typography> 
          </Grid>
        </Grid>
        </Box>
      </Box>
      </Container>
      </div>
      <Footer/>
    </main>
  )
}
