import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Mensaje')
export class Message {
    @PrimaryColumn({type: 'varchar', length: 36})
    id: string;

    @Column({type:'text'})
    contenido: string;

    @Column({type: 'timestamp'})
    fecha_envio: Date;

    @Column({type: 'tinyint', width: 1, default: 0})
    leido: boolean;

    @Column({type:'varchar', length:36})
    conversacion_id:string;

    @Column({type:'varchar', length:36})
    emisor_id:string;
    
}