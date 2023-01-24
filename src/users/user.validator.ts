import { ValidatorBase } from './../base/base.validator';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserValidator extends ValidatorBase<User> {
  constructor() {
    super();
    this.ruleFor('firstname').notNull().notEmpty().maxLength(100);
    this.ruleFor('lastname').notNull().notEmpty().maxLength(100);
    this.ruleFor('username').notNull().notEmpty().maxLength(50);
    this.ruleFor('email').notNull().notEmpty().maxLength(250).emailAddress();
  }
}
