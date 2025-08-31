import { test, expect } from '@playwright/test';
test('has Valid Credentials', async ({ page }) => {
    await page.goto('https://www.facebook.com/');
    await page.getByPlaceholder('Email or phone number').fill('Bipasha');
    await page.getByPlaceholder('Password').fill('******');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.locator ('//input[@name="email"]');
    await page.waitForTimeout(5000);

});



test('Login Using Invalid Credentials', async ({ page }) => {
  await page.goto('https://www.instagram.com/');
  
  await page.waitForSelector('input[name="username"]');

  await page.locator('input[name="username"]').fill('5646464684');
  await page.locator('input[name="password"]').fill('kviadshv');

  await page.waitForTimeout(5000); // Wait to observe the result
});


test('Login Using Empty Credentials', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByPlaceholder('Email or phone number').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/.*facebook.*/); // Should remain on login page
});

test('Login with Valid Username and Empty Password', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByPlaceholder('Email or phone number').fill('Bipasha');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/.*facebook.*/);
});
test('Login with Empty Username and Valid Password', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByPlaceholder('Email or phone number').fill('');
  await page.getByPlaceholder('Password').fill('******');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/.*facebook.*/);
});
test('Login Using Special Characters in Username and Password', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByPlaceholder('Email or phone number').fill('!@#$%^');
  await page.getByPlaceholder('Password').fill('*&^%$#@!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/.*facebook.*/);
});
