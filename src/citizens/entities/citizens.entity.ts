import { AutoMap } from '@automapper/classes';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CitizenDocument = HydratedDocument<Citizen>;

@Schema()
export class Citizen {
  @Prop({ type: SchemaTypes.ObjectId })
  @AutoMap()
  _id: Types.ObjectId;

  @Prop()
  @AutoMap()
  cedula: string;

  @Prop()
  @AutoMap()
  nombres: string;

  @Prop()
  @AutoMap()
  primer_apellido: string;

  @Prop()
  @AutoMap()
  segundo_apellido: string;

  @Prop()
  @AutoMap()
  fecha_nacimiento: string;

  @Prop()
  @AutoMap()
  nacionalidad: string;

  @Prop()
  @AutoMap()
  sexo: string;

  @Prop()
  @AutoMap()
  estado_civil: string;

  @Prop()
  @AutoMap()
  prm: string;

  @Prop()
  @AutoMap()
  pld: string;

  @Prop()
  @AutoMap()
  prsc: string;

  @Prop()
  @AutoMap()
  prd: string;

  @Prop()
  @AutoMap()
  email: string;

  @Prop()
  @AutoMap()
  celular: string;

  @Prop()
  @AutoMap()
  telefono: string;

  @Prop()
  @AutoMap()
  direccion: string;

  @Prop()
  @AutoMap()
  macro_region: string;

  @Prop()
  @AutoMap()
  region: string;

  @Prop()
  @AutoMap()
  provincia: string;

  @Prop()
  @AutoMap()
  municipio: string;

  @Prop()
  @AutoMap()
  distrito_municipal: string;

  @Prop()
  @AutoMap()
  circunscripcion: string;

  @Prop()
  @AutoMap()
  codigo_recinto: string;

  @Prop()
  @AutoMap()
  recinto: string;

  @Prop()
  @AutoMap()
  direccion_recinto: string;

  @Prop()
  @AutoMap()
  codigo_colegio: string;

  @Prop()
  @AutoMap()
  colegio: string;

  @Prop()
  @AutoMap()
  sector_paraje: string;

  @Prop()
  @AutoMap()
  concurrencia_2004: string;

  @Prop()
  @AutoMap()
  concurrencia_2006: string;

  @Prop()
  @AutoMap()
  concurrencia_2008: string;

  @Prop()
  @AutoMap()
  concurrencia_2010: string;

  @Prop()
  @AutoMap()
  concurrencia_2012: string;

  @Prop()
  @AutoMap()
  concurrencia_2016: string;

  @Prop()
  @AutoMap()
  concurrencia_2020: string;

  @Prop()
  @AutoMap()
  primarias_abiertas: string;

  @Prop()
  @AutoMap()
  primarias_cerradas: string;
}

export const CitizenSchema = SchemaFactory.createForClass(Citizen);
