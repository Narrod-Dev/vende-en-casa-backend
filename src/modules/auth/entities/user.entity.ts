import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @Column('varchar', { nullable: true })
  full_name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password_hash: string;

  @Column('varchar', { nullable: true })
  location: string;

  @Column('bool', { default: false })
  is_blocked: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}