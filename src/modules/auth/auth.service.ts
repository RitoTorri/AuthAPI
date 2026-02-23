import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login';
import { generateToken } from 'src/shared/utils/tokens.utils';
import { RolePermission } from 'src/modules/role_permissions/entities/role_permission.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
    private readonly usersService: UsersService,
  ) { }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) throw new Error('User not found');
      if (!user.active) throw new Error('User is inactive');

      const passwordIsCorrect = await bcrypt.compare(loginDto.password, user.password);
      if (!passwordIsCorrect) throw new Error('Incorrect password');

      // Obtener permisos
      const permissions = await this.getUserPermissions(user.userId);

      // 4. Crear payloads de tokens
      const tokenAccessPayload = {
        userId: user.userId,
        roleId: user.roleId,
      };
      const tokenRefreshPayload = { userId: user.userId, };

      // Generar tokens
      const tokenAccess = generateToken(tokenAccessPayload, process.env.TOKEN_ACCESS || 'access_secret', '20m');
      const tokenRefresh = generateToken(tokenRefreshPayload, process.env.TOKEN_ACCESS_REFRESH || 'refresh_secret', '7d');

      // Guardar refresh token en BD
      const refreshTokenEntity = this.refreshTokenRepository.create({
        userId: user.userId,
        token: tokenRefresh,
      });
      await this.refreshTokenRepository.save(refreshTokenEntity);

      return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: {
          roleId: user.roleId,
          name: user.role.name,
        },
        permissions: permissions,
        tokens: {
          token_access: tokenAccess,
          token_refresh: tokenRefresh
        }
      };

    } catch (error) { throw error; }
  }

  // La función de permisos dentro del mismo servicio
  private async getUserPermissions(userId: number) {
    const permissions = await this.rolePermissionRepository
      .createQueryBuilder('rp')
      .innerJoin('rp.role', 'role')
      .innerJoin('role.users', 'user')
      .innerJoin('rp.permission', 'permission')
      .innerJoin('permission.modul', 'module')
      .where('user.userId = :userId', { userId })
      .andWhere('rp.active = true')
      .andWhere('permission.active = true')
      .andWhere('module.active = true')
      .select([
        'module.name as name_module',
        'permission.typePermission as permission'
      ])
      .orderBy('module.name', 'ASC')
      .addOrderBy('permission.typePermission', 'ASC')
      .getRawMany();

    // Agrupar por módulo
    const permissionsByModule = {};

    permissions.forEach(p => {
      if (!permissionsByModule[p.name_module]) {
        permissionsByModule[p.name_module] = {
          name_module: p.name_module,
          permissions: []
        };
      }
      permissionsByModule[p.name_module].permissions.push(p.permission);
    });

    return Object.values(permissionsByModule);
  }
}