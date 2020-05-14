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
import { SignInDto } from './dto/signin.dt';
import { Branch } from 'src/companies/branch.entity';

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
            business_name,
            branch_name,
            branch_address,
            branch_lat,
            branch_lng,
            branch_district_id
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
        company.admin = admin;

        const branch = new Branch();
        branch.name = branch_name;
        branch.address = branch_address;
        branch.lat = branch_lat;
        branch.lng = branch_lng;
        branch.company = company;
        branch.district_id = branch_district_id;

        const connection = getConnection();
        const companyRepository = connection.getRepository(Company);
        const branchRepository = connection.getRepository(Branch);

        try {
            await admin.save();
            await companyRepository.save(company);
            await branchRepository.save(branch);
        } catch (error) {
            throw new ConflictException('Datos ingresados son incorrectos.');
        }
    }

    async validateAdminPassword(
        signInDto: SignInDto,
    ): Promise<Admin> {
        const { email, password } = signInDto;
        const admin = await this.findOne({ email });

        if (admin && (await admin.validatePassword(password))) {
            return admin;
        }
        return null;
    }

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
