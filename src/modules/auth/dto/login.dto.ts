import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El atributo email es invalido' })
  @IsNotEmpty({ message: 'El atributo email es requerido' })
  email: string;

  @IsNotEmpty({ message: 'El atributo password es requerido' })
  password: string;
}
