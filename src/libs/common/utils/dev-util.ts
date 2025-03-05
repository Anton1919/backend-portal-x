import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config'
import * as process from 'node:process'

dotenv.config()

export const isDev = (configService: ConfigService) => {
  return configService.getOrThrow<string>('NODE_ENV') === 'development'
}

// нужна для appModule так как туда не получится прокидывать ConfigService
export const IS_DEV_ENV = process.env.NODE_ENV === 'development'
