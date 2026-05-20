import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "../../users/entities/user.entity";

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

    @ManyToOne( () => Conversation, { eager: true })
    @JoinColumn({ name: 'conversation_id'})
    conversation: Conversation

    @ManyToOne( () => User, { eager: true })
    @JoinColumn({ name: 'sender_id' })
    sender: User
}
