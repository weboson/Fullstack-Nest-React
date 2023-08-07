import { User } from './entities/user.entity'; // схема таблицы
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM для работы с БД
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    // подключили схему таблицы БД
    TypeOrmModule.forFeature([User]) // аналог forRoot (в главном модуле), но уже в дополнительном модуле
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // мы экспортировали в глобалку, что импортировать в auth.module.ts
})
export class UserModule {}
