
import React,{useState,useEffect,useNavigate} from 'react';
import { Container, Box, Grid, Typography, Paper, TextField, Button } from '@mui/material';
import useStyles from '../styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import MapIcon from '@mui/icons-material/Map';
import { Footer } from './Footer';

export const Contact = () => {
    const classes = useStyles();
    const [userdata,setuserdata] = useState({name:"",email:"",phone:"",message:""});
  const callContactPage = async()=>{
    try {
       const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });
      const data = await res.json();
      setuserdata({...userdata,name:data.name,email:data.email,phone:data.phone});
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    callContactPage();
  },[])

  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setuserdata({...userdata,[name]:value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name,email,phone,message} = userdata;
    const res = await fetch("/contact",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,phone,message})
    })
    const data = await res.json();
    if(!data){
        console.log("message not sent");
    }else{
        alert("message sent");
        setuserdata({...userdata,message:""})
    }
    
  }
    return (
        <main className={classes.main}>
            <Container maxWidth="md" sx={{ paddingY: 5 }} >
                <Grid container spacing={4} >
                    <Grid item md={4} xs={12}>
                        <Box component={Paper} elevation={1} className={classes.main} sx={{ p: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <Typography>Phone</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ paddingLeft: 3 }}>+91873839238</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box component={Paper} elevation={1} className={classes.main} sx={{ p: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <Typography>Email</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ paddingLeft: 3 }}>arbab@gmail.com</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box component={Paper} elevation={1} sx={{ p: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <MapIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <Typography>Address</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ paddingLeft: 3 }}>Up,india</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Container component={Paper} elevation={3} maxWidth="sm" sx={{ mt: 6, paddingY: 4 }}>
                    <Typography variant="h5" sx={{ ml: 5, mb: 4 }}>Get in Touch</Typography>
                    <Box component="form" method="POST" sx={{ paddingX: 6 }}>
                        <Grid container spacing={4}>
                            <Grid item md={4} xs={12}>
                                <TextField fullWidth name="name" onChange={handleChange} value={userdata.name}/>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <TextField fullWidth name="email" onChange={handleChange} value={userdata.email}/>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <TextField fullWidth name="phone" onChange={handleChange} value={userdata.phone}/>
                            </Grid>
                            <Grid item md={12} >
                                <TextField label="Message" name="message" onChange={handleChange} value={userdata.message}fullWidth multiline rows={4} />
                            </Grid>
                            <Button variant="contained" fullwidth sx={{ mt: 2, ml: 4 }} value="contact" onClick={handleSubmit}>Send Message</Button>
                        </Grid>
                    </Box>
                </Container>
            </Container>
            <Footer />
        </main>
    )
}
