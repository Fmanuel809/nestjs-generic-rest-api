import { AutoMap } from '@automapper/classes';
import { Prop, Schema, raw } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type Auditable = {
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
};

@Schema()
export class Base {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  @AutoMap()
  _id?: string;

  @Prop()
  @AutoMap()
  active: boolean;

  @Prop(
    raw({
      createdBy: { type: String },
      createdDate: { type: Date },
      isDeleted: { type: Boolean },
      modifiedBy: { type: String },
      modifiedDate: { type: Date },
    }),
  )
  audit: Auditable;
}
