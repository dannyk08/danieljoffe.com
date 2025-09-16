import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('has correct title and meta tags', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Full-Stack Engineer/);

    // Check meta description - wait for it to be present
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toBeAttached();
    await expect(metaDescription).toHaveAttribute(
      'content',
      /full-stack engineer/
    );

    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('has proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check for main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Daniel Joffe/);

    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    // Check that there is at least one heading present
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThanOrEqual(1);
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');

    // Check if navigation is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Test navigation links
    const aboutLink = page.locator('a[href*="/about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*about/);
    }
  });

  test('contact form functionality', async ({ page }) => {
    await page.goto('/about');

    // Check if contact form is present
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Test form validation
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Check for validation messages
    const errorMessages = page.locator('[role="alert"]');
    const errorMessageCount = await errorMessages.count();
    expect(errorMessageCount).toBeGreaterThanOrEqual(1);
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if mobile navigation button is visible and accessible
    const mobileNavButton = page.locator('[aria-label="Open menu"]');
    await expect(mobileNavButton).toBeVisible();

    // Click the mobile navigation button
    await mobileNavButton.click();

    // Check that the button's aria-label changes to "Close menu" (indicating modal is open)
    const closeButton = page.locator('[aria-label="Close menu"]');
    await expect(closeButton).toBeVisible();

    // Close the modal by pressing Escape key
    await page.keyboard.press('Escape');

    // Verify the button's aria-label changes back to "Open menu" (indicating modal is closed)
    const openButton = page.locator('[aria-label="Open menu"]');
    await expect(openButton).toBeVisible();
  });

  test('accessibility compliance', async ({ page }) => {
    await page.goto('/');

    // Check for proper ARIA labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasText = await button.textContent();

      // Button should have either aria-label or text content
      expect(hasAriaLabel || hasText?.trim()).toBeTruthy();
    }

    // Check for proper link accessibility
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const hasAriaLabel = await link.getAttribute('aria-label');
      const hasText = await link.textContent();
      const hasHref = link;

      // Link should have href and either aria-label or text content
      await expect(hasHref).toHaveAttribute('href');
      expect(hasAriaLabel || hasText?.trim()).toBeTruthy();
    }
  });

  test('performance metrics', async ({ page }) => {
    await page.goto('/');

    // Check for performance issues
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        firstPaint:
          performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint:
          performance.getEntriesByName('first-contentful-paint')[0]
            ?.startTime || 0,
      };
    });

    // Basic performance assertions
    expect(performanceMetrics.loadTime).toBeLessThan(3000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
  });

  test('SEO elements are present', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Daniel Joffe/);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /.+/);

    // Check for Twitter Card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');

    // Check for canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://danieljoffe.com');

    // Check for robots meta tag
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', 'index, follow');
  });

  test('error handling', async ({ page }) => {
    // Test 404 page
    await page.goto('/non-existent-page');

    // Should redirect to 404 or show error message
    const is404 = await page.locator('h1:has-text("404")').isVisible();
    const isNotFound = await page.locator('text=Page Not Found').isVisible();
    const isError = await page.locator('text=error').isVisible();

    expect(is404 || isNotFound || isError).toBeTruthy();
  });
});
