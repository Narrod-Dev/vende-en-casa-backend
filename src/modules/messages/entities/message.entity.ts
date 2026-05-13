import { Column, CreateDateColumn, Entity, 
    PrimaryGeneratedColumn } 
    from "typeorm";


@Entity('Messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'int'})
    conversation_id: number;

    @Column({type: 'int'})
    sender_id: number;

    @Column({type: 'text'})
    content: string;

    @CreateDateColumn({type: 'timestamp'})
    sent_at: Date;

    @Column({type: 'boolean', default: false})
    is_read: boolean;
}