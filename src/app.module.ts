import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Carga de la configuración de TypeORM
import { TypeOrmConfigService } from './config/typeorm.config';
import { ModulesModule } from './modules/modules/modules.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role_permissions/role_permissions.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 1. Cargar variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true, // Hace que config sea accesible en to                      da la app
    }),

    // 2. Usar forRootAsync para cargar la configuración mediante la clase
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    ModulesModule,

    UsersModule,

    RolesModule,

    PermissionsModule,

    RolePermissionsModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
