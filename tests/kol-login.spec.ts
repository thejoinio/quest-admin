import { test, expect } from '@playwright/test';
import { testUsers } from './test-users';

const kolUser = testUsers.find(user => user.role === 'kol');

test('successful KOL user login', async ({ page }) => {
  if (!kolUser) {
    throw new Error('KOL user not found in test data');
  }

  await page.goto(kolUser.loginUrl);

  await page.fill('input[name="email"]', kolUser.email);
  await page.fill('input[name="password"]', kolUser.password);

  await page.click('[data-testid="login-button"]');

  await page.waitForURL(kolUser.dashboardUrl);
  await expect(page).toHaveURL(kolUser.dashboardUrl);
});