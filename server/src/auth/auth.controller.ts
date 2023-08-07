import { Controller} from '@nestjs/common';
import { AuthService } from './auth.service';

// http://localhost:3000/api/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

}
