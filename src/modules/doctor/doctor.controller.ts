import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('doctor')
@UseGuards(AuthGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Get('all')
  findAllDoctors() {
    return this.doctorService.findAllDoctors();
  }

  @Get(':id')
  findOneDoctor(@Param('id') id: number) {
    return this.doctorService.findOneDoctor(id);
  }

  @Patch(':id')
  updateDoctor(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Delete(':id')
  removeDoctor(@Param('id') id: number) {
    return this.doctorService.removeDoctor(id);
  }

  @Get()
  findAllPatientsByPagination(@Query() paginationDto: PaginationQueryDto) {
    return this.doctorService.findAllDoctorsByPage(
      paginationDto.limit ?? 10,
      paginationDto.page,
    );
  }
}
