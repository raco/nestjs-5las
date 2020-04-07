import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthCredentialsDto } from './dto/auth-crendentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { getManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(UserRegisterDto: UserRegisterDto): Promise<void> {
    return this.userRepository.signUp(UserRegisterDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const entityManager = getManager();
    const rawData = await entityManager.query(
      `SELECT id, name FROM ubigeo_peru_districts WHERE id = ${user.district_id}`,
    );

    const payload: JwtPayload = {
      email: user.email,
      fullname: user.fullname,
      district: rawData[0],
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
