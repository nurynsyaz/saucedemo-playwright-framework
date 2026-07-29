import { type Locator, type Page } from '@playwright/test'

export interface CheckoutInfo {
  firstName: string
  lastName: string
  postalCode: string
}

export class CheckoutPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly postalCodeInput: Locator
  readonly continueButton: Locator
  readonly finishButton: Locator
  readonly cancelButton: Locator
  readonly errorMessage: Locator
  readonly completeHeader: Locator
  readonly summarySubtotal: Locator
  readonly summaryTax: Locator
  readonly summaryTotal: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameInput = page.locator('#first-name')
    this.lastNameInput = page.locator('#last-name')
    this.postalCodeInput = page.locator('#postal-code')
    this.continueButton = page.locator('#continue')
    this.finishButton = page.locator('#finish')
    this.cancelButton = page.locator('#cancel')
    this.errorMessage = page.locator('[data-test="error"]')
    this.completeHeader = page.locator('.complete-header')
    this.summarySubtotal = page.locator('.summary_subtotal_label')
    this.summaryTax = page.locator('.summary_tax_label')
    this.summaryTotal = page.locator('.summary_total_label')
  }

  async fillInfo(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName)
    await this.lastNameInput.fill(info.lastName)
    await this.postalCodeInput.fill(info.postalCode)
    await this.continueButton.click()
  }

  async finish() {
    await this.finishButton.click()
  }
}
