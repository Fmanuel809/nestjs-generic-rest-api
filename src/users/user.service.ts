import { hashPassword } from './../shared/utils';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly repository: UserRepository) {
    super(repository);
  }

  override async create(entity: User) {
    const password = 'Inicio01';
    const hash = await hashPassword(password);

    entity.password = hash;
    entity.resetPassword = true;
    entity.active = true;

    return this.repository.create(entity);
  }

  async getUser(query: any) {
    return this.repository.findOne(query);
  }
}
