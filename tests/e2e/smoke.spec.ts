import { expect, test } from '@playwright/test';

test.describe('BIG CRUISE live smoke', () => {
  test('home exposes the core product lanes', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Play' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Merch' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });

  test('games lobby exposes all ten games', async ({ page }) => {
    await page.goto('/play');
    for (const name of [
      'Codenames',
      'Word Guess',
      'Draw It Out',
      'UNO',
      'Ludo',
      'Werewolf',
      'Chess',
      'Karaoke',
      'Truth or Dare',
      'Kahoot',
    ]) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }
  });

  test('merch page loads', async ({ page }) => {
    await page.goto('/merch');
    await expect(page.locator('body')).toContainText(/Dominion State/i);
  });

  test('profile page loads', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('body')).toContainText(/BIG CRUISE ID/i);
  });
});
