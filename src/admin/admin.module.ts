import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { AdminRepository } from './admin.repository';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topSecret5Las',
            signOptions: {
                expiresIn: 3600 * 24 * 7,
            },
        }),
        TypeOrmModule.forFeature([AdminRepository]),
        SharedModule
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [JwtStrategy, PassportModule],
})
export class AdminModule { }
