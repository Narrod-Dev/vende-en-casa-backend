import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn('increment', { type: 'int4' })
    id!: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name!: string;

    @Column({ type: 'text' })
    description!: string;
}
