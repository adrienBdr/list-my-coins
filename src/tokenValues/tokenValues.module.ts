import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TokenValuesService } from './tokenValues.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [TokenValuesService],
  exports: [TokenValuesService]
})
export class TokenValuesModule { }
