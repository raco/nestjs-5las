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
  ): Promise<any> {
    const { turnId } = generateTicketDto;
    const turn = await this.turnRepository.findOne({ where: { id: turnId } });
    if (!turn) {
      throw new NotFoundException();
    }
    const base64QR = await this.ticketRepository.generateTicketAndQRCode(
      turn,
      user,
    );

    const email = await this.mailService.sendEmail();
    if (!email) {
      throw new InternalServerErrorException();
    }

    return {
      qr: base64QR,
    };
  }
}
