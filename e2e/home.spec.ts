import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /POTRZEBNY\.AI/i })).toBeVisible()
    await expect(page.getByText(/Kompleksowa platforma AI/i)).toBeVisible()
  })

  test('should have login and register buttons', async ({ page }) => {
    await page.goto('/')

    const loginButton = page.getByRole('link', { name: /Zaloguj się/i })
    const registerButton = page.getByRole('link', { name: /Zarejestruj się/i })

    await expect(loginButton).toBeVisible()
    await expect(registerButton).toBeVisible()
  })

  test('should display all panels', async ({ page }) => {
    await page.goto('/')

    const panels = [
      'Panel Ucznia',
      'Panel Nauczyciela',
      'Panel Rodzica',
      'Panel Terapeuty',
      'Panel Badawczy',
      'Panel Administracyjny',
    ]

    for (const panel of panels) {
      await expect(page.getByText(panel)).toBeVisible()
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /POTRZEBNY\.AI/i })).toBeVisible()
  })

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/')

    const title = await page.title()
    expect(title).toContain('POTRZEBNY.AI')

    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /AI/)
  })
})
