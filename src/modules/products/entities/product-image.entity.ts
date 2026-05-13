import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  product_id: number;

  @Column({ type: 'varchar', length: 500 })
  image_url: string;

  @Column({ type: 'boolean', default: false })
  is_main: boolean;
}