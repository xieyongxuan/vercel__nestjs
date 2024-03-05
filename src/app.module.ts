import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
/** 导入业务模块 */
import { CatsModule } from './cats/cats.module';

import { getEnvFiles } from './utils';

@Module({
  imports: [
    /** 根据环境变量进行配置, 全局配置, .env.local 优先级最高, 其次是 .env.development, .env.production */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFiles(),
    }),
    /** MongoDB 数据库 */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    /** 业务模块 */
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
