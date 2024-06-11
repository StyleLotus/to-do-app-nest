import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm'

@Module({
  imports: [TaskModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig]
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
