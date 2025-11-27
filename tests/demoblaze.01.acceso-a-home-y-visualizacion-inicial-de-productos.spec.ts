import { test, expect } from '@playwright/test';

test.describe('Demoblaze – Acceso a home y visualización inicial de productos', () => {
  test('01 - Acceso a home y visualización inicial de productos', async ({ page }) => {
    // Paso 1: Navegar a https://demoblaze.com/.
    await page.goto('https://demoblaze.com', { waitUntil: 'domcontentloaded' });

    // Paso 2: Esperar carga completa (carousel y productos visibles).
    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL(/https:\/\/demoblaze\.com\/?/);
    await expect(page.getByRole('link', { name: 'Home (current)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Phones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6', level: 4 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sony vaio i5', level: 4 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About Us', level: 4 })).toBeVisible();
    await expect(page.locator('p:has-text("Copyright")')).toBeVisible();
  });
});
