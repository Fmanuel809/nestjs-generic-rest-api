import { AutoMap } from '@automapper/classes';

export class Base {
  @AutoMap()
  _id?: string;
  @AutoMap()
  active: boolean;
  createdBy?: number;
  createdDate?: Date;
  isDeleted: boolean;
  deletedBy?: number;
  deletedDate?: Date;
}
