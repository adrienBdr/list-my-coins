import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  InjectEthersProvider,
} from 'nestjs-ethers';
import { HttpService } from '@nestjs/axios';
import { StaticJsonRpcProvider, EthersContract, Contract } from 'nestjs-ethers';
import { lastValueFrom } from 'rxjs';
import { TOKEN_LIST_SOURCE } from 'src/constants';
import { Token } from './interfaces/token.interface';
import * as ERC20ABI from '../contracts/abis/erc20.json';

@Injectable()
export class EthersService implements OnModuleInit {
  private existingTokensList: Token[];

  constructor(
    @InjectEthersProvider('eth')
    private readonly ethProvider: StaticJsonRpcProvider,
    @InjectEthersProvider('poly')
    private readonly polyProvider: StaticJsonRpcProvider,
    @InjectEthersProvider('arb')
    private readonly arbProvider: StaticJsonRpcProvider,
    private readonly ethersContract: EthersContract,
    private readonly httpService: HttpService,
  ) { }

  async onModuleInit() {
    try {
      const { data: { tokens = [] } } = await lastValueFrom(this.httpService.get(TOKEN_LIST_SOURCE));
      this.existingTokensList = tokens;
    } catch (e) {
      console.log('error', e)
    }
  }

  getProvider(chainId: number): StaticJsonRpcProvider {
    switch (chainId) {
      case 1:
        return this.ethProvider;
      case 137:
        return this.polyProvider;
      case 42161:
        return this.arbProvider;
      default:
        return this.ethProvider;
    }
  }

  async getERC20balance(token: Token, account: string, chainId: number): Promise<string> {
    let contract: Contract = this.ethersContract.create(
      token.address,
      ERC20ABI,
    );
    contract = contract.connect(this.getProvider(chainId));

    const balance = await contract.balanceOf(account);
    return balance.toString();
  }

  getERC20TokensList(chainId: number): Token[] {
    return this.existingTokensList.filter((token) => token.chainId === chainId);
  }

  async getOwnedERC20List({ chainId, account }: { chainId: number, account: string }) {
    let ownedTokens = [];
    const filteredExistingTokens = this.getERC20TokensList(chainId);

    ownedTokens = await Promise.all(
      filteredExistingTokens.map(async (token) => {
        const { address, name, symbol, decimals } = token
        const balance = await this.getERC20balance(token, account, chainId)
        return ({
          address,
          name,
          symbol,
          decimals,
          balance,
        });
      }),
    );

    return ownedTokens.filter(({ balance }) => balance !== '0');
  }
}
