import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  @IsString({ message: 'El campo debe de ser un string' })
  @Length(3, 100, {
    message: 'El campo nombre debe de ser mayor a 3 y menor a 100 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'El campo especialidad es requerido' })
  @IsString({ message: 'El campo especialidad debe de ser string' })
  @Length(3, 100, {
    message: 'El campo debe de ser mayor a 3 y menor a 100 caracteres',
  })
  especiality: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
