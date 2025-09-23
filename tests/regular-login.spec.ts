import { test, expect } from '@playwright/test';
import { testUsers } from './test-users';

const regularUser = testUsers.find(user => user.email === 'dev+tunde-balogun@joindaquest.io');

test('successful regular user login', async ({ page }) => {
  if (!regularUser) {
    throw new Error('Regular user not found in test data');
  }

  await page.goto(regularUser.loginUrl);

  await page.fill('input[name="email"]', regularUser.email);
  await page.fill('input[name="password"]', regularUser.password);

  await page.click('[data-testid="login-button"]');

  await page.waitForURL(regularUser.dashboardUrl);
  await expect(page).toHaveURL(regularUser.dashboardUrl);
});