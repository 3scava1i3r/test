"use strict";

var _require = require("axios"),
    axios = _require["default"];

var fetch = require('node-fetch');

var got = require('got');
/* const l = async() => {
    const t = await axios.get(
    `https://api.covalenthq.com/v1/4/tokens/0x1c22e4edda90b8892a8347dbee2f296146e8d901/nft_metadata/50/?key=ckey_b723d1e793e84a40976add68ed9:`
    );
    console.log(t.json());
}
l(); */

/* 
const options = { method: "GET" };
 fetch(
   `https://api.covalenthq.com/v1/4/tokens/0x1c22e4edda90b8892a8347dbee2f296146e8d901/nft_metadata/50/?key=ckey_b723d1e793e84a40976add68ed9: `,
   options
 ).then(async (response) => {
     try {
         const a = await response.json();
         console.log(a);
     } catch (e) {
         console.log(e)
     }
   
   
 });  */

/* 
const options = { method: "GET" };
 fetch(
   `https://api.covalenthq.com/v1/137/address/0xbb3b3ab4eee908e52904aae8efa5d9b83ca7d441/balances_v2/?nft=true/?key=ckey_b723d1e793e84a40976add68ed9:`,
   options
 ).then(async(res) => {
    try{
        let l = await res.json();
        
        console.log(l)
    }catch(e) {
        console.log(e)
    }
 });

 */
///////////////////////// get my nfts 
//////////////////////// 


for (i = 0; i < 20; i++) {
  got.get("https://testnets-api.opensea.io/api/v1/metadata/0x1c22e4edda90b8892a8347dbee2f296146e8d901/50").then(function _callee(r) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              console.log(r);
            } catch (e) {
              console.log(e);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}