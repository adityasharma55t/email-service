import { Injectable, OnModuleInit } from '@nestjs/common';
import { Counter, Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  private registry = new Registry();

  public emailTotal: Counter<string>;
  public emailSuccess: Counter<string>;
  public emailFailure: Counter<string>;
  public emailRetry: Counter<string>;
  public emailFallback: Counter<string>;
  public circuitOpen: Counter<string>;

  public emailProcessingDuration: Histogram<string>;

  onModuleInit() {
    this.emailTotal = new Counter({
      name: 'emails_total',
      help: 'Total number of email send requests received',
      labelNames: ['provider'],
    });

    this.emailSuccess = new Counter({
      name: 'emails_success_total',
      help: 'Total number of successfully delivered emails',
      labelNames: ['provider'],
    });

    this.emailFailure = new Counter({
      name: 'emails_failure_total',
      help: 'Total number of failed email delivery attempts',
      labelNames: ['provider'],
    });

    this.emailRetry = new Counter({
      name: 'emails_retried_total',
      help: 'Number of retries triggered due to failures',
      labelNames: ['provider'],
    });

    this.emailFallback = new Counter({
      name: 'emails_fallback_total',
      help: 'Number of times fallback provider was used',
      labelNames: ['provider'],
    });

    this.circuitOpen = new Counter({
      name: 'emails_circuit_open_total',
      help: 'Times circuit breaker opened for a provider',
      labelNames: ['provider'],
    });

    this.emailProcessingDuration = new Histogram({
      name: 'email_processing_duration',
      help: 'Histogram for email processing time in ms',
      labelNames: ['provider', 'status'],
      buckets: [50, 100, 300, 500, 1000, 3000],
    });

    // Register all metrics
    this.registry.registerMetric(this.emailTotal);
    this.registry.registerMetric(this.emailSuccess);
    this.registry.registerMetric(this.emailFailure);
    this.registry.registerMetric(this.emailRetry);
    this.registry.registerMetric(this.emailFallback);
    this.registry.registerMetric(this.circuitOpen);
    this.registry.registerMetric(this.emailProcessingDuration);
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
