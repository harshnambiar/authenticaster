import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import { Buffer } from 'buffer';
import * as cheerio from 'cheerio';
import '@react95/icons/icons.css';
import Navbar from './NavBar'; 
import { useSpring, animated } from 'react-spring'; 
import styled, { keyframes } from 'styled-components'; 

window.Buffer = Buffer;

interface PageDetails {
  title: string;
  description: string;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CheckScoreContainer = styled('div')`
  background: linear-gradient(270deg, #000, #000);
  background-size: 400% 400%;
  animation: ${fadeIn} 15s ease once;
  padding: 50px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled('div')`
  display: inline-block;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
`;
const CheckScore: React.FC = () => {
    const titleAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

    const fetchData = async () => {
        try {
          const proxyUrl = 'http://localhost:3001/api/proxy';
          const targetUrl = encodeURIComponent('https://www.launchcaster.xyz/p/65c40e303216ae5507ef5743');
          const response = await axios.get(proxyUrl, {
            params: {
              url: targetUrl,
            },
          });
    
          const $ = cheerio.load(response.data);
          const pageDetails: PageDetails = {
            title: '',
            description: '',
          };
    
          const titleElement = $('title').first();
          if (titleElement) {
            pageDetails.title = titleElement.text();
          }
    
          const metaDescription = $('meta[name="description"]').first();
          if (metaDescription) {
            pageDetails.description = metaDescription.attr('content') || ''; // empty string if content is null
          }
    
          console.log(pageDetails);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      return (
        <ThemeProvider theme={theme}>
            <Navbar />
          <CssBaseline />
          <CheckScoreContainer>
            
            <Grid container spacing={3} style={{ padding: 24 }}>
              <Grid item xs={12}>
                <animated.div style={titleAnimation}>
                  <Typography variant="h3" component="h1" gutterBottom>
                    Hi. This is Authenticaster!
                  </Typography>
                </animated.div>
                <Content>
                  <TextField label="Enter something..." variant="outlined" fullWidth />
                  <Button variant="contained" onClick={fetchData}>
                    Fetch Data
                  </Button>
                </Content>
              </Grid>
            </Grid>
          </CheckScoreContainer>
        </ThemeProvider>
      );
    };
    
    export default CheckScore;
    