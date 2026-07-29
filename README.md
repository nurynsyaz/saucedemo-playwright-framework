# SauceDemo Playwright Automation Framework

![Playwright Tests](https://github.com/nurynsyaz/saucedemo-playwright-framework/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation framework for [saucedemo.com](https://www.saucedemo.com), built with **Playwright + TypeScript** using the **Page Object Model**. Every push to `main` runs the full suite in CI and publishes the HTML test report to GitHub Pages.

**Live test report:** https://nurynsyaz.github.io/saucedemo-playwright-framework/

## What this covers

| Suite | File | Scenarios |
|---|---|---|
| Login | `tests/login.spec.ts` | Valid login, locked-out user, invalid credentials, empty-field validation |
| Cart | `tests/cart.spec.ts` | Add single/multiple items, remove item, cart state across navigation |
| Checkout | `tests/checkout.spec.ts` | Full purchase flow, subtotal/tax/total math, required-field validation |
| Sorting | `tests/sorting.spec.ts` | Price low-high/high-low, name A-Z/Z-A |

15 tests, all independent and safe to run in parallel.

## Project structure

```
pages/        Page Object Model classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
fixtures/     Custom Playwright fixtures (page-object wiring, test data, pre-authenticated session)
tests/        Test specs, grouped by feature
.github/workflows/  CI pipeline: run tests -> publish HTML report to GitHub Pages
```

Page objects expose locators and actions only — assertions live in the test specs, keeping the pages reusable and the tests readable.

## Running locally

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

Other useful commands:

```bash
npm run test:headed   # watch the browser while tests run
npm run test:ui       # Playwright's interactive UI mode
npm run report        # open the last local HTML report
```

## CI/CD

`.github/workflows/playwright.yml` runs on every push and pull request to `main`:

1. Installs dependencies and the Chromium browser
2. Runs the full suite headlessly
3. Uploads the HTML report as a build artifact
4. On `main`, publishes that report to GitHub Pages

## Why these choices

- **Page Object Model** keeps selectors in one place per page, so a UI change only requires updating one file instead of every test that touches that page.
- **Fixtures** (`fixtures/pages.ts`) inject page objects and a pre-authenticated session directly into tests, removing boilerplate login/setup from every spec.
- **Trace/video/screenshot on failure only** keeps CI artifacts small while still giving full failure diagnostics when something breaks.
