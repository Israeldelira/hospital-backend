import {
  IsOptional,
  IsNumber,
  IsPositive,
  IsArray,
  IsInt,
} from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;
}
export class PaginationResponseDto<T> {
  @IsArray()
  data: T[];

  @IsInt()
  @IsPositive()
  total: number;
}
