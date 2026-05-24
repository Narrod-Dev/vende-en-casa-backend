import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('product-images')
export class ProductImage {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  product_id: number;

  @Column({ type: 'varchar', length: 500 })
  image_url: string;

  @Column({ type: 'boolean', default: false })
  is_main: boolean;

  @ManyToOne( () => Product, { eager: true })
  @JoinColumn({ name: 'product_id'})
  product: Product;
}