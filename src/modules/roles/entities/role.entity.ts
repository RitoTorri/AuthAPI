import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({ unique: true, nullable: false, length: 50 })
    name: string;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: null })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', default: null })
<<<<<<< HEAD
    deletedAt: Date;
=======
    deletedAt: Date | null;
>>>>>>> desarrollo
}