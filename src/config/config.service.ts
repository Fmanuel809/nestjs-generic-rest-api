import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public async getMongoConfig() {
    return {
      // eslint-disable-next-line prettier/prettier
      uri: `${this.get('MONGODB_PROTOCOL')}://${encodeURIComponent(this.get('MONGODB_USER'))}:${encodeURIComponent(this.get('MONGODB_PASSWORD'))}@${this.get('MONGODB_SERVER')}:${this.get('MONGODB_PORT')}/${this.get('MONGODB_DBNAME')}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
