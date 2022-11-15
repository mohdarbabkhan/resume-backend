import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Box, Paper, Grid, Typography, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import logo from '../images/arbabprofilepic.jpg'
import useStyles from '../styles';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const [userdata,setuserdata] = useState({});
  const navigate = useNavigate();
  const callAboutPage = async()=>{
    try {
       const res = await fetch('/about',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();
      setuserdata(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login")
    }
  }
  useEffect(()=>{
    callAboutPage();
  },[])

  var classes = useStyles();
  const [value, setvalue] = useState('1');
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
  return (
    <main>
      <Container maxWidth="sm" component="form" method="GET">
        <Box component={Paper} elevation={3} sx={{ paddingX: 1, paddingY: 2, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}className={classes.pp}>
              <img src={logo} width="130px"/>
              <Typography variant='body2' color="text.secondary" gutterBottom sx={{mt:1}}>Work link</Typography>
              <Typography variant='body2' color="text.secondary" >GitHub</Typography>
              <Typography variant='body2' color="text.secondary" >LinkedIn</Typography>
              <Typography variant='body2' color="text.secondary" >Insta</Typography>
              <Typography variant='body2' color="text.secondary" >whatsApp</Typography>
              <Typography variant='body2' color="text.secondary" >youtube</Typography>
            </Grid>
            
            <Grid item md={6} xs={12}>
              <Typography variant="h6">{userdata.name}</Typography>
              <Typography variant="body1" color="primary">{userdata.work}</Typography>
              <Typography variant="body2" color="text.secondary">Ranking:1/10</Typography>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab value="1" label="About" />
                    <Tab value="2" label="Timeline" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Grid container spacing={4}>
                    <Grid item md={6}>
                    <Typography variant="subtitle2">Id</Typography>
                    <Typography variant="subtitle2">Name</Typography>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography variant="subtitle2">Phone</Typography>
                    <Typography variant="subtitle2">Profession</Typography>
                    </Grid>
                    <Grid item md={6}>
                    <Typography variant="subtitle2" color="primary">865979</Typography>
                    <Typography variant="subtitle2" color="primary">{userdata.name}</Typography>
                    <Typography variant="subtitle2" color="primary">{userdata.email}</Typography>
                    <Typography variant="subtitle2" color="primary">{userdata.phone}</Typography>
                    <Typography variant="subtitle2" color="primary">{userdata.work}</Typography>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <Grid container spacing={4}>
                    <Grid item md={6}>
                    <Typography variant="subtitle2">Experiance</Typography>
                    <Typography variant="subtitle2">Hourly rate</Typography>
                    <Typography variant="subtitle2">Total Projects</Typography>
                    <Typography variant="subtitle2">English level</Typography>
                    <Typography variant="subtitle2">Availabty</Typography>
                    </Grid>
                    <Grid item md={6}>
                    <Typography variant="subtitle2" color="primary">Expert</Typography>
                    <Typography variant="subtitle2" color="primary">10$/hr</Typography>
                    <Typography variant="subtitle2" color="primary">100</Typography>
                    <Typography variant="subtitle2" color="primary">Intermediate</Typography>
                    <Typography variant="subtitle2" color="primary">1 month</Typography>
                    </Grid>
                  </Grid>
                </TabPanel>

              </TabContext>
            </Grid>
            <Grid item md={2} xs={null}>
              <Button>Edit</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  )
}
