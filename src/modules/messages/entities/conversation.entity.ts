import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Conversacion')
export class Conversation {
    @PrimaryColumn({type: 'varchar', length: 36})
    id: string;

    @Column({type:'varchar', length:36})
    comprador_id:string;

    @Column({type:'varchar', length: 36})
    vendedor_id:string;

    @Column({type:'timestamp'})
    fecha_inicio: Date;

    @Column({type:'text', nullable:true})
    ultimo_mensaje:string;
}