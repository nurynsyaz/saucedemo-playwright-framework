import { type Locator, type Page } from '@playwright/test'

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo'

export class InventoryPage {
  readonly page: Page
  readonly inventoryList: Locator
  readonly inventoryItems: Locator
  readonly cartBadge: Locator
  readonly cartLink: Locator
  readonly sortDropdown: Locator
  readonly pageTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.inventoryList = page.locator('.inventory_list')
    this.inventoryItems = page.locator('.inventory_item')
    this.cartBadge = page.locator('.shopping_cart_badge')
    this.cartLink = page.locator('.shopping_cart_link')
    this.sortDropdown = page.locator('[data-test="product-sort-container"]')
    this.pageTitle = page.locator('.title')
  }

  itemByName(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name })
  }

  async addItemToCart(name: string) {
    await this.itemByName(name).getByRole('button', { name: 'Add to cart' }).click()
  }

  async removeItemFromCart(name: string) {
    await this.itemByName(name).getByRole('button', { name: 'Remove' }).click()
  }

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option)
  }

  async goToCart() {
    await this.cartLink.click()
  }

  async itemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents()
    return priceTexts.map((t) => Number.parseFloat(t.replace('$', '')))
  }

  async itemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents()
  }
}
