import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Clear localStorage so each test starts fresh
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('adds a new todo', async ({ page }) => {
  await page.fill('#todo-input', 'Buy groceries');
  await page.click('button[type="submit"]');
  await expect(page.locator('.todo-text')).toHaveText('Buy groceries');
});

test('marks a todo as complete', async ({ page }) => {
  await page.fill('#todo-input', 'Walk the dog');
  await page.click('button[type="submit"]');
  await page.click('.todo-checkbox');
  await expect(page.locator('.todo-text')).toHaveClass(/done/);
});

test('deletes a todo', async ({ page }) => {
  await page.fill('#todo-input', 'Clean the house');
  await page.click('button[type="submit"]');
  await page.click('.delete-btn');
  await expect(page.locator('.todo-item')).toHaveCount(0);
});

test('filters by active todos', async ({ page }) => {
  await page.fill('#todo-input', 'Todo 1');
  await page.click('button[type="submit"]');
  await page.fill('#todo-input', 'Todo 2');
  await page.click('button[type="submit"]');
  await page.click('.todo-checkbox'); // complete the first one
  await page.click('[data-filter="active"]');
  await expect(page.locator('.todo-item')).toHaveCount(1);
  await expect(page.locator('.todo-text')).toHaveText('Todo 2');
});

test('shows empty state when no todos', async ({ page }) => {
  await expect(page.locator('#empty-state')).toBeVisible();
});


//Input validation — don’t add empty todos:

test('does not add an empty todo', async ({ page }) => {
  await page.click('button[type="submit"]');
  await expect(page.locator('.todo-item')).toHaveCount(0);
});

//Whitespace-only input:

test('does not add a whitespace-only todo', async ({ page }) => {
  await page.fill('#todo-input', '   ');
  await page.click('button[type="submit"]');
  await expect(page.locator('.todo-item')).toHaveCount(0);
});

//Input clears after adding:

test('clears the input after adding a todo', async ({ page }) => {
  await page.fill('#todo-input', 'Buy milk');
  await page.click('button[type="submit"]');
  await expect(page.locator('#todo-input')).toHaveValue('');
});

//Submit with Enter key:

test('adds a todo by pressing Enter', async ({ page }) => {
  await page.fill('#todo-input', 'Press enter todo');
  await page.press('#todo-input', 'Enter');
  await expect(page.locator('.todo-text')).toHaveText('Press enter todo');
});

//Persistence across page reload:

test('persists todos after page reload', async ({ page }) => {
  await page.fill('#todo-input', 'Persistent todo');
  await page.click('button[type="submit"]');
  await page.reload();
  await expect(page.locator('.todo-text')).toHaveText('Persistent todo');
});

//Filter — completed:

test('filters by completed todos', async ({ page }) => {
  await page.fill('#todo-input', 'Done item');
  await page.click('button[type="submit"]');
  await page.fill('#todo-input', 'Active item');
  await page.click('button[type="submit"]');
  await page.locator('.todo-checkbox').first().click();
  await page.click('[data-filter="done"]');
  await expect(page.locator('.todo-item')).toHaveCount(1);
  await expect(page.locator('.todo-text')).toHaveText('Done item');
});

//Multiple todos:

test('can add multiple todos', async ({ page }) => {
  const items = ['First', 'Second', 'Third'];
  for (const item of items) {
    await page.fill('#todo-input', item);
    await page.click('button[type="submit"]');
  }
  await expect(page.locator('.todo-item')).toHaveCount(3);
});