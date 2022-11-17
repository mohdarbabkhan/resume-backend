import React, { useContext, useEffect } from 'react'
import { Typography,Paper,Container,Box,Grid } from '@mui/material'
import { Footer } from './Footer'
import useStyles from '../styles'
import { logContext } from '../app'
export const Error = () => {
    const {login,setLogin} = useContext(logContext);
    const classes = useStyles();
    const callLogedOut = async()=>{
      const res = await fetch('/getlogout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const data = await res.json();
        if(data){
            alert("LoggedOut");
            setLogin(false);
        }else{
            alert("LogedOut Unsuccesfull")
        } 
}
    useEffect(()=>{
        callLogedOut();
    },[])
  return (
    <main>
    <div  className={classes.bColor}>
      <Box sx={{pt:25}}>
        <Typography variant='h3' sx={{fontWeight:"bold"}}>You have been Logged Out</Typography>
        <Typography variant='h6'>Hope to see u back!!</Typography>
       
        </Box>
    </div>
    <Footer/>
    </main>
  )
}

