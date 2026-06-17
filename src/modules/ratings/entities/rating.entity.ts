import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Product } from "../../products/entities/product.entity";

@Entity ('Ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    reviewer_id: number;

    @Column({type: 'int'})
    reviewee_id: number;

    @Column({type: 'int'})
    product_id: number;

    @Column({type: 'int'})
    score:number;

    @Column({type: 'text', nullable: true})
    comment: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @ManyToOne( () => User, { eager: true })
    @JoinColumn({ name: 'reviewer_id' })
    reviewer: User;

    @ManyToOne( () => User, { eager:true })
    @JoinColumn({ name: 'reviewee_id' })
    reviewee: User;

    @ManyToOne( () => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
