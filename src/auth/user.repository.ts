import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRegisterDto } from './dto/user-register.dto';
import { AuthCredentialsDto } from './dto/auth-crendentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userRegisterDto: UserRegisterDto): Promise<void> {
    const {
      fullname,
      address,
      dni,
      email,
      password,
      district_id,
    } = userRegisterDto;

    const user = new User();
    user.fullname = fullname;
    user.address = address;
    user.dni = dni;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.district_id = district_id;

    try {
      await user.save();
    } catch (error) {
      throw new ConflictException('Duplication error');
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
