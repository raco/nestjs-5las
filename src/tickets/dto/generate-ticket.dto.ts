import { IsNumber } from 'class-validator';

export class GenerateTicketDto {
  @IsNumber()
  turnId: number;
}
