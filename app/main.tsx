import { Buffer } from 'buffer';
window.Buffer = Buffer;

import React from 'react'
import ReactDOM from 'react-dom/client'

import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import './styles/App.css';
import '@react95/icons/icons.css';


import axios from 'axios';
import * as cheerio from "cheerio";


import circuit from '../circuits/target/main.json';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';


const extractFarcasterHash = (text: string): string | null => {
  // Regular expression to match a Farcaster hash
  // It looks for '0x' followed by a sequence of hexadecimal characters
  const regex = /0x[a-fA-F0-9]+/;

  // Search for the pattern in the text
  const match = text.match(regex);

  // If a match is found, return it; otherwise return null
  return match ? match[0] : null;
};

const fetch = async (query): Promise<any> => {
  const farcaster_hash = extractFarcasterHash(query);
}


const response = await axios.get("https://cors-anywhere.herokuapp.com/https://www.launchcaster.xyz/p/65c40e303216ae5507ef5743", {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
 
});
const selector = cheerio.load(response.data);
var launcher_q = selector(".details_user__ptlCa").text() || "";
var launcher = (launcher_q.substring(launcher_q.indexOf("@")+1, launcher_q.indexOf("launcher") - 1));
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
  url: 'https://build.far.quest/farcaster/v2/user-by-username='.concat(launcher),
  headers: {
    'API_KEY': key,
    "Access-Control-Allow-Origin": "*",
    'accept': 'application/json',
  },
  
  
};
axios(config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

try{
  const {
    data: tree
  } = await axios.get('https://33bits.xyz/api/farcaster/tree');

  // Search for public key
  const nodeIndex = tree.elements.findIndex((x: any) => x.fid === 237);
  const node = tree.elements[nodeIndex];
  console.log(node);
   // @ts-ignore
   const backend = new BarretenbergBackend(circuit);
   // @ts-ignore
   const noir = new Noir(circuit, backend);
   const input = {
    fid: node.fid,
    public_key: node.key,
    note_root: tree.root,
    index: nodeIndex,
    note_hash_path: node.path,
 
  };
  

  console.log('Hold on, generating the zk proof…');

  const proof = await noir.generateFinalProof(input);
  if (proof){
    console.log("successful verification");
  }
  else {
    console.log("verification failed");
  }
}
catch (err){
  console.log(err);
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