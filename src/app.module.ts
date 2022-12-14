import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'google.strategy';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
