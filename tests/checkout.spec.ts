import { test, expect } from '../fixtures/pages'
import { checkoutInfo } from '../fixtures/test-data'

test.describe('Checkout', () => {
  test('completes a full purchase end to end', async ({ loggedInPage, cartPage, checkoutPage, page }) => {
    await loggedInPage.addItemToCart('Sauce Labs Backpack')
    await loggedInPage.addItemToCart('Sauce Labs Fleece Jacket')
    await loggedInPage.goToCart()

    await cartPage.checkout()
    await expect(page).toHaveURL(/checkout-step-one\.html/)

    await checkoutPage.fillInfo(checkoutInfo)
    await expect(page).toHaveURL(/checkout-step-two\.html/)

    await checkoutPage.finish()
    await expect(page).toHaveURL(/checkout-complete\.html/)
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!')
  })

  test('order total equals subtotal plus tax', async ({ loggedInPage, cartPage, checkoutPage, page }) => {
    await loggedInPage.addItemToCart('Sauce Labs Backpack')
    await loggedInPage.goToCart()
    await cartPage.checkout()
    await checkoutPage.fillInfo(checkoutInfo)

    const subtotalText = await checkoutPage.summarySubtotal.textContent()
    const taxText = await checkoutPage.summaryTax.textContent()
    const totalText = await checkoutPage.summaryTotal.textContent()

    const subtotal = Number.parseFloat(subtotalText!.replace('Item total: $', ''))
    const tax = Number.parseFloat(taxText!.replace('Tax: $', ''))
    const total = Number.parseFloat(totalText!.replace('Total: $', ''))

    expect(total).toBeCloseTo(subtotal + tax, 2)
  })

  test('checkout requires all customer info fields', async ({ loggedInPage, cartPage, checkoutPage }) => {
    await loggedInPage.addItemToCart('Sauce Labs Backpack')
    await loggedInPage.goToCart()
    await cartPage.checkout()

    await checkoutPage.continueButton.click()

    await expect(checkoutPage.errorMessage).toContainText('First Name is required')
  })
})
