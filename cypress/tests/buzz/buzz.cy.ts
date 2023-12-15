import { buzz } from '@pages/BuzzPage';

const ep: Cypress.page = Cypress.env('ep');

describe('Verify Buzz Features', () => {
	beforeEach('Login and go to the Buzz Page', () => {
		cy.loginSuccessful();
		cy.visit(ep.buzz);
	});

	it('Validate Post a Message', () => {
		const givenMessage = 'testing in blackhole';
		// const firstInFeed = 0;

		cy.intercept({
			method: 'POST',
			url: '/web/index.php/api/v2/buzz/posts',
		}).as('posted');
		cy.intercept({
			method: 'GET',
			url: '/web/index.php/api/v2/buzz/feed**',
		}).as('feed');

		buzz.postNewMessage(givenMessage);

		cy.wait('@posted').then(({ response }) => {
			if (!response) throw new Error('Response is not available during network connection');
			expect(response.statusCode).equal(200);
		});
		cy.wait('@feed').then(({ response }) => {
			if (!response) throw new Error('Response is not available during network connection');
			expect(response.statusCode).equal(200);
		});

		// buzz.getPost(firstInFeed).within(() => {
		// 	buzz.getPostMsgValue().then(actualText => {
		// 		cy.log(actualText);
		// 		expect(actualText).equal(givenMessage);
		// 	});
		// });
	});
});
