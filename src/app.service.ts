import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  serverOk(): string {
    return 'API - OK'
  }
}
