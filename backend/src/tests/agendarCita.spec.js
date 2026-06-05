// tests/agendarCita.spec.js

const { test, expect } = require('@playwright/test');

test(
  'Agendar cita médica',
  async ({ page }) => {

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

    await page.click(
      'text=07:00 AM - 08:00 AM'
    );

    await page.click(
      'text=Agendar cita'
    );

  }
);