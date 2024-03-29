import { Buffer } from 'buffer';
window.Buffer = Buffer;

import React from 'react'
import ReactDOM from 'react-dom/client'

import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import './styles/App.css';
import '@react95/icons/icons.css';


import axios from 'axios';
import * as cheerio from "cheerio";

import { Transaction } from "ethers";


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


 // signed tx
const TX_DATA = "0xf86b808504a817c800825208942890228d4478e2c3b0ebf5a38479e3396c1d6074872386f26fc100008029a0520e5053c1b573d747f823a0b23d52e5a619298f46cd781d677d0e5e78fbc750a075be461137c2c2a5594beff76ecb11a215384c574a7e5b620dba5cc63b0a0f13"
// Create a tx object from signed tx

let t = Transaction.from(TX_DATA);
let pk = t.fromPublicKey || 'blank';
console.log(pk);

try{
  const {
    data: tree
  } = await axios.get('https://33bits.xyz/api/farcaster/tree');

  // Search for public key
  const nodeIndex = tree.elements.findIndex((x: any) => x.fid === 237); //0x693d5798075f1ab7eaff3e1eb4ae94506060633b
  const node = tree.elements[nodeIndex];
  console.log(node);
   // @ts-ignore
   const backend = new BarretenbergBackend(circuit);
   // @ts-ignore
   const noir = new Noir(circuit, backend);
   const input = {
    fid: node.fid,
    public_key: pk,
    note_root: tree.root,
    index: nodeIndex,
    note_hash_path: node.path,
 
  };
  
  console.log(node.key);
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

console.log("hi2");
try {
  //to add data in the server
  const data = {
    votes: 30,
    launchAge: 8,
    proofFlag: true,
    followers: 3000,
    accTimestamp: 111111111,
  }
  const response = await axios.post("http://localhost:5000/api/authenticaster/score", {
    data: data,
  });
  console.log("hi");
  console.log(response);
  
  
  
  
} catch (err) {
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