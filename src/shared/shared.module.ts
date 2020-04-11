import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { SharedService } from './shared.service';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    MailgunModule.forRoot({
      DOMAIN: 'mail.renatocenteno.com',
      AKI_KEY: 'key-718fbaa797ec459ad59b1f5541f505be',
    }),
  ],
  providers: [SharedService, MailService],
  exports: [MailService],
})
export class SharedModule {}
