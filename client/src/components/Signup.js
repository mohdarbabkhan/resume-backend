import React from 'react';
import { Typography, Avatar, CssBaseline, Container, Box, Grid, TextField, Button, Paper, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HttpsIcon from '@mui/icons-material/Https';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useState } from 'react';
import useStyles from '../styles';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  })

  const handleChange = (e) => {
    var name, value;
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    })
    const data = await res.json();
    console.log(data.code);
    if (data.code == 422 || !data) {
      window.alert("User already registered");
      console.log("User already registered");
      navigate("/login");
    } else if (data.code == 421) {
      window.alert("Please fill the credentials");
    }
    else {
      window.alert("Registration succesfull");
      console.log("Registration succesfull");
      navigate("/home");
    }
  }

  return (
    <main>
      <Grid container component="main">
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} sx={{ paddingX: 3.5, paddingY: 1 }} component={Paper} elevation={6} square>
          <Box className={classes.Box}>
            <Avatar sx={{ m: 1 }}>
              <LockIcon />
            </Avatar>
            <Typography variant='h5' >SignUp</Typography>
            <Box component="form" method='POST' sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='Your Name' id='name' name='name' onChange={handleChange} value={user.name} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='Your Email' id='email' name='email' type='email' onChange={handleChange} value={user.email} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='Mobile Number' id='phone' name='phone' type='number' onChange={handleChange} value={user.phone} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ApartmentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='Your Profession' id='work' name='work' onChange={handleChange} value={user.work} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='password' id='password' name='password' type='password' onChange={handleChange} value={user.password} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <HttpsOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='Confirm password' id='cpassword' name='cpassword' type='cpassword' onChange={handleChange} value={user.cpassword} />
                  </Box>
                </Grid>
              </Grid>
              <Button variant="contained" size="large" fullWidth sx={{ mt: 3, mb: 1, bgColor: 'secondary.main' }} type="submit" name="signup" id="signup" value="register" onClick={handleSubmit}>Sign Up</Button>
              <Grid container justifyContent="flex-end">
                <Grid item >
                  <Link href="/login" variant="body2">Already have an account? SignIn</Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Grid item >
                  <Typography variant='body2' color="text.secondary">Copyright ©️ arbu.in 2022.</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </main>
  )
}
