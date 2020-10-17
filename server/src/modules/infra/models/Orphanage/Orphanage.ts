import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import OrphanageImages from './OrphanageImages';

@Entity('db_orphanages')
class Orphanage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('numeric', { precision: 10, scale: 8 })
    latitude: number;

    @Column('numeric', { precision: 10, scale: 8 })
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @Column()
    whatsapp: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrphanageImages, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: OrphanageImages[];
}

export default Orphanage;