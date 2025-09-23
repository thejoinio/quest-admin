import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_DSN });

class SentryReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      Sentry.captureException(new Error(`Playwright test failed: ${test.title}`), {
        level: 'error',
        tags: {
          file: test.location.file,
          line: test.location.line.toString(),
        },
        extra: {
          stdout: result.stdout,
          stderr: result.stderr,
          duration: result.duration,
        },
      });
    }
  }
}

export default SentryReporter;
