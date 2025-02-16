import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Get()
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
}
