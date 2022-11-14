import { Injectable } from '@nestjs/common';
import { NETWORK_TO_CHAIN_ID, NETWORK_TO_GECKO_ID } from 'src/constants';
import { Token } from 'src/ethers/interfaces/token.interface';
import { tokenValues } from 'src/tokenValues/interfaces/tokenValues.interface';
import { TokenValuesService } from 'src/tokenValues/tokenValues.service';
import { EthersService } from '../ethers/ethers.service'
import { networkType } from './interfaces/network.interface';
import { formatFixed } from 'nestjs-ethers'

@Injectable()
export class BalancesService {
  calcBalanceUsd({ balance, usdValue, decimals }: { balance: string, usdValue: number, decimals: number }): number {
    const result = Number(formatFixed(balance, decimals)) * usdValue;

    return Math.round((result + Number.EPSILON) * 100) / 100;
  }

  async getBalances({
     ethers,
     tokenValues,
     chain,
     account,
     }: {
      ethers: EthersService,
      tokenValues: TokenValuesService,
      chain: networkType,
      account: string
    }): Promise<Token[]> {
    const accountOwnedTokens: Token[] = await ethers.getOwnedERC20List({ chainId: NETWORK_TO_CHAIN_ID[chain], account });
    const accountOwnedTokensValues: tokenValues[] = await tokenValues.getTokenValues({contracts: accountOwnedTokens, chain: NETWORK_TO_GECKO_ID[chain]});

    const accountOwnedTokensWithBalanceUsd = accountOwnedTokens.map((token) => ({
      ...token,
      balanceUsd: this.calcBalanceUsd({
        balance: token.balance,
        usdValue: accountOwnedTokensValues.find(({ address }) => address === token.address).usdValue,
        decimals: token.decimals,
      }),
    }));
    return accountOwnedTokensWithBalanceUsd;
  }
}
