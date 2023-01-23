const loginButton = '[data-testid="common_login__button-login"]';
const inputEmail = '[data-testid="common_login__input-email"]';
const inputPassword = '[data-testid="common_login__input-password"]';

describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Should successfuly render all elements from login screen', () => {
    cy.get(loginButton).should('be.disabled');
    cy.get(inputEmail);
    cy.get(inputPassword);
    cy.get(loginButton);
  });

  it('Should ability login button after insert corrects informations', () => {
    cy.get(inputEmail).type('test@test.com');
    cy.get(inputPassword).type('password-test');
    cy.get(loginButton).should('not.be.disabled');
    cy.get(loginButton).click();
    cy.url().should('eq', 'http://localhost:3000/customer/products');
  });

  it('Should maintain the button desabilited by inserting badly formatted data', () => {
    cy.get(inputEmail).type('wrong-email');
    cy.get(inputPassword).type('1234');
    cy.get(loginButton).should('be.disabled');
  });
});

// describe('req', () => {
//   it('Should return status 200', () => {
//     cy.request('POST', 'http://localhost:3001/register', {
//       email: "test@test.com",
//       password: "123456",
//     }).then((response) => {
//       expect(response.status).to.eq(200)
//     })
//   })

//   it('Should return status 404', () => {
//     cy.request('POST', 'http://localhost:3001/register', {
//       email: "usuarioquenaoexiste@test.com",
//       password: "123456",
//     }).then((response) => {
//       expect(response.status).to.eq(404)
//     })
//   })
// })
