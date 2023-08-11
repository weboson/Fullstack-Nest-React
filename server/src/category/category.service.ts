import { Category } from 'src/category/entities/category.entity'; // схема (таблица) для БД
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    // инъекция таблицы (схемы) user 
    @InjectRepository(Category)
    private readonly categotyRepository: Repository<Category>, // пример дженерика Array<number> = [1,2,3]
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) { // id для идентификации определенной категории
    // убедится, что нет совпадений входной категории с уже существующей в БД
    // есть ли у этого user-a (id) такая категория?
    const isExist = await this.categotyRepository.findBy({ // найти по полю:
      user: {id: id}, // проверить, есть ли в БД user с таким же id, который мы передаем
      title: createCategoryDto.title // и также есть ли совпадение с полем title входящего и находящего в БД
    })

    // и если isExist (ожидается массив) что-то содержит, то выбросить ошибку с сообщением "Такая катгория уже существует"
    if(isExist.length) throw new BadRequestException('This category already exist!');
    // иначе сохранить в БД входящую категорию
    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id,
      }
    }

    return await this.categotyRepository.save(newCategory); // сохранить объект новой категории
  }




  findAll() {
    return `This action returns all category (проверка category)`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
