import { test, expect } from '../fixtures/pages'

test.describe('Product sorting', () => {
  test('sorts prices low to high', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi')

    const prices = await loggedInPage.itemPrices()
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  test('sorts prices high to low', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('hilo')

    const prices = await loggedInPage.itemPrices()
    const sorted = [...prices].sort((a, b) => b - a)
    expect(prices).toEqual(sorted)
  })

  test('sorts names A to Z', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('az')

    const names = await loggedInPage.itemNames()
    const sorted = [...names].sort((a, b) => a.localeCompare(b))
    expect(names).toEqual(sorted)
  })

  test('sorts names Z to A', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('za')

    const names = await loggedInPage.itemNames()
    const sorted = [...names].sort((a, b) => b.localeCompare(a))
    expect(names).toEqual(sorted)
  })
})
