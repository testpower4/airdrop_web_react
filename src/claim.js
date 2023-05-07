const { task } = require("hardhat/config");
require("dotenv").config()
const axios = require('axios')

const phrase = Buffer.from(process.env.phrase, 'utf8');//crypto.randomBytes(32)
//console.log(typeof phrase, phrase.length, 'phrase**', phrase)
const encrypted = process.env.arb_keys;
const iv = Buffer.from(process.env.iv, 'utf8'); // Generate a random 16-byte IV

const ARB_PROVIDER="https://arb1.arbitrum.io/rpc"
const ETH_PROVIDER="https://eth.llamarpc.com"

const crypto = require('crypto');

async function quick_encrypt(algorithm, phrasePromise, plain, iv) {
  const phrase = await phrasePromise;
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(phrase, 'utf-8'), iv);
  let encrypted = cipher.update(plain, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

async function quick_decrypt(algorithm, phrasePromise, encrypted, iv) {
  const phrase = await phrasePromise;
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(phrase, 'utf-8'), iv);
  let decrypted = decipher.update(Buffer.from(encrypted, 'base64'), 'base64', 'utf-8') + decipher.final('utf-8');
  return decrypted;
}

const algorithm = 'aes-256-cbc';



//console.log(typeof phrase, iv.length, 'phrase**', iv)

/*
// just to read plain and make encrypted
const encryptedPromise = new Promise((resolve, reject) => {
  resolve(quick_encrypt(algorithm, Promise.resolve(phrase), mne_plain, iv));
});

encryptedPromise
  .then(encrypted => {
    console.log("Encrypted data value: ", encrypted);
*/
async function getAccountsData() {
  const decrypted = await quick_decrypt(algorithm, phrase, encrypted, iv);
  //console.log(accounts_data, 'HERE');
  return decrypted
}


function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
abi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint128", "name": "nonce", "type": "uint128" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "Claim", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "INIT_CLAIM", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_ADDRESSES", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_REFER_TOKEN", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_TOKEN", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_claimedUser", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "_usedNonce", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "val", "type": "address" }], "name": "addSigner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "canClaimAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "canGetReferReward", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint128", "name": "nonce", "type": "uint128" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "address", "name": "referrer", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "claimedCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claimedPercentage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claimedSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "signer", "type": "address" }], "name": "delSigner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getInfoView", "outputs": [{ "components": [{ "internalType": "uint256", "name": "maxToken", "type": "uint256" }, { "internalType": "uint256", "name": "initClaim", "type": "uint256" }, { "internalType": "uint256", "name": "currentClaim", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "uint256", "name": "inviteRewards", "type": "uint256" }, { "internalType": "uint256", "name": "inviteUsers", "type": "uint256" }, { "internalType": "uint256", "name": "claimedSupply", "type": "uint256" }, { "internalType": "uint256", "name": "claimedCount", "type": "uint256" }], "internalType": "struct DistributionPool.InfoView", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getSigners", "outputs": [{ "internalType": "address[]", "name": "ret", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token_", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "inviteRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "inviteUsers", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "referReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
addr = "0x7aB3E1D1f706b35B7Ae82987C8862e8E3904529c"

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
async function claim(signer) {
  while (true) {
    try {
      const response = await axios.post('https://arbshib.io/api/arb/eligibility/claim', {
        address: signer.address
      });
      console.log(response.data, signer.address)
      let { signature, nonce } = response.data.data
      const contract = new hre.ethers.Contract(addr, abi, signer)
      let tx = await contract.claim(nonce, signature, "0x3dbb624861c0f62bde573a33640ca016e4c65ff7", { gasLimit: 2000000 })
      await tx.wait()
      console.log(`%s claim %s`, signer.address, tx.hash)
      return
    } catch (e) {
      console.log(e)
      await sleep(5)
    }
  }
}

task("claim", "", async (taskArgs, hre) => {
    const provider = new hre.ethers.providers.JsonRpcProvider(ARB_PROVIDER)
    //let PRIVATE_KEYS=getAccountsData()
    let PRIVATE_KEYS;
  try {
    PRIVATE_KEYS = await getAccountsData();
  } catch (error) {
    // handle the error
    console.error(error);
    return;
  }
    

    for (let key of PRIVATE_KEYS.split(",").slice(4)) //.slice(2) means remove first 2 keys (CLAIMED!)
    {
        const signer = new hre.ethers.Wallet(key, provider)
        await claim(signer)
    }
})

