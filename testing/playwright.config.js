module.exports = {
  testDir: './',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
        // Add extra time for slower operations
        navigationTimeout: 30000,
        actionTimeout: 10000,
      },
    },
  ],
  webServer: [
    {
      command: 'cd ../backend && source env/bin/activate && python manage.py runserver',
      url: 'http://127.0.0.1:8000/api/ping_cav_server',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd ../frontend && export NODE_OPTIONS="--openssl-legacy-provider" && npm run serve',
      url: 'http://127.0.0.1:8080',
      reuseExistingServer: !process.env.CI,
    }
  ],
};