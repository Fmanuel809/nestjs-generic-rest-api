import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/base/repository.interface';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(model: User): Promise<User> {
    const createdUser = new this.userModel(model);
    return createdUser.save();
  }

  async findAll(query: any = {}): Promise<User[]> {
    return this.userModel.find(query).exec();
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOne(query: any): Promise<User> {
    return this.userModel.findOne(query).exec();
  }

  async update(id: string, model: User): Promise<User> {
    const m = await this.userModel.findById(id).exec();
    model.audit.createdBy = m.audit.createdBy;
    model.audit.createdDate = m.audit.createdDate;
    return m.updateOne(model).exec();
  }

  async patch(id: string, set: any): Promise<User> {
    const model = await this.userModel.findById(id).exec();
    model.audit.modifiedBy = id;
    model.audit.modifiedDate = new Date();
    Object.entries(set).forEach((entry) => {
      model[entry[0]] = entry[1];
    });
    return this.update(id, model);
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
