import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthersConnectModule } from './ethers/ethersConnect.module';
import { BalancesModule } from './balances/balances.module';
import { TokenValuesModule } from './tokenValues/tokenValues.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EthersConnectModule, BalancesModule, TokenValuesModule, ConfigModule.forRoot({ isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
