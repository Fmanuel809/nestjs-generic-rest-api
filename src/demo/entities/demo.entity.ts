import { AutoMap } from '@automapper/classes';
import { Base } from './../../base/entities/base.entity';
export class Demo extends Base {
  @AutoMap()
  name: string;
}
