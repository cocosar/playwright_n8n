import { test, expect } from '@playwright/test';

test.describe('Demoblaze – Navegar a Home y verificar listado productos', () => {
  test('01 - Navegar a Home y verificar listado productos', async ({ page }) => {
    // Paso 1: Acceder a https://demoblaze.com/.
    await page.goto('https://demoblaze.com', { waitUntil: 'domcontentloaded' });

    // Paso 2: Esperar carga completa (carousel y productos visibles).
    await page.waitForSelector('#tbodyid .card-block');

    // Criterios de aceptación: Título "STORE".
    await expect(page).toHaveTitle('STORE', { exact: true });

    // Criterios de aceptación: 9 productos visibles (ej. "Samsung galaxy s6", "$360").
    const productLinks = page.locator('#tbodyid .card-block a');
    await expect(productLinks).toHaveCount(9);
    await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
    await expect(page.getByText('$360')).toBeVisible();

    // Criterios de aceptación: Navbar completo (Home current, Cart, Log in, Sign up).
    await expect(page.getByRole('link', { name: 'Home (current)', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up', exact: true })).toBeVisible();
  });
});
