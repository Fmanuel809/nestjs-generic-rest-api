import { AutoMap } from '@automapper/classes';
import { Base } from './../../base/entities/base.entity';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Base {
  @Prop()
  @AutoMap()
  firstname: string;

  @Prop()
  @AutoMap()
  lastname: string;

  @Prop({
    unique: true,
  })
  @AutoMap()
  username: string;

  @Prop({
    unique: true,
  })
  @AutoMap()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @AutoMap()
  resetPassword: boolean;

  @Prop()
  @AutoMap()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
