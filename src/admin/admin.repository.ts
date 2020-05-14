import { Repository, EntityRepository, getConnection } from 'typeorm';
import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AdminRegisterDto } from './dto/admin-register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Admin } from './admin.entity';
import { Company } from 'src/companies/company.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    async signUp(adminRegisterDto: AdminRegisterDto): Promise<void> {
        const {
            fullname,
            dni,
            phone,
            email,
            password,
            ruc,
            business_name
        } = adminRegisterDto;

        const admin = new Admin();
        admin.fullname = fullname;
        admin.dni = dni;
        admin.phone = phone;
        admin.email = email;
        admin.salt = await bcrypt.genSalt();
        admin.password = await this.hashPassword(password, admin.salt);

        const company = new Company();
        company.name = business_name;
        company.ruc = ruc;

        admin.companies = [company];

        try {
            await admin.save();
        } catch (error) {
            throw new ConflictException('Datos ingresados son incorrectos.');
        }
    }

    // async validateUserPassword(
    //     authCredentialsDto: AuthCredentialsDto,
    // ): Promise<User> {
    //     const { email, password } = authCredentialsDto;
    //     const user = await this.findOne({ email });

    //     if (user && (await user.validatePassword(password))) {
    //         return user;
    //     }
    //     return null;
    // }

    // async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    //     const { password, token } = resetPasswordDto;
    //     const user = await this.findOne({ salt: token });

    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }

    //     try {
    //         user.password = await this.hashPassword(password, user.salt);
    //         this.save(user);
    //     } catch (error) {
    //         throw new InternalServerErrorException('Ocurrió un error al actualizar los datos.');
    //     }
    // }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }

}
