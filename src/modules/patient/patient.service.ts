import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(patient);
  }

  async findAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findOnePatient(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    if (!patient) {
      throw new NotFoundException(`El paciente no fue encontrado.`);
    }
    return patient;
  }

  async updatePatient(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const existPatient = await this.patientRepository.findOne({
      where: { id },
    });
    if (!existPatient) {
      throw new NotFoundException(`El paciente no fue encontrado.`);
    }
    this.patientRepository.merge(existPatient, updatePatientDto);
    return await this.patientRepository.save(existPatient);
  }

  async removePatient(id: number): Promise<Patient> {
    const existPatient = await this.patientRepository.findOne({
      where: { id },
    });
    if (!existPatient) {
      throw new NotFoundException(`El paciente no fue encontrado.`);
    }
    existPatient.is_active = false; // Puede marcarse como inactivo en lugar de eliminarlo
    return await this.patientRepository.save(existPatient);
  }
}
