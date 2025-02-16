import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import { Doctor } from './entities/doctor.entity';

export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(doctor);
  }

  async findAllDoctors(): Promise<Doctor[]> {
    return await this.doctorRepository.find({
      relations: ['patients'],
    });
  }

  async findOneDoctor(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`El doctor no encontrado.`);
    }
    return doctor;
  }

  async updateDoctor(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    const existDoctor = await this.doctorRepository.findOne({ where: { id } });
    if (!existDoctor) {
      throw new NotFoundException(`El doctor no encontrado.`);
    }
    this.doctorRepository.merge(existDoctor, updateDoctorDto);
    return await this.doctorRepository.save(existDoctor);
  }

  async removeDoctor(id: number): Promise<Doctor> {
    const existDoctor = await this.doctorRepository.findOne({ where: { id } });
    if (!existDoctor) {
      throw new NotFoundException(`El doctor no encontrado.`);
    }
    existDoctor.is_active = false;
    return await this.doctorRepository.save(existDoctor);
  }
}
