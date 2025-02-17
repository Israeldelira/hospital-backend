import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get('all')
  findAll() {
    return this.patientService.findAllPatients();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOnePatient(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updatePatient(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.removePatient(+id);
  }
  @Get()
  findAllPatientsByPagination(@Query() paginationDto: PaginationQueryDto) {
    return this.patientService.findAllPatientsByPage(
      paginationDto.limit ?? 10,
      paginationDto.page,
    );
  }
}
