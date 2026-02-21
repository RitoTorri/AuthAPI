import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  findAll() {
    return `This action returns all modules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
=======
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleDto } from './dto/module.dto';
import { Modul } from './entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modul)
    private readonly moduleRespository: Repository<Modul>,
  ) { }

  async create(createModuleDto: ModuleDto) {
    try {
      const moduleExists = await this.findByName(createModuleDto.name);
      if (moduleExists !== null) throw new Error('Module already exists');

      const newModule = this.moduleRespository.create(createModuleDto);
      return await this.moduleRespository.save(newModule);
    } catch (error) { throw error; }
  }


  async findAll(active: boolean): Promise<Modul[]> {
    try {
      return await this.moduleRespository.find({
        select: ['moduleId', 'name', 'active', 'createdAt'],
        order: { moduleId: 'ASC' },
        where: { active: active },
        withDeleted: true,
      });
    } catch (error) { throw error; }
  }


  async update(id: number, updateModuleDto: ModuleDto) {
    try {
      // Verficar existencia del módulo
      const moduleExists = await this.findById(id);
      if (!moduleExists) throw new Error('Module not found');
      if (!moduleExists.active) throw new Error('Module is inactive');

      // Verficar que el nombre no exista en la DB
      const moduleWithSameName = await this.findByName(updateModuleDto.name);
      if (moduleWithSameName !== null) throw new Error('Module already exists');

      return await this.moduleRespository.update(id, { ...updateModuleDto, updatedAt: new Date() });
    } catch (error) { throw error; }
  }


  async restore(id: number) {
    try {
      const moduleExists = await this.findById(id);
      if (!moduleExists) throw new Error('Module not found');
      if (moduleExists.active) throw new Error('Module is active');

      return await this.moduleRespository.update(id, { active: true, deletedAt: null });
    } catch (error) { throw error; }
  }


  async remove(id: number) {
    try {
      const moduleExists = await this.findById(id);
      if (!moduleExists) throw new Error('Module not found');
      if (!moduleExists.active) throw new Error('Module is inactive');

      moduleExists.active = false;
      moduleExists.deletedAt = new Date();
      return await this.moduleRespository.save(moduleExists);
    } catch (error) { throw error; }
  }


  async findByName(name: string) {
    try {
      return await this.moduleRespository.findOne({
        where: { name },
        select: ['moduleId', 'name', 'active'],
        order: { moduleId: 'ASC' },
        withDeleted: true
      });
    } catch (error) { throw error; }
  }


  async findById(id: number) {
    try {
      return await this.moduleRespository.findOne({
        where: { moduleId: id },
        select: ['moduleId', 'name', 'active'],
        withDeleted: true
      });
    } catch (error) { throw error; }
>>>>>>> desarrollo
  }
}
