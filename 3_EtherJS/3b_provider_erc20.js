
// Loading path module for operations with file paths.
import { resolve } from 'path';
import { existsSync } from 'fs';
import dotenv from 'dotenv';

// Ethers JS: Providers.
////////////////////////

// A Provider is a read-only connection to the blockchain, which allows
// querying the blockchain state, such as accout, block or transaction
// details, querying event logs or evaluating read-only code using call.

// See: https://docs.ethers.org/v6/getting-started/

// Exercise 0. Require the `dotenv` and `ethers` package.
/////////////////////////////////////////////////////////

import { config } from 'dotenv';
import { ethers } from 'ethers';

// Require packages.

let pathToDotEnv = resolve(process.cwd(), '../.env');
// console.log(pathToDotEnv);
if (existsSync(pathToDotEnv)) {
    dotenv.config({ path: pathToDotEnv });
    console.log('Environment variables loaded successfully.');
} else {
    console.log('Error: .env file not found.');
}

import { JsonRpcProvider } from "ethers";

const providerKey = process.env.INFURA_KEY;

const sepoliaUrl = `${process.env.INFURA_SEPOLIA_API_URL}${providerKey}`;
// console.log(sepoliaUrl);
const sepoliaProvider = new JsonRpcProvider(sepoliaUrl);

// Exercise 1. Bonus. Get ERC20 Balance.
////////////////////////////////////////

// To get the balance of ERC20 tokens the procedure is a bit more complex.
// ETH is the native currency of Ethereum, so it's "simply there". Instead,
// ERC20 tokens are added to Ethereum via smart contracts. So, we need to 
// interact with the smart contract of the specific token we want to know
// the balance of.

// We need to know the address of the smart contract. We can use the 
// LINK contract. What is it? 
// Hint: First, get some LINK ERC20 tokens:
// https://faucets.chain.link/sepolia
// Then check the transaction: with which contract did it interact?

// const linkAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const linkAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

// At the address, there is only bytecode. So we need to tell Ethers JS, what
// methods can be invoked. To do so, we pass the Application Binary Interface
// (ABI) of the contract, available at Etherscan. For your convenience, 
// the LINK ABI is stored in this directory, under "link_abi.json";

import linkABI from './link_abi.json' with { type: 'json' };

// Now your task. Get the balance for LINK for "unima.eth" and "vitalik.eth".
// Hint: you need first to create a Contract object via `ethers.Contract`, 
// then invoke the appropriate smart contract method.
// Hint2: want to try it with your own address? Get some LINK ERC20 tokens: 
// https://faucets.chain.link/sepolia

const link = async () => {
    const linkContract = new ethers.Contract(linkAddress, linkABI, sepoliaProvider);

    const unimaAddress = await sepoliaProvider.resolveName("unima.eth");
    const vitalikAddress = await sepoliaProvider.resolveName("vitalik.eth");
    const adrtnkAddress = await sepoliaProvider.resolveName("adrtnk.eth");
    const chrisAddress = await sepoliaProvider.resolveName("chris.eth");

    const unimaBalance = await linkContract.balanceOf(unimaAddress);
    const vitalikBalance = await linkContract.balanceOf(vitalikAddress);
    const adrtnkBalance = await linkContract.balanceOf(adrtnkAddress);
    const chrisBalance = await linkContract.balanceOf(chrisAddress);

    console.log("LINK balance for unima.eth: ", unimaBalance.toString());
    console.log("LINK balance for vitalik.eth: ", vitalikBalance.toString());
    console.log("LINK balance for adrtnk.eth: ", adrtnkBalance.toString());
    console.log("LINK balance for chris.eth: ", chrisBalance.toString());
};

link();
