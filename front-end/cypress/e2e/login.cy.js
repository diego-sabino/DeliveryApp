describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Should successfuly render all elements from login screen', () => {

    cy.get('[data-testid="common_login__button-login"]').should('be.disabled');

    cy.get('[data-testid="common_login__input-email"]')
    cy.get('[data-testid="common_login__input-password"]')
    cy.get('[data-testid="common_login__button-login"]')
  })

  it('Should ability login button after insert corrects informations', () => {

    cy.get('[data-testid="common_login__input-email"]').type('test@test.com')
    cy.get('[data-testid="common_login__input-password"]').type('password-test')

    cy.get('[data-testid="common_login__button-login"]').should('not.be.disabled');

    cy.get('[data-testid="common_login__button-login"]').click();

    cy.url().should('eq', 'http://localhost:3000/customer/products')
  })

  it('Should maintain the button desabilited by inserting badly formatted data', () => {

    cy.get('[data-testid="common_login__input-email"]').type("wrong-email")
    cy.get('[data-testid="common_login__input-password"]').type("1234")

    cy.get('[data-testid="common_login__button-login"]').should('be.disabled');
  })
})

// // clicking the anchor causes the browser to follow the link
// cy.get('#user-edit a').click()
// cy.url().should('include', '/users/1/edit') // => true
// cy.url().should('eq', 'http://localhost:8000/users/1/edit') // => true

// describe('req', () => {
//   it('Should return status 200', () => {
//     cy.request('POST', 'http://localhost:3001/login', {
//       email: "test@test.com",
//       password: "123456",
//     }).then((response) => {
//       expect(response.status).to.eq(200)
//     })
//   })

//   it('Should return status 404', () => {
//     cy.request('POST', 'http://localhost:3001/login', {
//       email: "usuarioquenaoexiste@test.com",
//       password: "123456",
//     }).then((response) => {
//       expect(response.status).to.eq(404)
//     })
//   })
// })