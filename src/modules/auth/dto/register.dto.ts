import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El atributo email es invalido' })
  @IsNotEmpty({ message: 'El atributo email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El atributo nombre es requerido' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El atributo password es requerido' })
  password: string;
}
