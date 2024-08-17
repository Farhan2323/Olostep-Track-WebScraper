'use client'
import { ThemeProvider, createTheme,  } from '@mui/material/styles';
import { Button, TextField, Typography, Box, Grid } from "@/node_modules/@mui/material/index";
import { AxiosResponse } from "@/node_modules/axios/index";
import React, {useState, ChangeEvent} from "react";


const theme = createTheme({
  palette: {
    primary: {
      main: '#1290e2', // Change this to your desired primary color
    },
    secondary: {
      main: '#e26512', // Change this to your desired secondary color
    },
    background: {
      default: '#12e2cd', // Change the default background color
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#333', // Custom color for h1
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#333', // Custom color for h2
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const axios = require("axios")

export default function Home() {
  const [userInput, setuserInput] = useState<string>('');
  const inputHandler = (event : ChangeEvent<HTMLInputElement>) => {
    setuserInput(event.target.value);
  }

  const [output , setOutput] = useState<schema>()

  interface schema {
    title: string,
    summary: string 
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const scrape = async() =>{
    try{
      const response: AxiosResponse<schema> = await axios.post(`${apiUrl}/scrape` , {url : userInput})
      console.log(response.data)
      setOutput(response.data)

    }catch (error){
      console.error("NO fetching")

    }
    
    
    
    

  }

  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' , backgroundColor: '#8dc6f0' }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h1" component="h1" gutterBottom>
              Olostep-Track Web Scraper
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Enter URL here!"
                  variant="outlined"
                  value={userInput}
                  onChange={inputHandler}
                  color="primary"
                  
                />
              </Grid>
              <Grid item>
                <Button color='primary' variant="contained" onClick={scrape}>
                  Scrape!
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h1"> Title: {output?.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3"> Site Summary: {output?.summary}</Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
