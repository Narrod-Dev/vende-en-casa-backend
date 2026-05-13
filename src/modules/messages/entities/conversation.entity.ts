import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;
}
