import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; body: string }) {
    return this.emailService.sendEmail(body);
  }
}
