import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION_KEY } from './consts';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: DB_CONNECTION_KEY,
      useFactory: async (config: ConfigService) => {
        const DB_ID = config.get('DB_ID');
        const DB_PWD = config.get('DB_PWD');
        const DB_URL = config.get('DB_URL');
        const DB_NAME = config.get('DB_NAME');

        return {
          uri: `mongodb://${DB_ID}:${DB_PWD}@${DB_URL}/${DB_NAME}`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbConfigModule {}
