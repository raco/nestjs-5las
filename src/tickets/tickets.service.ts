import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { GenerateTicketDto } from './dto/generate-ticket.dto';
import { User } from 'src/auth/user.entity';
import { TurnRepository } from 'src/companies/turn.repository';

@Injectable()
export class TicketsService {
  constructor(
    private ticketRepository: TicketRepository,
    private turnRepository: TurnRepository,
  ) {}

  async generateTicket(
    generateTicketDto: GenerateTicketDto,
    user: User,
  ): Promise<string> {
    const { turnId } = generateTicketDto;
    const turn = await this.turnRepository.findOne({ where: { id: turnId } });
    if (!turn) {
      throw new NotFoundException();
    }
    return this.ticketRepository.generateTicketAndQRCode(turn, user);
  }
}
