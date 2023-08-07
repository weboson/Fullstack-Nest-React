import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from "argon2"; // https://www.npmjs.com/package/argon2 - хэширование password

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //  валидация на совпадения полей
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email); // используем метод findOne из userService, чтобы найти пользователя ПО ТАКОМУ 'email'
    // валидируем password с помощью argon2, который также расшифровывает (хэш) password
    const passwordIsMatch = await argon2.verify(user.password, password); // user-а которого нашли по 'email', мы также проверим схожесть password с тем который вводиться (аргумент)


    if (user && passwordIsMatch) { // если user по 'email' найден и пароли совпадают
      return user
    }
    throw new UnauthorizedException('User or password are incorrect'); // иначе ошибка с сообщением
  }
}
