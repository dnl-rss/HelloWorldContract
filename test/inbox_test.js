// standard JS libs
const assert = require('assert');

// installed JS libs
const ganache = require('ganache-cli'); // local eth testnet, also TestRPC
const Web3 = require('web3'); // contructor for web3

// create ganache provider
const provider = ganache.provider();

// create a web3 instance on local ganache testnet
const web3 = new Web3(provider);

// grab ABI and bytecode from compiled contract
const { interface, bytecode } = require('../compile');

// initialize accounts and inbox variables
let accounts;
let inbox;
const TEST_STRING = 'Hello world'

// mocha.beforeEach() runs before each mocha.it() test
// it is best practice to initalize a new contract for each test
beforeEach(async () => {

  // ganache generates several unlocked accounts,
  // use the first one to deploy contract
  accounts = await web3.eth.getAccounts()

  // contruct the contract from JSON-ABI, deploy to ganache
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [TEST_STRING] })
    .send({ from: accounts[0], gas: '1000000' }); 
  inbox.setProvider(provider);

});

// mocha.it() runs a test and makes an assertion
// mocha.describe() groups several tests together
// three functionality tests are preformed below
describe('Inbox', () => {

  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  }); // test 1

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, TEST_STRING)
  }); // test 2

  it('can change message', async () => {
    await inbox.methods.setMessage('New message')
      .send({ from: accounts[0], gas: '1000000'}); // returns hash
    const message = await inbox.methods.message().call();
    assert.equal(message, 'New message');
  });// test 3

});
