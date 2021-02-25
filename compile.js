
// Standard JS libs, ensures cross-platform file system compatibility
const path = require('path');
const fs = require('fs');

// Installed lib
const solc = require('solc');

// Get the contract path
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// Read the contract
const source = fs.readFileSync(inboxPath, 'utf8');

// Compile contract with solidity compiler
// Returns bytecode and interface (ABI)
// Bytecode gets deployed to EVM
// The ABI specifies the contract functions, arguments, and variables
num_contracts = 1
module.exports = solc.compile(source, num_contracts).contracts[':Inbox'];
