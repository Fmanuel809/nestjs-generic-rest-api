import { AutoMap } from '@automapper/classes';
import { Dto } from './../../base/dto/base.dto';

export class UserDto extends Dto {
  @AutoMap()
  name: string;

  @AutoMap()
  firstname: string;

  @AutoMap()
  lastname: string;

  @AutoMap()
  username: string;

  @AutoMap()
  role: string;

  @AutoMap()
  email: string;

  @AutoMap()
  resetPassword: boolean;
}
