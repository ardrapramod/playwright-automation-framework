import { test } from '@playwright/test';
import { OrangeHrmPageSteps } from '../../page-objects/page-steps/orangehrm-page-steps.js';

test.describe('OrangeHRM login scenarios', () => {
  test('valid login should display dashboard', async ({ page }) => {
    const orangeHrmPage = new OrangeHrmPageSteps(page);

    await orangeHrmPage.openLoginPage();
    await orangeHrmPage.enterCredentials('Admin', 'admin123');
    await orangeHrmPage.clickLogin();
    await orangeHrmPage.verifyDashboardDisplayed();
  });

  test('invalid login should show error message', async ({ page }) => {
    const orangeHrmPage = new OrangeHrmPageSteps(page);

    await orangeHrmPage.openLoginPage();
    await orangeHrmPage.enterCredentials('Admin', 'wrongpassword');
    await orangeHrmPage.clickLogin();
    await orangeHrmPage.verifyErrorMessageDisplayed();
  });
});
