import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { GenerateTicketDto } from './dto/generate-ticket.dto';
import { User } from 'src/auth/user.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
@UseGuards(AuthGuard())
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post('/generate')
  @UsePipes(ValidationPipe)
  generate(
    @Body() generateTicketDto: GenerateTicketDto,
    @GetUser() user: User,
  ) {
    return this.ticketsService.generateTicket(generateTicketDto, user);
  }
}
