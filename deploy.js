const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');


const { interface, bytecode } = require('./compile');

// create provider instance with 12 word mnemonic and infura endpoint
// user must replace MNEMONIC with 12 word phrase for their HD hdwallet
// and RINKBY_ENDPOINT with the Infura API endpoint generated for their project
// DO NOT commit these to github
const provider = new HDWalletProvider(
  MNEMONIC,
  RINKBY_ENDPOINT
);

// create a web3 instance
const web3 = new Web3(provider);

// deploy contract and print address
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploying from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello world']})
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address)
};
deploy();
