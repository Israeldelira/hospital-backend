import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/common/services/jwt.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuario o contraseña incorrecto');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrecto');
    }
    const payload = {
      user,
    };
    const accessToken = this.jwtService.generateToken(payload);

    return { accessToken };
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; data: User }> {
    const { email, password, nombre } = registerDto;

    const existUser = await this.userService.findOneByEmail(email);
    if (existUser) {
      throw new ConflictException('El correo ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.registerUser({
      email,
      password: hashedPassword,
      nombre,
    });

    return { message: 'Registro exitoso', data: user };
  }
}
