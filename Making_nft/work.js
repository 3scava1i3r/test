const Web3 = require("web3");
require("dotenv").config();
const contract = require("./artifacts/contracts/polygon.sol/MyNFT.json");
/* const contractAddress = "0xa65abB3b82aB47e786e7631E3D61e27257459F5b"; */
const contractAddress = "0xeF0D260D487218e2314E85240424c159086b713C";


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const url = process.env.RIN_URL;



let web3 = new Web3(url);
//console.log(JSON.stringify(contract.abi));

const sendaddress = process.env.PUB_KEY;

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);



async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(process.env.PUB_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: process.env.PUB_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .mintNFT(process.env.PUB_KEY, tokenURI)
      .encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Covalent's API"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmVgwrEy1wRzNztZE3SeBNqW33xhN63ezm5NwW2AatksC9"
);
