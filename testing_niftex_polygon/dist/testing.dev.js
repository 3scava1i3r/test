"use strict";

var Web3 = require("web3");

require("dotenv").config();

var Contract = require("web3-eth-contract");

var url = process.env.TEST_URL;
var PRIVATE_KEY = process.env.PR_KEY;
var SendAddress = process.env.PUB_KEY;
var web3 = new Web3(url);
Contract.setProvider(url);
var SWFcontractAddress = "0xe7D04Bb0F6d19b9ba6b7abCDc2D178b07481b0d7";

var SWFabi = require("./artifacts/contracts/modules/implementations/ShardedWalletFactory.sol/ShardedWalletFactory.json");

var SWFcontract = new Contract(SWFabi.abi, "0xe7D04Bb0F6d19b9ba6b7abCDc2D178b07481b0d7");
/* console.log(SWFcontract.events); */

var l = function l() {
  var nonce, tx, signPromise;
  return regeneratorRuntime.async(function l$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(web3.eth.getTransactionCount(process.env.PUB_KEY, "latest"));

        case 2:
          nonce = _context2.sent;
          //get latest nonce
          //the transaction
          tx = {
            from: process.env.PUB_KEY,
            to: SWFcontractAddress,
            nonce: nonce,
            gas: 500000,
            data: SWFcontract.methods.mintWallet("0x2B88B03A0f8fa9Af7c80feC237520d5dF840F59F", SendAddress, "Zenitsu", "ZEN", SendAddress).encodeABI()
          };
          signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
          signPromise.then(function _callee(res) {
            var l;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(web3.eth.sendSignedTransaction(res.rawTransaction));

                  case 2:
                    l = _context.sent;
                    console.log(l);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })["catch"](function (err) {
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

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

l();