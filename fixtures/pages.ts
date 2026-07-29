import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { users } from './test-data'

interface Fixtures {
  loginPage: LoginPage
  inventoryPage: InventoryPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
  loggedInPage: InventoryPage
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  // Pre-authenticated inventory page, for tests that don't care about the login step itself.
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page)
    await login.goto()
    await login.login(users.standard.username, users.standard.password)
    await use(new InventoryPage(page))
  },
})

export { expect } from '@playwright/test'
