import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { actionsPermissions } from 'src/shared/enums/actions.enums';
import { Modul } from 'src/modules/modules/entities/module.entity';

@Entity("permissions")  
@Unique(['modul', 'typePermission'])
export class Permission {
    @PrimaryGeneratedColumn()
    permissionId: number;

    @ManyToOne(() => Modul, (modul) => modul.permissions, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'moduleId',})
    modul: Modul;
    
    @Column({
      type: 'enum',
      enum: actionsPermissions
    })
    typePermission : actionsPermissions;
    
    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
}