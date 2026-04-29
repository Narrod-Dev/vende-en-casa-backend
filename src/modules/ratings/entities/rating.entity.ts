import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn }
 from 'typeorm';


@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reviewer_id: number;
    
    @Column()
    reviewee_id: number;

    @Column()
    product_id: number;

    @Column()
    score: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn()
    created_at: Date;
}
