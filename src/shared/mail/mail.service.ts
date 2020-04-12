import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { Mailable } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(private mailgunService: MailgunService) {}

  sendEmail(email: Mailable): Promise<boolean> {
    return this.mailgunService.sendEmail(email);
  }
}
