import { Injectable } from '@nestjs/common';
import { mockSMTP } from './smtp.mock';
import { CircuitBreaker } from './circuit-breaker';
import { MetricsService } from './metrics/metrics.service';

@Injectable()
export class EmailService {
  constructor(private readonly metricsService: MetricsService) {}

  private primaryCB = new CircuitBreaker();
  private secondaryCB = new CircuitBreaker();

  async sendEmail(payload: { to: string; subject: string; body: string }) {
    const provider = 'sendgrid';
    const fallbackProvider = 'mailgun';

    this.metricsService.emailTotal.labels(provider).inc();
    const end = this.metricsService.emailProcessingDuration
      .labels(provider)
      .startTimer();

    try {
      return await this.primaryCB.execute(() => mockSMTP(provider));
    } catch {
      this.metricsService.emailTotal.labels(fallbackProvider).inc();
      const endFallback = this.metricsService.emailProcessingDuration
        .labels(fallbackProvider)
        .startTimer();
      const result = await this.secondaryCB.execute(() =>
        mockSMTP(fallbackProvider),
      );
      endFallback();
      return result;
    } finally {
      end(); // end even in failure
    }
  }
}
