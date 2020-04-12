import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { GenerateTicketDto } from './dto/generate-ticket.dto';
import { User } from 'src/auth/user.entity';
import { TurnRepository } from 'src/companies/turn.repository';
import { MailService } from 'src/shared/mail/mail.service';
import { TicketMail } from 'src/shared/mail/templates/ticket.html';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    private ticketRepository: TicketRepository,
    private turnRepository: TurnRepository,
    private mailService: MailService,
  ) {}

  async generateTicket(
    generateTicketDto: GenerateTicketDto,
    user: User,
  ): Promise<Ticket> {
    const { turnId } = generateTicketDto;
    const turn = await this.turnRepository.findOne({ where: { id: turnId } });
    if (!turn) {
      throw new NotFoundException();
    }

    const ticket = await this.ticketRepository.generateTicketAndQRCode(
      turn,
      user,
    );

    const email = await this.mailService.sendEmail(new TicketMail(ticket));
    if (!email) {
      throw new InternalServerErrorException();
    }

    return ticket;
  }
}
