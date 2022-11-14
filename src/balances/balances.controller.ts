import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { EthersService } from '../ethers/ethers.service'
import { networkType } from './interfaces/network.interface';
import { Token } from '../ethers/interfaces/token.interface';
import { TokenValuesService } from '../tokenValues/tokenValues.service';

@Controller('balances')
export class BalancesController {
  constructor(
    private ethersService: EthersService,
    private tokensValuesService: TokenValuesService,
    private readonly balancesService: BalancesService
  ) {}

  @Get(':chain/:account')
  async getBalances(@Param('chain') chain: networkType, @Param('account') account: string): Promise<Token[]> {
    return await this.balancesService.getBalances({ ethers: this.ethersService, tokenValues: this.tokensValuesService, chain, account });
  }
}
