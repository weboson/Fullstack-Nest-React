import { 
  Controller, 
  Post, 
  Request,
  UseGuards } from '@nestjs/common'; // useGuards - декоратор: использовать Guard из passport
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

// http://localhost:3000/api/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// маршрут, который будет обрабатывать POST-запросы при аутентификации: password и email
// http://localhost:3000/api/auth/login
  @Post('login')
  // Этот Guard вызывает из стратегии - validate() из "local.strategy.ts"
  @UseGuards(LocalAuthGuard) // 'local' - Наша локальная стратегия (local.strategy.ts) Passport имеет имя по умолчанию 'local'.  
// и если @UseGuards пропускает, делается запрос (Request)
  
  async login(@Request() req) {
    //return req.user;
    return this.authService.login(req.user);
  }
}
