import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminRegisterDto } from './dto/admin-register.dto';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) adminRegisterDto: AdminRegisterDto,
  ): any {
    return "hola";
    // return this.authService.signUp(adminRegisterDto);
  }

  // @Post('/signin')
  // signIn(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // }

  // @Post('/recover-password')
  // recoverPassword(
  //   @Body(ValidationPipe) recoverPasswordDto: RecoverPasswordDto,
  // ): Promise<any> {
  //   return this.authService.recoverPassword(recoverPasswordDto);
  // }

  // @Post('/reset-password')
  // resetPassword(
  //   @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  // ): Promise<any> {
  //   return this.authService.resetPassword(resetPasswordDto);
  // }


}
