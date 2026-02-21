import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
<<<<<<< HEAD

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
=======
import { Modul } from './entities/module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Modul])],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule { }
>>>>>>> desarrollo
