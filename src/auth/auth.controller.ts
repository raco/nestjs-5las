import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-crendentials.dto';
import { getManager } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
