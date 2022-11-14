import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EthersModule, MAINNET_NETWORK } from 'nestjs-ethers';
import { EthersService } from './ethers.service';

@Module({
  imports: [
    ConfigModule,
    EthersModule.forRootAsync({
      inject: [ConfigService],
      token: 'eth',
      useFactory: (config: ConfigService) => {
        return {
          network: MAINNET_NETWORK,
          custom: config.get<string>('ETH_INFURA'),
          useDefaultProvider: false,
        }
      },
    }),
    EthersModule.forRootAsync({
      inject: [ConfigService],
      token: 'poly',
      useFactory: (config: ConfigService) => {
        return {
          network: {
            name: 'Polygon Mainnet',
            chainId: 137,
          },
          custom: config.get<string>('POLY_INFURA'),
          useDefaultProvider: false,
        }
      },
    }),
    EthersModule.forRootAsync({
      inject: [ConfigService],
      token: 'arb',
      useFactory: (config: ConfigService) => {
        return {
          network: {
            name: 'Arbitrum One',
            chainId: 42161,
          },
          custom: config.get<string>('ARB_INFURA'),
          useDefaultProvider: false,
        }
      },
    }),
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  providers: [EthersService],
  exports: [EthersService]
})
export class EthersConnectModule { }
