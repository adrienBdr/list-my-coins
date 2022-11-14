import { Module } from '@nestjs/common';
import { EthersConnectModule } from '../ethers/ethersConnect.module';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { TokenValuesModule } from '../tokenValues/tokenValues.module';

@Module({
  imports: [EthersConnectModule, TokenValuesModule],
  controllers: [BalancesController],
  providers: [BalancesService],
  exports: [BalancesService]
})
export class BalancesModule { }
