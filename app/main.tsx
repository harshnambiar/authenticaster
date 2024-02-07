import { Buffer } from 'buffer';
window.Buffer = Buffer;

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';

import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import './styles/App.css';
import '@react95/icons/icons.css';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import axios from 'axios';
import * as cheerio from "cheerio";

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';


import {
  BrowserRouter as Router,
} from 'react-router-dom';

const response = await axios.get("https://cors-anywhere.herokuapp.com/https://www.launchcaster.xyz/p/65c338033216ae5507e98120", {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
 
});
const selector = cheerio.load(response.data);
var launcher = selector(".details_user__ptlCa").text() || "";
console.log(launcher.substring(launcher.indexOf("@"), launcher.indexOf("launcher") - 1));

var time = (selector(".details_date__alm2Z").text()) || "";
console.log(time);


const fid = 666;
const url = "https://fnames.farcaster.xyz/transfers?name";
const name = "farcaster";
try {
    const x = await axios.get(`${url}=${name}`);

    console.log(`API Returned HTTP status ${x.status}`);
    console.log(x);
} catch (e) {
    // Handle errors
    console.log("sorry bro..");
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
  <div style={{visibility: "hidden", height: "10em"}}></div>
    <div style={{fontSize: "5em", marginLeft: "4em", marginBottom: "3px"}}>
        Hi. This is authenticaster!
    </div>
    <form >
        <input style={{width: "10em", fontSize: "5em", marginLeft: "4em"}}></input>
    </form>
  </>
  // </React.StrictMode>,
)