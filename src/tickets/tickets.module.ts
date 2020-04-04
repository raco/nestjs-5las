import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './ticket.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TurnRepository } from 'src/companies/turn.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository, TurnRepository]),
    AuthModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
