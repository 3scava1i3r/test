"use strict";

var Web3 = require("web3");

require("dotenv").config();

var contract = require("./artifacts/contracts/polygon.sol/MyNFT.json");
/* const contractAddress = "0xa65abB3b82aB47e786e7631E3D61e27257459F5b"; */


var contractAddress = "0xeF0D260D487218e2314E85240424c159086b713C";
var PRIVATE_KEY = process.env.PRIVATE_KEY;
var url = process.env.RIN_URL;
var web3 = new Web3(url); //console.log(JSON.stringify(contract.abi));

var sendaddress = process.env.PUB_KEY;
var nftContract = new web3.eth.Contract(contract.abi, contractAddress);

function mintNFT(tokenURI) {
  var nonce, tx, signPromise;
  return regeneratorRuntime.async(function mintNFT$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(web3.eth.getTransactionCount(process.env.PUB_KEY, "latest"));

        case 2:
          nonce = _context.sent;
          //get latest nonce
          //the transaction
          tx = {
            from: process.env.PUB_KEY,
            to: contractAddress,
            nonce: nonce,
            gas: 500000,
            data: nftContract.methods.mintNFT(process.env.PUB_KEY, tokenURI).encodeABI()
          };
          signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
          signPromise.then(function (signedTx) {
            web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
              if (!err) {
                console.log("The hash of your transaction is: ", hash, "\nCheck Covalent's API");
              } else {
                console.log("Something went wrong when submitting your transaction:", err);
              }
            });
          })["catch"](function (err) {
            console.log(" Promise failed:", err);
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmVgwrEy1wRzNztZE3SeBNqW33xhN63ezm5NwW2AatksC9");