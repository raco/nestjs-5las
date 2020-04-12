import {
  Repository,
  EntityRepository,
  getManager,
  getConnection,
} from 'typeorm';
import * as QRCode from 'qrcode';
import * as bcrypt from 'bcrypt';
import { Ticket } from './ticket.entity';
import { User } from 'src/auth/user.entity';
import { Turn } from 'src/companies/turn.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Schedule } from 'src/companies/schedule.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async generateTicketAndQRCode(turn: Turn, user: User): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.user = user;
    ticket.startsEnds = turn.startsEnds();
    const connection = getConnection();
    const scheduleRepository = connection.getRepository(Schedule);
    const schedule = await scheduleRepository.findOne({
      where: { id: turn.scheduleId },
      relations: ['branch'],
    });
    ticket.place = schedule.branch.name;
    const distict = await getManager().query(
      `SELECT name FROM ubigeo_peru_districts WHERE id = ${user.district_id}`,
    );
    ticket.district = distict[0].name;
    ticket.turn = turn;
    ticket.salt = await bcrypt.genSalt();
    ticket.createdAt = new Date();
    const qrHash = await bcrypt.hash(`${turn.id}${user.dni}`, ticket.salt);
    ticket.qr = await QRCode.toDataURL(qrHash);

    try {
      await ticket.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return ticket;
  }
}
