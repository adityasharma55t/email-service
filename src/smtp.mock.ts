export async function mockSMTP(provider: 'sendgrid' | 'mailgun') {
  const delay = Math.random() * 3000; // up to 3 seconds
  const fail = Math.random() < 0.4; // 40% chance to fail

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error(`${provider} failed`));
      } else {
        resolve(`${provider} success`);
      }
    }, delay);
  });
}
