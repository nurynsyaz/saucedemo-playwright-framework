import { test, expect } from '../fixtures/pages'
import { users } from '../fixtures/test-data'

test.describe('Login', () => {
  test('standard user logs in successfully', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto()
    await loginPage.login(users.standard.username, users.standard.password)

    await expect(page).toHaveURL(/inventory\.html/)
    await expect(inventoryPage.pageTitle).toHaveText('Products')
  })

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login(users.lockedOut.username, users.lockedOut.password)

    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('locked out')
  })

  test('invalid credentials are rejected', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login('invalid_user', 'wrong_password')

    await expect(loginPage.errorMessage).toContainText('Username and password do not match')
  })

  test('empty credentials are rejected', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login('', '')

    await expect(loginPage.errorMessage).toContainText('Username is required')
  })
})
