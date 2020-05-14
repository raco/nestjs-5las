import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topSecret5Las',
            signOptions: {
                expiresIn: 3600 * 24 * 7,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
        SharedModule
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [JwtStrategy, PassportModule],
})
export class AdminModule { }
