import os
import asyncio
import aiohttp
import time
import json

import env_util
import random_mnemonic

import web3



async def sleep(seconds):
    await asyncio.sleep(seconds)


def transfer_in(sign_wallet, save=False, wait=True, **kwargs):
    '''
    basic trans, mainly to move ETH now, as not creating calldata
    '''
    mapping = {'from_addr': 'from'}  # escape reserved keyword

    # Map the parameter names to the keys in the kwargs dictionary
    for key, value in mapping.items():
        if key in kwargs:
            kwargs[value] = kwargs.pop(key)
    # MOVE eth, and others, now defined in **kwargs
    construct_txn = env_util.barebone_tx(env_util.chain)  # transfer ETH, no data
    construct_txn.update(kwargs)
    logging.info(construct_txn)
    if save:
        env_util.save_gas(construct_txn)

    '''if kwargs.get("key_field"):
        if key_field is passed in, then pass out to write_()
        res = env_util.write_(sign_wallet, construct_txn)  # , key_field=kwargs.get("key_field")
    else:'''
    res = env_util.write_(sign_wallet, construct_txn)
    if wait:
        sleep_len = rand_default()
        print(f'await {sleep_len} secs')
        sleep(sleep_len)
        # asyncio.sleep(sleep_len)  # sleep_short(666, 833, 53)
    return res


def love(signer, dispatcher, action, parallel_cnt=1, retry_times=0, *args):
    '''
    just test RPC
    '''
    from_addr = env_util.w3.toChecksumAddress(signer["address"])
    
    #if bal < 0.002:
        #print(f'eth bal:{bal}, we will manipulate {zk_eth}')
    sender_address = env_util.w3.toChecksumAddress(
            dispatcher["address"]
    
        # SEND eth to each wallet
    transfer_in(
            dispatcher,
            value=int(zk_eth * env_util.ETH_DECIMAL),
            nonce=env_util.w3.eth.getTransactionCount(sender_address),
            to=from_addr,
            from_addr=sender_address,  # any ZK transaction need FROM. ContractLogicError: execution reverted: Failed to submit transaction: invalid sender. can't start a transaction from a non-account
        )


def split_raw_keys(dec):
# arb_keys is just csv keys
    PRIVATE_KEYS = dec.split(',')  
    wallets = [
        {
            'address': env_util.Account.from_key(private_key).address,
            'privateKey': private_key,
        }
        for private_key in PRIVATE_KEYS
    ]
    return wallets
def main():
    env_util.init_w3('arbitrum', fast=True)

    # meta_list = ast.literal_eval(os.getenv('cosmos_raw'))[19:21]
    dec = input('passphrase=')

    wallets = split_raw_keys(dec)
    dispatcher = wallets[0]
    # print(dispatcher, "EXAMPLE+++")

    love(
            dispatcher,
            dispatcher,
            'not used',
        )
    # get_claim("https://api.virtuswap.io/airdropEligible", signer)


# Start the program
if __name__ == "__main__":
    main()

    '''
    contract_addr = "0xb85eeb713b876a25f16604887cc6b8997ef1b9dd"
    abi = [
        {
            "inputs": [
                {"internalType": "uint256", "name": "index", "type": "uint256"},
                {"internalType": "uint256", "name": "value", "type": "uint256"},
                {"internalType": "bytes32", "name": "", "type": "bytes32"},
            ],
            "name": "claim",
            "outputs": [],
            "type": "function",
        }
    ]
    '''

'''
Your question pertains to HTTP cache control and particularly the Cache-Control directive 'must-revalidate'. This directive means that once the cached data has expired, it must not be used again without revalidation with the server. Revalidation is a mechanism to check whether the cached response is still fresh.

In Python, when you make a request to an HTTP server that has previously responded with a must-revalidate Cache-Control directive, you can use the If-None-Match header with the ETag value that the server previously sent. This way, the server will respond with a 304 Not Modified status if the resource hasn't changed, allowing your client to use its cached version.

Here's a Python example using the requests library:

python
Copy code
import requests

# Assuming you previously received this ETag for the resource
etag = 'W/"cp7e18sd7f10w"'

headers = {'If-None-Match': etag}

response = requests.get('http://example.com/resource', headers=headers)

if response.status_code == 304:
    print('Resource has not changed')
else:
    print('Resource has changed or ETag is not valid anymore')
    # process the new response and update your cache
Please note that this example presumes that you have a caching mechanism in place, because the concept of revalidation makes sense only if you're storing responses for later reuse.

You might want to check out libraries like CacheControl, which is a requests library extension, to handle HTTP caching in your Python applications.
'''
