describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('Should successfuly render all elements from register screen', () => {

    cy.get('[data-testid="common_register__button-register"]').should('be.disabled');

    cy.get('[data-testid="common_register__input-name"]')
    cy.get('[data-testid="common_register__input-email"]')
    cy.get('[data-testid="common_register__input-password"]')
    cy.get('[data-testid="common_register__button-register"]')
  })

  it('Should ability register button after insert corrects informations', () => {


    cy.get('[data-testid="common_register__input-name"]').type('Clara Silva Ishii')
    cy.get('[data-testid="common_register__input-email"]').type('test@test.com')
    cy.get('[data-testid="common_register__input-password"]').type('password-test')

    cy.get('[data-testid="common_register__button-register"]').should('not.be.disabled');

    cy.get('[data-testid="common_register__button-register"]').click();

    cy.url().should('eq', 'http://localhost:3000/login')
  })

  it('Should maintain the button desabilited by inserting badly formatted data', () => {

    cy.get('[data-testid="common_register__input-name"]').type("clara")
    cy.get('[data-testid="common_register__input-email"]').type("wrong-email")
    cy.get('[data-testid="common_register__input-password"]').type("1234")

    cy.get('[data-testid="common_register__button-register"]').should('be.disabled');
  })
})

// // clicking the anchor causes the browser to follow the link
// cy.get('#user-edit a').click()
// cy.url().should('include', '/users/1/edit') // => true
// cy.url().should('eq', 'http://localhost:8000/users/1/edit') // => true

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