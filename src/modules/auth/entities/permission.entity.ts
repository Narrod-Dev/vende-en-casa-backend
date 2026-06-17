import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar')
  module: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
