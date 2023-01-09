import { ValidatorBase } from './../base/base.validator';
import { Injectable } from '@nestjs/common';
import { Demo } from './entities/demo.entity';

@Injectable()
export class DemoValidator extends ValidatorBase<Demo> {
  constructor() {
    super();
    this.ruleFor('name').notEmpty().maxLength(100);
  }
}
