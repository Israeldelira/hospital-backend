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
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  diagnostic: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.patientsObject)
  @JoinColumn({ name: 'doctorId' })
  doctorObject: Doctor;

  @Column({ type: 'int' })
  doctorId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 1 })
  is_active: boolean;
}
