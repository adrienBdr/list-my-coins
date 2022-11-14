# list-my-coins
api endpoint to get a list of coins with their values in $ for a network address

## How to run
1. Open .env file and replace variables with the corresponding endpoints provided on your infura account
2. Run `yarn install`
3. Run `yarn start`

The API only provide one endpoint: `/balances/{ eth | poly | arb }/{ wallet address }`
The response will be a list of erc20 tokens owned by the address on the chain specified while calling the endpoint:
```
[
  {
    "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "name": "DAI Stablecoin",
    "symbol": "DAI",
    "decimals": 18,
    "balance": "1234990000000000000000",
    "balanceUsd": 1234.99
  },
  ...
]
```

## Problem and possible solutions

A wallet doesn't store the tokens he owns like it stores ETH; to know if a wallet own the token we theorically have to call getBalance() on all the tokens smartContracts of the chain.

=> solutions
  - searching all transactions of the wallet to find the list of the token's smartContracts he interracted with. The wallet could of made dosens of transactions making the process very long.
  - (implemented) getting a list of main tokens from https://tokenlists.org/ which is downloaded every time the server start; a bit long but acceptable compared to first solution; downside is that it still make a lots of calls to getBalance().
  - better solution would be to store the first listing of the wallet in a database and use the first solution to only call getBalance() on the newly interracted contracts since the last call to the endpoint instead of calling again the full list

