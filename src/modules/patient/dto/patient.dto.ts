import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  diagnostic: string;

  @IsNotEmpty()
  @IsInt()
  doctorId: number;
}
export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
