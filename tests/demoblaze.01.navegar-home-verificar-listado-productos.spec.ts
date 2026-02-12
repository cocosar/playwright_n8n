import { test, expect } from '@playwright/test';

test.describe('Demoblaze – Navegar a Home y verificar listado productos', () => {
  test('01 - Navegar a Home y verificar listado productos', async ({ page }) => {
    // Paso 1: Acceder a https://demoblaze.com/.
    await page.goto('https://demoblaze.com', { waitUntil: 'domcontentloaded' });

    // Paso 2: Esperar carga completa (carousel y productos visibles).
    await expect(page).toHaveTitle('STORE');

    // Verificar contenedor de productos
    await expect(page.locator('#tbodyid')).toBeVisible();

    // Verificar 9 productos visibles usando selector proporcionado
    const productLinks = page.locator('#tbodyid .card-title a');
    await expect(productLinks).toHaveCount(9);

    // Ejemplo específico de producto visible
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6', exact: true })).toBeVisible();
    await expect(page.getByText('$360')).toBeVisible();

    // Verificar navbar completo
    await expect(page.getByRole('link', { name: 'Home (current)', exact: true })).toBeVisible();
    await expect(page.locator('#cartur')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();

    // Verificar carousel visible
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });
});
