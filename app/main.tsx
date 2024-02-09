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



const response = await axios.get("https://cors-anywhere.herokuapp.com/https://www.launchcaster.xyz/p/65c40e303216ae5507ef5743", {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
 
});
const selector = cheerio.load(response.data);
var launcher_q = selector(".details_user__ptlCa").text() || "";
var launcher = (launcher_q.substring(launcher_q.indexOf("@"), launcher_q.indexOf("launcher") - 1));
console.log(launcher);
var addItems = selector('.details_user__ptlCa div a');
var add = "";
addItems.each((idx, el)=>{
  const href= selector(el).attr("href");
  if (idx == 0){
    add = href || "";
  }
})
if (add.length != 0) {
  add = add.substring(add.indexOf("/launchers/") + 11, add.length);
}
console.log(add);


var time = (selector(".details_date__alm2Z").text()) || "";
console.log(time);


const fid = 666;
const url = "https://fnames.farcaster.xyz/transfers?name";
const name = launcher;
try {
    const x = await axios.get(`${url}=${name}`);

    console.log(`API Returned HTTP status ${x.status}`);
    console.log(x);
} catch (e) {
    // Handle errors
    console.log("sorry bro..");
}


const key = "7CP6C-TFIQU-I5OYD-T3VJM-P65GS";
const config = {
  method: 'get',
  url: 'https://protocol.wield.co/farcaster/v2/username-by-connected-address?address='.concat(add),
  headers: {
    'API_KEY': key,
    "Access-Control-Allow-Origin": "*",
  },
  
  
};
axios(config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })





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