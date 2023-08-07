// модуль аутентификации  user-а, то есть проверка на email и password
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
// стратегия валидации
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [ UserModule, PassportModule ], // чтобы могли получать данные user (для валидности, проверки)
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy ],
})
export class AuthModule {}
