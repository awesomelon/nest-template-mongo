import { Injectable } from '@nestjs/common';
import { UserDocument } from './schema';
import { FilterQuery, Types } from 'mongoose';

import { RequestUpdateUserDTO, RequestUserCreateDTO } from './dto';
import { errorException } from 'src/utils';

import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(filter?: FilterQuery<UserDocument>) {
    return this.userRepository.findOne(filter);
  }

  async updateOne(id: string, data: RequestUpdateUserDTO) {
    const _id = new Types.ObjectId(id);
    return this.userRepository.updateOne({ _id }, { $set: data });
  }

  async insert(user: RequestUserCreateDTO): Promise<{ id: string; email: string }> {
    const { email } = user;
    const isExists = await this.exists({ email });

    if (isExists) {
      return errorException(401, `이미 등록된 사용자입니다.`);
    }

    return this.userRepository.insert(user);
  }

  async getProfile(req) {
    const email = req.user.email;
    return this.userRepository.findOne({ email });
  }

  async validateUser(email: string) {
    return this.userRepository.findOne({ email }, '+password');
  }

  async exists(filter: FilterQuery<UserDocument>) {
    return this.userRepository.exists(filter);
  }

  async changePassword(email: string, password: string) {
    if (!password) {
      return errorException(400, '비밀번호를 정확하게 입력해주세요.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return this.userRepository.updateOne({ email }, { $set: { password: hashPassword } });
  }
}
