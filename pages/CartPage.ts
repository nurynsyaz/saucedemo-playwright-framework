import { type Locator, type Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartItems: Locator
  readonly checkoutButton: Locator
  readonly continueShoppingButton: Locator

  constructor(page: Page) {
    this.page = page
    this.cartItems = page.locator('.cart_item')
    this.checkoutButton = page.locator('#checkout')
    this.continueShoppingButton = page.locator('#continue-shopping')
  }

  async checkout() {
    await this.checkoutButton.click()
  }
}
