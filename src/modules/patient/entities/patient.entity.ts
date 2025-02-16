import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ type: 'varchar', length: 255 })
  diagnostico: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.patients)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Column({ type: 'int' })
  doctorId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 1 })
  is_active: boolean;
}
