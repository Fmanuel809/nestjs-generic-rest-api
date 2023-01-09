import { AutoMap } from '@automapper/classes';
import { Dto } from './../../base/dto/base.dto';

export class DemoDto extends Dto {
  @AutoMap()
  name: string;
}
