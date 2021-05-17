const Web3 = require("web3");
require("dotenv").config();
var Contract = require("web3-eth-contract");


let url = process.env.TEST_URL;
const PRIVATE_KEY = process.env.PR_KEY;
const SendAddress = process.env.PUB_KEY;

let web3 = new Web3(url);
Contract.setProvider(url);



const SWFcontractAddress = "0xe7D04Bb0F6d19b9ba6b7abCDc2D178b07481b0d7";
let SWFabi = require("./artifacts/contracts/modules/implementations/ShardedWalletFactory.sol/ShardedWalletFactory.json");
let SWFcontract = new Contract(
  SWFabi.abi,
  "0xe7D04Bb0F6d19b9ba6b7abCDc2D178b07481b0d7"
);
/* console.log(SWFcontract.events); */

const l = async() => {

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
    signPromise.then( async(res) => {
        let l = await web3.eth.sendSignedTransaction(res.rawTransaction);
        console.log(l);
    }).catch((err) => {
      console.log(" Promise failed:", err);
    });


/* SWFcontract.getPastEvents("NewInstance", {
  fromBlock: 13905427,
  toBlock: 13906426,
})
  .then((event) => {
    console.log(event);
  })
  .catch((err) => console.error(err));


 */
}
l();

