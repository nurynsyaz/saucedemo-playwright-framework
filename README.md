# SauceDemo Playwright Automation Framework

![Playwright Tests](https://github.com/nurynsyaz/saucedemo-playwright-framework/actions/workflows/playwright.yml/badge.svg)

Work-in-progress E2E test automation framework for [saucedemo.com](https://www.saucedemo.com), built with **Playwright + TypeScript** using the **Page Object Model**. Being built step by step as a learning project.

## Status

Scaffolding, CI pipeline, and config are in place. Page objects and test specs are being written from scratch, one concept at a time.

## Project structure

```
pages/        Page Object Model classes (in progress)
fixtures/     Custom Playwright fixtures (in progress)
tests/        Test specs, grouped by feature (in progress)
.github/workflows/  CI pipeline: run tests -> publish HTML report to GitHub Pages
```

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
