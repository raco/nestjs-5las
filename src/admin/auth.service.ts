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
import { SignInDto } from './dto/signin.dt';
import { JwtPayload } from './jwt-payload.interface';

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

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    const admin = await this.adminRepository.validateAdminPassword(signInDto);
    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload: JwtPayload = {
      dni: admin.dni,
      email: admin.email,
      fullname: admin.fullname,
      phone: admin.phone,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

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
