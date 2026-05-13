import { Column, CreateDateColumn, Entity, 
    PrimaryGeneratedColumn } from "typeorm";


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

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

}