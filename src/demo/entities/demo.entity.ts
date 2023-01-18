import { AutoMap } from '@automapper/classes';
import { Base } from './../../base/entities/base.entity';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DemoDocument = HydratedDocument<Demo>;

@Schema()
export class Demo extends Base {
  @Prop()
  @AutoMap()
  name: string;
}

export const DemoSchema = SchemaFactory.createForClass(Demo);
