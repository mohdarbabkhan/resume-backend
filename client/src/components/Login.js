import React from 'react';
import { useState,useContext } from 'react';
import {Paper,Container,Box,Grid,TextField,Typography,Button,Link} from '@mui/material';
import logo from '../images/logo3.jpg'
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../app'

export const Login = () => {
  const {login,setLogin} = useContext(logContext);
    const navigate = useNavigate();
    const [user,setUser] = useState({
      email:"",password:""
    })

    const handleChange = (e)=>{
      var name,value;
      name = e.target.name;
      value = e.target.value;
      setUser({...user,[name]:value});
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const {email,password} = user;
      const req = await fetch("/login",{
        "method":"POST",
        "headers":{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
      })

      const data = await req.json();
      if(data.code==201){
        window.alert("login succesfull");
        navigate("/home")
        setLogin(true);
      }
      else if(data.code == 422){
        window.alert("Please fill all credentials");
      }
      else if(data.code == 404){
        window.alert("Login failed")
      }
    }

  return (
    <><main>
      <Container maxWidth="md">
        <Grid container component={Paper} elevation={6} sx={{ mb: 8, mt: 4, paddingY: 2, paddingX: 4 }}>
          <Grid item md={6} sm={6} xs={12} component="img" src={logo}
            sx={{ p: 4 }} />
          <Grid item md={6} sm={6} xs={12} sx={{ p: 4 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h4">LogIn</Typography>
            <Box component="form" method="POST" sx={{ mt: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                    <EmailIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='Your Email' name='email' value={user.email} onChange={handleChange}/>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <HttpsIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                    <TextField variant='standard' required fullWidth label='password' name="password" value={user.password} onChange={handleChange}/>
                  </Box>
                </Grid>
                <Button variant="contained" size="large" fullWidth sx={{ mt: 3, mb: 1, bgColor: 'secondary.main' }} type="submit" name="login" value="login" onClick={handleSubmit}>Sign In</Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signup" variant="body2">Create an Account</Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main><Footer /></>
  )
}
