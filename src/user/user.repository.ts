import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { DB_CONNECTION_KEY } from 'src/database/consts';
import { RequestUserCreateDTO } from './dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name, DB_CONNECTION_KEY)
    private readonly userModel: Model<UserDocument>
  ) {}

  async findOne(filter?: FilterQuery<UserDocument>, select?: string): Promise<User> {
    const query = this.userModel.findOne(filter);
    if (select) {
      return query.select(select).exec();
    }
    return query.exec();
  }

  async findAll(filter?: FilterQuery<UserDocument>, select?: string): Promise<User[]> {
    const query = this.userModel.find(filter);
    if (select) {
      return query.select(select).exec();
    }
    return query.exec();
  }

  async updateOne(filter: FilterQuery<UserDocument>, data: UpdateQuery<UserDocument>) {
    return this.userModel.updateOne(filter, data).exec();
  }

  async updateMany(filter: FilterQuery<UserDocument>, data: UpdateQuery<UserDocument>) {
    return this.userModel.updateMany(filter, data).exec();
  }

  async deleteOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.deleteOne(filter).exec();
  }

  async deleteMany(filter: FilterQuery<UserDocument>) {
    return this.userModel.deleteMany(filter).exec();
  }

  async exists(filter: FilterQuery<UserDocument>): Promise<boolean> {
    const exists = await this.userModel.exists(filter).exec();
    if (exists) {
      return true;
    }

    return false;
  }

  async insert(dto: RequestUserCreateDTO): Promise<{ id: string; email: string }> {
    const newUser = await this.userModel.create(dto);
    return { id: newUser._id.toString(), email: newUser.email };
  }
}
