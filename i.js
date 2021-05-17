const axios = require("axios");
const fetch = require("node-fetch");
const serversList = require("./servers");
const got = require("got");
const tunnel = require("tunnel");

let si = 0;

let g = new Array();
let l = new Array();


const delay = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const getHost = () => {
  si++;
  if (si === serversList.length) si = 0;
  const [host, port] = serversList[si].split(":");
  return { host, port };
};


const procreq = async ({ _url }) => {
  try {
    const request = got(_url, {
      responseType: "json",
      /* agent: {
        https: tunnel.httpsOverHttp({
          proxy: getHost(),
        }),
      }, */
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        request.cancel();
        resolve("");
      }, 2 * 1000);
    });
    return await Promise.race([request, p2]);
  } catch (err) {
    throw err;
  }
};

const processWithRetry = async ({ _url }) => {
  try {
    const ra = [...new Array(20)].map((r) => 1); //retry 20 times
    let apiresp;
    let retryAttempt = 0;
    const resp = await ra.reduce(async (previousPromise, nextID) => {
      try {
        const res = await previousPromise;
        if (!res?.body && !apiresp) {
          retryAttempt++;
          return procreq({ _url });
        }
        if (res?.body) apiresp = res?.body;
        return Promise.resolve();
      } catch (err) {
        retryAttempt++;
        return procreq({ _url });
      }
    }, Promise.resolve());
    return { retryAttempt, success: retryAttempt < 20 ? "success" : "error" };
  } catch (err) {
    console.log(err);
    return "";
  }
};

axios
  .post(
    "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-main-subgraph-rinkeby",
    {
      query: `
              
                {
                  tokens{
                    id
                    name
                    symbol
                    totalSupply{
                      value
                    }
                    asWallet{
                      id
                      
                      crowdsales{
                        id
                        balance{
                        value
                        }
                        price{
                          value
                        }
                        offeredShards{
                          value
                        }
                        remainingShards{
                          value
                        }
                        deadline
                        status
                      }
                      
                      owner{
                        id
                        
                      }
                    }
                  }
          }`,
    }
  )
  .then((res) => {
    const a = res.data.data.tokens;

    a.map(async (listitem) => {
      if (
        listitem.asWallet !== null &&
        listitem.asWallet.crowdsales[0] !== undefined
      ) {
        axios
          .post(
            "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody",
            {
              query: `
                {
                  wallet(id: "${listitem.asWallet.id}" ){
                    id
                    nfts{
                      name
                      symbol
                      id
                      registry
                      tokenId
                    }
                  }
                }
                  `,
            }
          )
          .then((res) => {
            /* console.log(res.data.data.wallet.nfts[0]); */

            if (res.data.data.wallet.nfts[0] !== undefined) {
              let add = res.data.data.wallet.nfts[0].registry;
              let tkid = res.data.data.wallet.nfts[0].tokenId;
              let wid = listitem.id;
              let symbol = listitem.symbol;
              let name = listitem.name;
              let status = listitem.asWallet.crowdsales[0].status;
              let price = listitem.asWallet.crowdsales[0].price.value;

              g.push({ add, tkid, wid, symbol, name, status, price });

              console.log(add + "/" + tkid)
              

              let _url = `https://rinkeby-api.opensea.io/api/v1/assets?format=json&limit=1&token_id=${tkid}&asset_contract_address=${add}`;
              const imageurl = async() => {
                try{
                  const t = await processWithRetry({_url})
                  console.log(t);
                }
                catch(e){
                  console.log(e);
              }
              }
              
              
              
              
              

              /* const options = { method: "GET" };
              const imgurl = async () => {
                await delay();
                const r = await fetch(
                  `https://rinkeby-api.opensea.io/api/v1/assets?format=json&limit=1&token_id=${tkid}&asset_contract_address=${add}`,
                  options
                ).then(async (response) => {
                  const a = await response.json();
                  console.log(a);

                  //console.log(a.assets[0].image_url);
                });
              };
              imgurl(); */



            } else {
              /* console.log("reclaimed")  */
            }
          });
      }
    });
  })
  .catch((err) => console.error(err));
