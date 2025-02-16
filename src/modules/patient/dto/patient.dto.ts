import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  edad: number;

  @IsNotEmpty()
  @IsString()
  diagnostico: string;

  @IsNotEmpty()
  @IsInt()
  doctorId: number;
}
export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
