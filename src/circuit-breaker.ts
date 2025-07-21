export class CircuitBreaker {
  private failureCount = 0;
  private successThreshold = 1;
  private failureThreshold = 3;
  private cooldownPeriod = 10000;
  private state: 'CLOSED' | 'OPEN' | 'HALF' = 'CLOSED';
  private nextAttempt = Date.now();

  async execute(action: () => Promise<any>) {
    if (this.state === 'OPEN') {
      if (Date.now() > this.nextAttempt) {
        this.state = 'HALF';
      } else {
        throw new Error('Circuit is open');
      }
    }

    try {
      const result = await action();

      this.failureCount = 0;
      this.state = 'CLOSED';
      return result;
    } catch (err) {
      this.failureCount++;

      if (this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
        this.nextAttempt = Date.now() + this.cooldownPeriod;
      }

      throw err;
    }
  }
}
