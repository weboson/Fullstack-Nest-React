import { Transaction } from './entities/transaction.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    // инъекция таблицы (схемы) user 
    @InjectRepository(Transaction)
    // обернули таблицу БД в Repository из typeORM, чтобы получить к таблице контроль и методы для поиска (монипуляций)
    private readonly transactionRepository: Repository<Transaction> // пример дженерика Array<number> = [1,2,3]
  ) {}

  //! Create (@Post) - добавить в таблицу БД новые данные
  async create(createTransactionDto: CreateTransactionDto, id: number) { // не запрещаем делать дубликаты, просто сохраняем вводные данные
    const newTransaction = {
      //! createTransactionDto это объект из @Body полученный в transaction.controller.ts
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category }, 
      user: {id: id}, // id из аргумента (из @Req == JwtAuthGuard)
    }
    if(!newTransaction) throw new BadRequestException('Something went wrong...');

    return await this.transactionRepository.save(newTransaction); //! сохраним данные
    //return `Return ${id}`; // 3
  }

 //! @Get
  async findAll(id: number) { // поиск транзакций будет по id пользователя (user.id)
    const transaction = await this.transactionRepository.find({
      where: { // где текущий user.id === id  
        user: {id: id},
      },
      order: { // сортировать список по дате
        createdAt: 'DESC'
      }
    })

    return transaction;
  }

  //! @Get(:id)
  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id,
      },

      relations: { // связь с user и category 
        user: true,
        category: true,
      }
    })
    if(!transaction) throw new NotFoundException('Transaction not found')
    
    return transaction;
  }


  //! @Patch(id, body)
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id,
      }
    });

    if(!transaction) throw new NotFoundException('Transaction not found')
    return await this.transactionRepository.update(id, updateTransactionDto); // (id, body)
  }

  //! @Delete(:id)
  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id,
      }
    });

    if(!transaction) throw new NotFoundException('Transaction not found')
    return await this.transactionRepository.delete(id); // (id)
  }

  //! логика Pagination
  async findAllWithPagination(id: number, page: number, limit: number) {
    const transaction = await this.transactionRepository.find({ // найти в таблицу Transaction
      where: { // определенного user-a
        user: {id: id}, // где user.id == id из аргументов
      },
      relations: { // связи
        category: true,
        user: true,
      },
      order: { // сортировать
        createdAt: "DESC" // поубыванию алфавита
      },
      take: limit, // взять определенное количество категорий (строк в таблице)
      skip: (page - 1) * limit, // пропустить limit(*2,3,4,5...) количество
    })

    return transaction;
  }
}
