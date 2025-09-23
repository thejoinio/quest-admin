import { test, expect } from '@playwright/test';
import { testUsers } from './test-users';

const adminUser = testUsers.find(user => user.role === 'admin');

test('successful admin user login', async ({ page }) => {
  if (!adminUser) {
    throw new Error('Admin user not found in test data');
  }

  await page.goto(adminUser.loginUrl);

  await page.fill('input[name="email"]', adminUser.email);
  await page.fill('input[name="password"]', adminUser.password);

  await page.click('[data-testid="login-button"]');

  await page.waitForURL(adminUser.dashboardUrl);
  await expect(page).toHaveURL(adminUser.dashboardUrl);
});