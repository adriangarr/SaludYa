// tests/registro.spec.js

const { test, expect } = require('@playwright/test');

test('Registro de paciente', async ({ page }) => {

  await page.goto('http://localhost:5173');

  await page.click('text=Registrarse');

  await page.fill('#nombreCompleto', 'Paciente E2E');

  await page.fill('#documento', Date.now().toString());

  await page.fill(
    '#correo',
    `test${Date.now()}@gmail.com`
  );

  await page.fill(
    '#celular',
    '3001234567'
  );

  await page.fill(
    '#password',
    '123456'
  );

  await page.selectOption(
    '#tipoUsuario',
    'paciente'
  );

  await page.click(
    'button[type="submit"]'
  );

});