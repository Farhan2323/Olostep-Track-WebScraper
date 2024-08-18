'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, TextField, Typography, Box, Grid, IconButton } from "@/node_modules/@mui/material/index";
import { AxiosResponse } from "@/node_modules/axios/index";
import React, { useState, ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1290e2',
    },
    secondary: {
      main: '#e26512',
    },
    background: {
      default: '#12e2cd',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#333',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const axios = require("axios");

export default function Home() {
  const [userInput, setUserInput] = useState<string>('');
  const [dataTypes, setDataTypes] = useState<string[]>(['']);
  const [output, setOutput] = useState<Record<string, string | number | boolean>>({});

  interface schema {
    title: string,
    summary: string,
    [key: string]: string // Allow for dynamic keys based on the user input
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }

  const dataTypeHandler = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newDataTypes = [...dataTypes];
    newDataTypes[index] = event.target.value;
    setDataTypes(newDataTypes);
  }

  const addDataTypeField = () => {
    setDataTypes([...dataTypes, '']);
  }

  const scrape = async () => {
    try {
      const response: AxiosResponse<Record<string, string | number | boolean>> = await axios.post(`${apiUrl}/scrape`, {
        url: userInput,
        dataTypes: dataTypes.filter(dataType => dataType !== '') // Send only non-empty data types
      });
      console.log(response.data);
      setOutput(response.data);
    } catch (error) {
      console.error("No fetching");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '150vh', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#8dc6f0' }}>
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
                <Button color='primary' variant="contained" onClick={scrape} disabled={userInput == '' || dataTypes[0] == ''}>
                  Scrape!
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={2}>
              {dataTypes.map((dataType, index) => (
                <Grid item key={index}>
                  <TextField
                    id={`outlined-dataType-${index}`}
                    label={`Data type ${index + 1}`}
                    variant="outlined"
                    value={dataType}
                    onChange={dataTypeHandler(index)}
                    color="primary"
                  />
                </Grid>
              ))}
              <Grid item>
                <IconButton onClick={addDataTypeField} color="primary">
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {Object.entries(output).map(([key, value], index) => (
              <Typography key={index} variant="h3">
                {`${key}: ${value}`}
              </Typography>
            ))}
          </Grid>
          {/* <Grid item>
            <Typography variant="h1">Title: {output?.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">Site Summary: {output?.summary}</Typography>
          </Grid>
          <Grid item>
            {output && Object.keys(output).filter(key => key !== 'title' && key !== 'summary').map((key, index) => (
              <Typography key={index} variant="h3">{`${key}: ${output[key]}`}</Typography>
            ))}
          </Grid> */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
