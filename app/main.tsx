import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import { Buffer } from 'buffer';
import * as cheerio from 'cheerio';
import '@react95/icons/icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CheckScore from './CheckScore'; 
import About from './About';

window.Buffer = Buffer;

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface PageDetails {
  title: string;
  description: string;
}
const App: React.FC = () => {
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

      // console.log(pageDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check-score" element={<CheckScore />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
