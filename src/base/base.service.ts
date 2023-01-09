import { Base } from './entities/base.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<TEntity extends Base> {
  create(entity: TEntity) {
    console.log(entity);
    return 'This action adds a new base';
  }

  async findAll(): Promise<TEntity[]> {
    return [];
  }

  async findOne(id: number): Promise<TEntity> {
    return null;
  }

  update(id: number, entity: TEntity) {
    console.log(entity);
    return `This action updates a #${id} base`;
  }

  remove(id: number) {
    return `This action removes a #${id} base`;
  }
}
