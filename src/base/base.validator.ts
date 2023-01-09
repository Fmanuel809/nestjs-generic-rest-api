import { Base } from './entities/base.entity';
import { Validator } from 'fluentvalidation-ts';

export class ValidatorBase<TEntity extends Base> extends Validator<TEntity> {
  constructor() {
    super();
  }
}
