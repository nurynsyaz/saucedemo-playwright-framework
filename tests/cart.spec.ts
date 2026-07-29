import { test, expect } from '../fixtures/pages'

test.describe('Cart', () => {
  test('adding an item updates the cart badge', async ({ loggedInPage }) => {
    await loggedInPage.addItemToCart('Sauce Labs Backpack')

    await expect(loggedInPage.cartBadge).toHaveText('1')
  })

  test('adding multiple items accumulates the badge count', async ({ loggedInPage }) => {
    await loggedInPage.addItemToCart('Sauce Labs Backpack')
    await loggedInPage.addItemToCart('Sauce Labs Bike Light')
    await loggedInPage.addItemToCart('Sauce Labs Bolt T-Shirt')

    await expect(loggedInPage.cartBadge).toHaveText('3')
  })

  test('removing an item clears it from the cart', async ({ loggedInPage, page, cartPage }) => {
    await loggedInPage.addItemToCart('Sauce Labs Backpack')
    await loggedInPage.goToCart()

    await expect(cartPage.cartItems).toHaveCount(1)

    await page.locator('.cart_item').getByRole('button', { name: 'Remove' }).click()
    await expect(cartPage.cartItems).toHaveCount(0)
  })

  test('cart persists the correct item across navigation', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addItemToCart('Sauce Labs Bike Light')
    await loggedInPage.goToCart()

    await expect(cartPage.cartItems).toHaveCount(1)
    await expect(cartPage.cartItems).toContainText('Sauce Labs Bike Light')
  })
})
