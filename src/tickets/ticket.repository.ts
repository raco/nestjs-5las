import { Repository, EntityRepository } from 'typeorm';
import * as QRCode from 'qrcode';
import * as bcrypt from 'bcrypt';
import { Ticket } from './ticket.entity';
import { User } from 'src/auth/user.entity';
import { Turn } from 'src/companies/turn.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async generateTicketAndQRCode(turn: Turn, user: User): Promise<string> {
    const { id } = turn;
    const { dni } = user;
    const ticket = new Ticket();
    ticket.user = user;
    ticket.turn = turn;
    ticket.salt = await bcrypt.genSalt();
    ticket.createdAt = new Date();

    try {
      await ticket.save();
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Duplication error');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return QRCode.toDataURL(bcrypt.hash(id, dni, ticket.salt));
  }
}
