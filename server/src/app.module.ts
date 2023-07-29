import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config'; // для подключения .env (bd_port, bd_password...)

@Module({
  imports: [
    AuthModule, 
    CategoryModule, 
    TransactionModule, 
    UserModule, 
    ConfigModule.forRoot({isGlobal: true}) // подключение .env - forRoot используется для корневого модуля (то есть этого файла)
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
