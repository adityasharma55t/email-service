import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './email.service';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [MetricsModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
