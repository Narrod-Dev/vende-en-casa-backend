import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  seller_id: number;

  @Column({ type: 'int4' })
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  condition: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'varchar', length: 50, default: 'Available' })
  status: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updated_at: Date;

  @ManyToOne( () => User, { eager: true })
  @JoinColumn({ name: 'seller_id'})
  user: User;

  @ManyToOne( () => Category, { eager: true})
  @JoinColumn({ name: 'category_id'})
  category: Category;
}