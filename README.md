# list-my-coins
api endpoint to get a list of coins with their values in $ for a network address

## How to run
1. Open .env file and replace variables with the corresponding endpoint provided on you infura account
2. Run `yarn install`
3. Run `yarn start`

The API only provide one endpoint: `/balances/{ eth | poly | arb }/{ wallet address }
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
