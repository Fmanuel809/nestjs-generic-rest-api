import { Injectable } from '@nestjs/common';
import { Citizen, CitizenDocument } from './entities/citizens.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CitizenRepository {
  constructor(
    @InjectModel(Citizen.name) private citizensModel: Model<CitizenDocument>,
  ) {}
  async findAll(query: any = {}): Promise<Citizen[]> {
    return this.citizensModel.find(query).exec();
  }

  findById(id: string): Promise<Citizen> {
    return this.citizensModel.findById(new Types.ObjectId(id)).exec();
  }

  async findOne(query: any): Promise<Citizen> {
    return this.citizensModel.findOne(query).exec();
  }
}
