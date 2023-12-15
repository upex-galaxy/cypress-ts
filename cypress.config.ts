import { defineConfig } from 'cypress'; // ES MODULE
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import 'dotenv/config';
import allureWriter from '@shelex/cypress-allure-plugin/writer';

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
	allureWriter(on, config);
	on('file:preprocessor', createBundler());
	return config;
}

export default defineConfig({
	viewportHeight: 1080,
	viewportWidth: 1920,
	watchForFileChanges: false,
	chromeWebSecurity: false,
	retries: process.env.CI ? 2 : 0,
	video: false,
	downloadsFolder: 'cypress/downloads',
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'cytest.json',
	},
	e2e: {
		specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
		baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',

		setupNodeEvents,
	},
	env: {
		apikey: process.env.API_PUBLIC_KEY,
		ep: {
			buzz: '/buzz/viewBuzz',
		},
		api: {
			domain: 'https://api.ilovepdf.com/v1',
			auth: '/auth',
			start: '/start',
			upload: '/upload',
			process: '/process',
			download: '/download',
		},
	},
});
