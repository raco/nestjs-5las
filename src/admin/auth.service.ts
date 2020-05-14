import { Injectable, UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { getManager } from 'typeorm';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RecoverPasswordMail } from 'src/shared/mail/templates/recover-password.html';
import { MailService } from 'src/shared/mail/mail.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
    private mailService: MailService
  ) { }

  signUp(adminRegisterDto: AdminRegisterDto): Promise<void> {
    return this.adminRepository.signUp(adminRegisterDto);
  }

  // async signIn(
  //   authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const user = await this.userRepository.validateUserPassword(authCredentialsDto);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const entityManager = getManager();
  //   const rawData = await entityManager.query(
  //     `SELECT id, name FROM ubigeo_peru_districts WHERE id = ${user.district_id}`
  //   );

  //   const payload: JwtPayload = {
  //     dni: user.dni,
  //     email: user.email,
  //     fullname: user.fullname,
  //     district: rawData[0],
  //   };
  //   const accessToken = await this.jwtService.sign(payload);

  //   return { accessToken };
  // }

  // async recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<void> {
  //   const user = await this.userRepository.findOne({ email: recoverPasswordDto.email });

  //   if (!user) {
  //     throw new NotFoundException('El correo ingresado no existe.');
  //   }

  //   try {
  //     await this.mailService.sendEmail(new RecoverPasswordMail(user));
  //   } catch (error) {
  //     throw new InternalServerErrorException('Ocurrió un error al enviar el correo.');
  //   }
  // }

  // resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
  //   return this.userRepository.resetPassword(resetPasswordDto);
  // }
}
