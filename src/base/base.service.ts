import { IRepository } from './repository.interface';
import { Base } from './entities/base.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<TEntity extends Base> {
  private readonly _repository: IRepository<TEntity>;
  constructor(repository: IRepository<TEntity>) {
    this._repository = repository;
  }

  async create(entity: TEntity) {
    return this._repository.create(entity);
  }

  async findAll(): Promise<TEntity[]> {
    return this._repository.findAll();
  }

  async findById(id: string): Promise<TEntity> {
    return this._repository.findById(id);
  }

  async findOne(query: any): Promise<TEntity> {
    return this._repository.findOne(query);
  }

  async update(id: string, entity: TEntity) {
    return this._repository.update(id, entity);
  }

  async remove(id: string) {
    return this._repository.remove(id);
  }
}
