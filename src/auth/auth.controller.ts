import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-crendentials.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) userRegisterDto: UserRegisterDto,
  ): Promise<void> {
    return this.authService.signUp(userRegisterDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/recover-password')
  recoverPassword(
    @Body(ValidationPipe) recoverPasswordDto: RecoverPasswordDto,
  ): Promise<any> {
    return this.authService.recoverPassword(recoverPasswordDto);
  }

  @Post('/reset-password')
  resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    return this.authService.resetPassword(resetPasswordDto);
  }


}
