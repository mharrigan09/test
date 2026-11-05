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