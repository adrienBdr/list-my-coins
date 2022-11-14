import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {lastValueFrom} from 'rxjs';
import { GECKO_PRICES_API_CALL } from 'src/constants';
import { Token } from 'src/ethers/interfaces/token.interface';
import { tokenValues } from './interfaces/tokenValues.interface';

@Injectable()
export class TokenValuesService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  async getTokenValues({ contracts, chain }: { contracts: Token[], chain: string }): Promise<tokenValues[]> {
    const contractsAddresses = contracts.map(({ address }) => address);
    const { data: tokensValues = { }} = await lastValueFrom(
      this.httpService.get(`${GECKO_PRICES_API_CALL}${chain}?contract_addresses=${contractsAddresses}&vs_currencies=USD`)
    );

    return contractsAddresses.map<tokenValues>((address) => ({
      address,
      usdValue: tokensValues[address.toLocaleLowerCase()]?.usd || 0,
    }))
  }
}
