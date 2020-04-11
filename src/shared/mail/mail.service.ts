import { Injectable } from '@nestjs/common';
import { MailgunService, EmailOptions } from '@nextnm/nestjs-mailgun';
import { html } from './templates/ticket.html';

@Injectable()
export class MailService {
  mailgunOptions: EmailOptions;
  constructor(private mailgunService: MailgunService) {
    this.mailgunOptions = {
      from: 'hello@renatocenteno.com',
      to: 'racodeveloper@gmail.com',
      subject: 'prueba',
      text: 'testo',
      html: html,
    };
  }

  sendEmail(): Promise<boolean> {
    return this.mailgunService.sendEmail(this.mailgunOptions);
  }
}
