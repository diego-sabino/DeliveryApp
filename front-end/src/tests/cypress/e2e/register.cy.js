import { statusNotFound, statusOk } from '../../../utils/LoginUtil';

const buttonRegister = '[data-testid="common_register__button-register"]';
// const buttonLogin = '[data-testid="common_register__button-login"]';
// const buttonBack = '[data-testid="common_register__button-back"]';
const inputName = '[data-testid="common_register__input-name"]';
const inputEmail = '[data-testid="common_register__input-email"]';
const inputPassword = '[data-testid="common_register__input-password"]';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('Should successfuly render all elements from register screen', () => {
    cy.get(buttonRegister).should('be.disabled');

    cy.get(inputName);
    cy.get(inputEmail);
    cy.get(inputPassword);
    cy.get(buttonRegister);
  });

  it('Should ability register button after insert corrects informations', () => {
    cy.get(inputName).type('Clara Silva Ishii');
    cy.get(inputEmail).type('test@test.com');
    cy.get(inputPassword).type('password-test');

    cy.get(buttonRegister).should('not.be.disabled');

    cy.get(buttonRegister).click();

    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('Should maintain the button desabilited by inserting badly formatted data', () => {
    cy.get(inputName).type('clara');
    cy.get(inputEmail).type('wrong-email');
    cy.get(inputPassword).type('1234');
    cy.get(buttonRegister).should('be.disabled');
  });
});

describe('Requests', () => {
  it('Should return status 200', () => {
    cy.request('POST', 'http://localhost:3001/register', {
      email: 'test@test.com',
      password: '123456',
    }).then((response) => {
      expect(response.status).to.eq(statusOk);
    });
  });

  it('Should return status 404', () => {
    cy.request('POST', 'http://localhost:3001/register', {
      email: 'usuarioquenaoexiste@test.com',
      password: '123456',
    }).then((response) => {
      expect(response.status).to.eq(statusNotFound);
    });
  });
});
