// EthersJS: Wallets.
/////////////////////

// Ethers JS:
// https://docs.ethers.org/v6/

// Exercise 1. Create a Random Wallet.
//////////////////////////////////////

import { assert } from "console";
import { ethers } from "ethers";

// a. Create a random wallet and print the address, the private key,
// and the mnenomic phrase.
// Hint: 

let wallet = ethers.Wallet.createRandom();

console.log("Address:", wallet.address);
console.log("Private key:", wallet.privateKey);
console.log("Mnemonic phrase:", wallet.mnemonic.phrase);

// b. Bonus. Print the derivation path of the wallet and check that it is
// equal to `baseDevPath`. 


let baseDevPath = "m/44'/60'/0'/0/";

// Wait what is the derivation path? 
// Basically, the mnemonic alone isn't enough to determine an address
// and you need this extra bit of information. You may learn more here:
// https://www.youtube.com/watch?v=tPCN3nDVzZI
// Also:
// https://vault12.com/securemycrypto/crypto-security-basics/what-is-bip39/


console.log("Derivation path:", wallet.path);

// Your code here!

const walletPath = baseDevPath + "0";

assert(wallet.path === walletPath, "The derivation path is not equal to baseDevPath.");

// exit();

// Exercise 2. Bonus. Create a Hierarchical Deterministic Wallet.
/////////////////////////////////////////////////////////////////
console.log();

// From the same wallet, you can derive a deterministic sequence of addresses.
// First, pick a mnemonic, then create a hierarchical deterministic wallet, 
// finally print the first 10 addresses and private keys generated.
// Hint: You need to append an index to the derivation path.

// Your code here!

let mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
let hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);

let addresses = [];
let privateKeys = [];

for (let i = 0; i < 10; i++) {
    let path = `${baseDevPath}${i}`;
    let wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, path);
    addresses.push(wallet.address);
    privateKeys.push(wallet.privateKey);
}

console.log("Addresses:", addresses);
console.log("Private keys:", privateKeys);