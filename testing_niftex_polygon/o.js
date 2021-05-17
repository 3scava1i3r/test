const Web3 = require("web3");
require("dotenv").config();


let url = process.env.TEST_URL;
const PRIVATE_KEY = process.env.PR_KEY;
const SendAddress = process.env.PUB_KEY;




let web3 = new Web3(url);

const SWFcontractAddress = "0xe7D04Bb0F6d19b9ba6b7abCDc2D178b07481b0d7";
let SWFabi = require('./artifacts/contracts/modules/implementations/ShardedWalletFactory.sol/ShardedWalletFactory.json')
let SWFcontract = new web3.eth.Contract( SWFabi.abi , '0xe7D04Bb0F6d19b9ba6b7abCDc2D178b07481b0d7')

const SWcreate = async() => {

    try {

      const nonce = await web3.eth.getTransactionCount(
        process.env.PUB_KEY,
        "latest"
      ); //get latest nonce

      //the transaction
      const tx = {
        from: process.env.PUB_KEY,
        to: SWFcontractAddress,
        nonce: nonce,
        gas: 500000,
        data: SWFcontract.methods
          .mintWallet(
            "0x2B88B03A0f8fa9Af7c80feC237520d5dF840F59F",
            SendAddress,
            "Zenitsu",
            "ZEN",
            SendAddress
          )
          .encodeABI(),
      };


  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth
        .sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ", hash);
            
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        })
        .once("receipt", (receipt) => {
          console.log(receipt.logs);
        })
        
    }  )
    .catch((err) => {
      console.log(" Promise failed:", err);
    });

  
    
      
    } catch (e) {
      console.log(e)
    }
    
}



SWcreate();