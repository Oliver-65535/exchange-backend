const Web3 = require("web3");
const contractAbi = require("./abis/testAbi.json");

const ethNetwork =
  "wss://goerli.infura.io/ws/v3/241d4e2459c14fcfbf62e872ab36e638";
const web3 = new Web3(new Web3.providers.WebsocketProvider(ethNetwork));
const myContract = new web3.eth.Contract(
  contractAbi,
  "0xd68d47b3c3960A13BCBc4248D115c3Ed8c3e4B3c"
  //   "0x352F8C1f8576183b6c783D3e589aBB69FfBeBc47"
);

myContract
  .getPastEvents(
    "OrderCreated",
    {
      filter: {
        myIndexedParam: [20, 23],
        myOtherIndexedParam: "0x123456789...",
      }, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: "latest",
    },
    function (error, events) {
      console.log(events);
    }
  )
  .then(function (events) {
    console.log(events); // same results as the optional callback above
  });

myContract.events.Minted(
  {
    //filter: { myIndexedParam: [20, 23], myOtherIndexedParam: "0x123456789..." }, // Using an array means OR: e.g. 20 or 23
    fromBlock: "latest",
  },
  function (error, event) {
    console.log(event);
  }
);

// myContract.events.Added(
//   {
//     //filter: { myIndexedParam: [20, 23], myOtherIndexedParam: "0x123456789..." }, // Using an array means OR: e.g. 20 or 23
//     fromBlock: "latest",
//   },
//   function (error, event) {
//     console.log(event);
//   }
// );

// unsubscribes the subscription
// subscription.unsubscribe(function (error, success) {
//   if (success) console.log("Successfully unsubscribed!");
// });
