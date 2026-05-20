import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { User } from "../../users/entities/user.entity";

@Entity('Conversations')
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    product_id: number;
    
    @Column({type: 'int'})
    buyer_id: number;

    @Column({type: 'int'})
    seller_id: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne( () => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product

    @ManyToOne( () => User, { eager: true })
    @JoinColumn({ name: 'buyer_id' })
    buyer: User

    @ManyToOne( () => User, { eager: true })
    @JoinColumn({ name: 'seller_id'})
    seller: User
}
