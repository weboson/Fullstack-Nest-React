import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from "argon2"; // хеширование (скрытие данных, пример mt5)

@Injectable()
export class UserService {
// иньекция таблицы (схемы) user 
constructor(
  @InjectRepository(User) private readonly userRepository: Repository<User> // пример дженерика Array<number> = [1,2,3]
) {}

// создать нового пользователя (user)
  async create(createUserDto: CreateUserDto) { // логика с данными БД
    
    // получим данные 
    // проверим существует ли уже user с таким email
    const existUser = await this.userRepository.findOne({ // поиск поля email идентичного == с аргментом createUserDto и его полем.email
      where: {
        email: createUserDto.email,
      }
    })
    
    // если true (уже существует), то выбрасываем ошибку с сообщением: этот email уже существует
    if(existUser) throw new BadRequestException('This email already exist')
    
    // если нет такого email в Бд, то сохрани в БД - результат в user:
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password), //! без хеширования (скрытности)
    })
    return {user}; // посмотрим, что сохранилось
  }

// получить данные user по id 
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
