import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { DataSource } from 'typeorm';
import { actionsPermissions } from 'src/shared/enums/actions.enums';
import { Modul } from 'src/modules/modules/entities/module.entity';

@Injectable()
export class PermissionsService {
    constructor(
        private dataSource: DataSource,
    ) { }

    async create(moduleId: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Validar existencia (Por si acaso XD)
            const moduleExists = await queryRunner.manager.findOne(Modul, { where: { moduleId: moduleId } })

            if (!moduleExists) throw new Error('Module not found');

            const actions = Object.values(actionsPermissions);

            const permissionsToCreate = actions.map((action) => {
                return queryRunner.manager.create(Permission, {
                    modul: { moduleId: moduleId }, // Usamos el ID recibido
                    typePermission: action,
                });
            });

            // 3. Guardar todos los permisos de golpe
            const savedPermissions = await queryRunner.manager.save(Permission, permissionsToCreate);

            // 4. Confirmar la transacción
            await queryRunner.commitTransaction();
            return savedPermissions;
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        }
        finally { await queryRunner.release(); }
    }

    async findById(id: number) {
        try {
            return await this.dataSource.getRepository(Permission).findOne({ where: { permissionId: id } });
        } catch (error) { throw error; }
    }
}
