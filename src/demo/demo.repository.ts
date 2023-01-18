import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/base/repository.interface';
import { Demo, DemoDocument } from './entities/demo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DemoRepository implements IRepository<Demo> {
  constructor(@InjectModel(Demo.name) private demoModel: Model<DemoDocument>) {}
  async create(model: Demo): Promise<Demo> {
    console.log('demo repository create', model);
    const createdDemo = new this.demoModel(model);
    return createdDemo.save();
  }

  async findAll(query: any = {}): Promise<Demo[]> {
    console.log('demo repository all', query);
    return this.demoModel.find(query).exec();
  }

  async findOne(id: string): Promise<Demo> {
    console.log('demo repository one', id);
    return this.demoModel.findById(id).exec();
  }

  async update(id: string, model: Demo): Promise<Demo> {
    const m = await this.demoModel.findById(id).exec();
    model.audit.createdBy = m.audit.createdBy;
    model.audit.createdDate = m.audit.createdDate;
    return m.updateOne(model).exec();
  }

  async remove(id: string): Promise<any> {
    console.log('demo repository remove', id);
    return this.demoModel.findByIdAndRemove(id).exec();
  }
}
