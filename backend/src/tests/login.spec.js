// tests/login.spec.js

const { test, expect } = require('@playwright/test');

test('Login paciente', async ({ page }) => {

  await page.goto(
    'http://localhost:5173'
  );

  await page.fill(
    '#documento',
    '123456789'
  );

  await page.fill(
    '#password',
    '123456'
  );

  await page.click(
    'button[type="submit"]'
  );

  await expect(page)
    .toHaveURL(/paciente/);

});